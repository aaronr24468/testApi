import express from "express";
import morgan from "morgan";
import { expressjwt } from "express-jwt";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";
import cors from 'cors';
import { router as infoRouter } from "./router/router.mjs";
import { router as registerUsers } from "./router/register.mjs";
import { router as loginUsers } from "./router/login.mjs";
import { config } from "dotenv";
config();

const puerto = process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(dirname(fileURLToPath(import.meta.url)),'/photos')));

app.use('/register', registerUsers)

app.use('/login', loginUsers)

app.use('/v31/store',expressjwt({secret: 'secret', algorithms: ["HS256"]}), infoRouter)

app.get('/', (request, response) =>{
    response.redirect('/v31/store')
});

app.use((err, request, response, next) =>{
    if(err.name === 'UnauthorizedError'){
        response.status(401).json('Unauthorized')
    }else{
        next();
    }
})
 
app.listen(8080, () =>{
    console.log(`Listening to the http://localhost:${puerto}`)
})