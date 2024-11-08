import {Prisma} from '@prisma/client'

export async function Exception(f){
    console.log("sadjakshd")
    try {
        let Data = await f()
        return {data: Data, statusCode: 200}
    } catch(e){
        if (e.code === 'P2023'){
            return {messageError: "Column not found", statusCode: 404}
            
        }
        if (e.code === 'P2025'){
            return {messageError: "Trying to delete a null value", statusCode: 404}
        }
    }
}