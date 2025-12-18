import { Router } from "express";
import multer from "multer";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";
import { editProduct, getAll, uploadImage } from "../controllers/controllers.mjs";

const diskStorage = multer.diskStorage({
    destination: join(dirname(fileURLToPath(import.meta.url)), '../photos'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
});

const getContent = multer({
    storage: diskStorage
}).single('image')

export const router = Router();

router.get('/', getAll);

router.post('/edit/:id', editProduct);

router.put('/new', editProduct)

router.post('/uploadImage/:id', getContent, uploadImage)