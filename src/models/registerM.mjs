import { connectionDB } from "../connection/connection.mjs";

export const registerUser = async(data) =>{
    const query = 'INSERT INTO users(username, password)values(?,?)';
    await connectionDB.query(query, [data.username, data.password])
}

export const getUser = async(data) =>{
    const query = 'SELECT * FROM users WHERE username=?';
    const [user] = await connectionDB.query(query, [data.username])
    return(user)
}