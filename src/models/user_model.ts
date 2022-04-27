import User from "../types/user_type";
import db from '../database'
import config from "../config";
import bcrypt from 'bcrypt'

const hashPassword = (password : string)=>{
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class userModel {

    // create
    async create(u:User):Promise<User> {
        try {
            // connect to db
            const connection = await db.connect()
            const sql = `INSERT INTO users (email , user_name ,first_name ,last_name ,password)  
            values ($1 ,$2 ,$3 ,$4 ,$5) RETURNING id,email , user_name ,first_name ,last_name`
            // run query 
            const data = await connection.query(sql , [
                u.email , u.user_name ,u.first_name ,u.last_name ,hashPassword(u.password)
            ])
            // release connection
            connection.release();
            // return created user
            return data.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create (${u.user_name}) : ${(error as Error).message}`
            )
        }
    }

    // get all users
    async getMany():Promise<User[]>{
        try {
            // connect to db
            const connection = await db.connect() ;
            const sql = `SELECT id , email , user_name ,first_name ,last_name FROM users` ;
    
             // run query 
             const data = await connection.query(sql) ;
              // release connection
              connection.release();
              // return all users
              return data.rows ;
            
        } catch (error) {
            throw new Error (`Error at getting users : ${(error as Error).message}`)
        }
    }


    // get user
    async getOne(id: string):Promise<User>{
        try {
            // connect to db
            const connection = await db.connect() ;
            const sql = `SELECT email , user_name ,first_name ,last_name FROM users where id=($1)` ;
    
             // run query 
             const data = await connection.query(sql , [id]) ;
              // release connection
              connection.release();
              // return user of the id
              return data.rows[0] ;
            
        } catch (error) {
            throw new Error (`Can not find user id ( ${id} ), ${(error as Error).message}`)
        }
    }



    //update user
    async updateOne(u: User):Promise <User> {
    try {
        // connect to db
        const connection = await db.connect() ;
        const sql = `UPDATE users 
        SET email=$1 , user_name=$2 ,first_name=$3 ,last_name=$4 , password=$5  where id=$6
        RETURNING id,email , user_name ,first_name ,last_name` ;

         // run query 
         const data = await connection.query(sql ,  [
            u.email , u.user_name ,u.first_name ,u.last_name ,hashPassword(u.password) , u.id
        ]) ;
          // release connection
          connection.release();
          // return updated user
          return data.rows[0] ;
        
    } catch (error) {
        throw new Error (`Can not update user ${u.user_name} , ${(error as Error).message}`)
    }

 }



    // delete user
    async deleteOne(id : string):Promise <User> {
        try {
            // connect to db
            const connection = await db.connect() ;
            const sql = `DELETE FROM users 
                    where id=($1)
                    RETURNING id,email , user_name ,first_name ,last_name` ;
    
             // run query 
             const data = await connection.query(sql ,  [id]) ;
              // release connection
              connection.release();
              // return deleting message
              return data.rows[0] ;
            
        } catch (error) {
            throw new Error (`Can not delete user id ( ${id} ) , ${(error as Error).message}`)
        }
    
     }


// authenticate user
async authenticate(email: string ,password: string):Promise<User | null>{
    try {
        // connect to db
        const connection = await db.connect() ;
        const sql = `SELECT password FROM users where email = $1` ;

         // run query 
         const data = await connection.query(sql, [email]) ;
         if (data.rows.length){
             const { password: hashPassword}= data.rows[0]
             const isPasswordIsValid = 
             bcrypt.compareSync(`${password}${config.pepper}`, hashPassword);

             if( isPasswordIsValid){
                 const validData = await connection.query
                 (`SELECT id , email , user_name ,first_name ,last_name FROM users where email = ($1)`, [email])
                 
                 // return authenticated user
                 return validData.rows[0] ;
                }
        }
          // release connection
          connection.release();
          return null

        
    } catch (error) {
        throw new Error (`Unable to login : ${(error as Error).message}`)
    }
}


}

export default userModel;