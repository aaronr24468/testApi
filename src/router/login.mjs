import { Router } from "express";
import bcrypt from 'bcrypt';
import { getUser } from "../models/registerM.mjs";
import jwt from 'jsonwebtoken'

export const router = Router();

router.post('/', async(request, response) =>{
    try {
        const data = {
            username: request.body.username,
            password: request.body.password
        };
        const user = await getUser(data);
        bcrypt.compare(data.password, user[0].password, (err, result) =>{
            if(result === true){
                const payload = {...user};
                delete payload[0].password;
                const token = jwt.sign(payload, 'secret')
                response.status(200).json(token)
            }else{
                response.status(420).json('User not found')
            }
        })
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
})