import express,{Application, Request , Response} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import errorMiddleware from './middlewares/error_Middleware'
import config from './config'
import db from './database/index'
import routes from './routes'



db.connect().then((Client)=>{
    return Client.query('SELECT NOW()').then((res)=>{
        Client.release();
        console.log(res.rows);
        
    }).catch((err)=>{
        Client.release();
        console.log(err.stack);
        
    })
})




// create instance server
const app:Application = express()

// parser incoming requests middleware
app.use(express.json())


const Port = config.port || 3000

// http request logger middleware
app.use(morgan('common'))

// http security middleware
app.use(helmet())

// request limmiter middleware
app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message:
		'Too many accounts created from this IP, please try again after 15 minutes.',
    })
)


//adding route 
app.get('/',(req:Request, res:Response)=>{
    res.status(200).send('hello world🌍')
})

// app routes
app.use('/api', routes)

// error handler middleware
app.use(errorMiddleware)

// route not exist handler
app.use((req:Request, res:Response)=>{
    res.status(404).json({
        message: 'Page not found !!'
    })
})
// start express server
app.listen(Port , ()=>{
    console.log(`Server is starting at port : ${Port}`);
    
})

export default app