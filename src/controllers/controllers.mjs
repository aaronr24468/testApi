import { editP, getA, uploadI } from "../models/models.mjs";

export const getAll = async(request, response) =>{
    try {
        const data = await getA()
        console.log(request.auth[0])
        response.status(200).json(data)
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const editProduct = async(request, response) =>{
    try {
        const data = {
            id: request.params.id,
            name: request.body.name,
            price: request.body.price,
            image: ''
        };
        await editP(data);
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const uploadImage = async(request, response) =>{
    try {
        const info = {
            id: request.params.id,
            url: `http://localhost:8080/${request.file.filename}`
        };
        await uploadI(info);
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}