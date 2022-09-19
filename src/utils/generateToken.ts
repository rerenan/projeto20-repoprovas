import jwt from "jsonwebtoken";


export default function generateUserToken(userId: number) {
    const secretKey = process.env.JWT_SECRET;
    const time = 60*60*24*10 // 10 dias
    
    const token = jwt.sign({userId}, secretKey,{expiresIn: time});
    return token;
};