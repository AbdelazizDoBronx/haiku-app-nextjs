import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

export const verifyToken = async () => {

    const cookie = await cookies().get('HaikuUser')?.value;
    
    if(cookie){
        try {
            const userCookie = jwt.verify(cookie,process.env.SECRET_KEY_JWT)
            return userCookie
        }catch (error) {
            return null
        }
    }
    
    
}