import supertest from "supertest";
import app from "../../index";
import userModel from "../../models/user_model";
import db from '../../database'
import User from "../../types/user_type";

const user = new userModel();
const request = supertest(app);
let token = '' ;


describe('ROUTES',()=>{
    const newUser = {
        "id":"0" ,
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



    describe("AUTHENTICATION METHOD",() =>{
        console.log(newUser , 'newUser');
        it('should return TOKEN with user data', async()=>{

            const res = await request.post('/api/users/login')
            .set('Content-type','application/json')
            .send({
                "email":"ahmedmedhaat@com",
                "password":"mypassword" 
            })
            console.log(newUser , 'newUser');
            expect(res.status).toBe(200) ;
            const {id ,email , token: userToken } = res.body.data ;
            expect(id).toBe(newUser.id) ;
            expect(email).toBe("ahmedmedhaat@com") ;
            token = userToken ;
        })
        
        
        
        it('should return ERROR as AUTHENTICATION failed', async()=>{
            
            const res = await request.post('/api/users/login')
            .set('Content-type','application/json')
            .send({
                "email":"ahm@com",
                "password":"mypassword" 
            })
            
            expect(res.status).toBe(401) ;
            
        })
        
        
    })




    
describe('CRUD API METHODS',()=>{

         it('should CREATE new user', async ()=>{
            const res = await request.post('/api/users/')
            .set('Content-type','application/json')
            .send({
                "email":"ahmedd@medhat.com",
                "user_name":"Ahmed Medhat" ,
                "first_name":"Ahmed" ,
                "last_name":"Medhat" ,
                "password":"mypassword" 
            
             } as User) ;


             expect(res.status).toBe(201) ;
             const {email , user_name , first_name , last_name } = res.body.data ;
             expect(email).toBe("ahmedd@medhat.com") ;
             expect(user_name).toBe("Ahmed Medhat") ;
             expect(first_name).toBe("Ahmed") ;
             expect(last_name).toBe("Medhat") ;
        }) ;

        it('should return ALL USERS', async ()=>{
            const res = await request.get('/api/users/')
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}`)
            
             expect(res.status).toBe(200) ;
             expect(res.body.data.length).toBe(2) ;
        }) ;
        

        it('should return ONE USER', async ()=>{
            const res = await request.get(`/api/users/${newUser.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}`)
            
             expect(res.status).toBe(200) ;
             expect(res.body.data.user_name).toBe('Ahmed Medhat') ;
            //  expect(res.body.data.id).toBe(newUser.id) ;
        }) ;
        
        
        it('should UPDATE THE USER', async ()=>{
            const res = await request.put(`/api/users/${newUser.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({
                ...newUser ,
                first_name:"name"
            })
            
             expect(res.status).toBe(201) ;
             const {id ,email , user_name , first_name , last_name } = res.body.data ;
             expect(id).toBe(newUser.id) ;
             expect(email).toBe(newUser.email) ;
             expect(user_name).toBe(newUser.user_name) ;
             expect(first_name).toBe("name") ;
             expect(last_name).toBe(newUser.last_name) ;
        }) ;
        
        
        it('should DELETE THE USER', async ()=>{
            const res = await request.delete(`/api/users/${newUser.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}`)
            
             expect(res.status).toBe(200) ;
        }) ;
})

})

