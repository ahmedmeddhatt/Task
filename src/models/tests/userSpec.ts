import userModel from "../user_model";
import db from '../../database'
import User from "../../types/user_type";

const user = new userModel()

describe('User model',() =>{
    describe("is authentication exists",() =>{
        it('should have an FIND ALL USERS method',()=>{
            expect(user.getMany).toBeDefined()
        })

        
        it('should have an FIND ONE USER method',()=>{
            expect(user.getOne).toBeDefined()
        })

        it('should have an CREATE method',()=>{
            expect(user.create).toBeDefined()
        })

        it('should have an UPDATE method',()=>{
            expect(user.updateOne).toBeDefined()
        })


        it('should have an DELETE method',()=>{
            expect(user.deleteOne).toBeDefined()
        })

        it('should have an AUTHENTICATION method',()=>{
            expect(user.authenticate).toBeDefined()
        })
    })
})




describe('User model logic',()=>{
    const newUser = {
        "email":"ahmed@com",
        "user_name":"Ahmed Medhat" ,
        "first_name":"Ahmed" ,
        "last_name":"Medhat" ,
        "password":"mypassword" 
    
    } as User
    
    beforeAll(async ()=>{
        const createUser = await user.create(newUser)
        newUser.id = createUser.id
    }) ;


    afterAll(async ()=>{
        const connection = await db.connect();
        const sql = 'DELETE FROM users;'
        await connection.query(sql)
        connection.release()
    })


         it('should CREATE new user', async ()=>{
             const createUser =await user.create({
                "email":"ahmedd@com",
                "user_name":"Ahmed Medhat" ,
                "first_name":"Ahmed" ,
                "last_name":"Medhat" ,
                "password":"mypassword" 
            
             } as User) ;

             expect(createUser).toEqual({
                 id: createUser.id ,
                "email":"ahmedd@com",
                "user_name":"Ahmed Medhat" ,
                "first_name":"Ahmed" ,
                "last_name":"Medhat" ,
             } as User) ;
            
        }) ;

        it('should return ALL USERS', async ()=>{
            const userData =await user.getMany() ;
            expect(userData.length).toBe(2) ;
            
        }) ;
        
        it('should return ONE USER with this ID', async ()=>{
            const userData =await user.getOne(newUser.id as string) ;
            expect(userData.email).toBe(newUser.email) ;
            expect(userData.user_name).toBe(newUser.user_name) ;
            expect(userData.first_name).toBe(newUser.first_name) ;
            expect(userData.last_name).toBe(newUser.last_name) ;
    }) ;
        
        it('should UPDATE the user with the id ', async ()=>{
            const userData =await user.updateOne({
                ...newUser ,
                "user_name":"Ahmed"
            }) ;
            expect(userData.id).toBe(newUser.id) ;
            expect(userData.email).toBe(newUser.email) ;
            expect(userData.user_name).toBe('Ahmed') ;
            expect(userData.first_name).toBe(newUser.first_name) ;
            expect(userData.last_name).toBe(newUser.last_name) ;            
        }) ;
        
        it('should return NULL', async ()=>{
            const userData =await user.deleteOne(newUser.id as string) ;
            expect(userData.id).toBe(newUser.id) ;
            
        }) ;
})