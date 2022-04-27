import supertest from "supertest";
import app from "../index";

//create a request option
const request = supertest(app)

describe('test basic endpoint', ()=>{
    it('get the / endpoint',async ()=>{
        const response = await request.get('/');
        expect(response.status).toBe(200)
        
    })
})