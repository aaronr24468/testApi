import { Router } from "express";
import bcrypt from 'bcrypt'
import { registerUser } from "../models/registerM.mjs";

export const router = Router();
const saltRounds = 10;

router.put('/', async(request,response) =>{
    try {
        const data = {
            username: request.body.username,
            password: request.body.password
        }
        bcrypt.hash(data.password, saltRounds, async(err, hash) =>{
            data.password = hash;
            await registerUser(data)
            response.status(200).json('S')
        })
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
})