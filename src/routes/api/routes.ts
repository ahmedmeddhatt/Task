import { Router , Request ,Response } from "express";
import  api from '../../controllers/user_controller'
import {authentication} from '../../controllers/auth_controller'
import validator from "../../middlewares/auth_middleware";

const routes = Router()


//adding route 

// api/users

routes.route('/')
.get(validator , api.getMany)
.post( api.Create) ;


// api/users/id

routes.route('/:id')
.get(validator , api.getOne)
.put(validator , api.updateOne)
.delete(validator , api.deleteOne)

//login
routes.post('/login', authentication)

export default routes