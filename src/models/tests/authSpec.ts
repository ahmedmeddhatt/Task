import userModel from "../user_model";
import db from '../../database'
import User from "../../types/user_type";

const user = new userModel()

describe('Authentication route',() =>{
    describe("is authentication exists",() =>{
        it('should have an authentication method',()=>{
            expect(user.authenticate).toBeDefined()
        })
    })
})


describe('Authentication logic',()=>{
    const newUser = {
        "email":"ahmedmedhaat@com",
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


         it('should have user data from authentication method', async ()=>{
             const userData =await user.authenticate(
                newUser.email , newUser.password as string
             ) ;
             expect(userData?.email).toBe(newUser.email) ;
             expect(userData?.user_name).toBe(newUser.user_name) ;
             expect(userData?.first_name).toBe(newUser.first_name) ;
             expect(userData?.last_name).toBe(newUser.last_name) ;
            
        }) ;

        it('should return null from authentication method', async ()=>{
            const userData =await user.authenticate(
               'wrongemail.com' , 'wrongpassword'
            ) ;
            expect(userData).toBe(null) ;
            
        }) ;
        
})

       