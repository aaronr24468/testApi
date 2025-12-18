
import { connectionDB } from '../connection/connection.mjs';


export const getA = async() =>{
    const query = 'SELECT * FROM products';
    const [data] = await connectionDB.query(query)
    return(data)
}

export const editP = async(data) =>{
    if(data.id){
        const query = 'UPDATE products SET name=?, price=? WHERE id=?';
        await connectionDB.query(query, [data.name, data.price, data.id])
    }else{
        const query = 'INSERT INTO products(name, price, image) values(?,?,?)';
        await connectionDB.query(query, [data.name, data.price, data.image]);
    }
}

export const uploadI = async(data) =>{
    const query = 'UPDATE products SET image=? WHERE id=?';
    await connectionDB.query(query, [data.url, data.id])
}