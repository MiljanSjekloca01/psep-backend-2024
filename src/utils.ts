import { configDotenv } from "dotenv"
import { Response } from "express"
import jwt from "jsonwebtoken"
import { RequestModel } from "./models/request.model"

configDotenv()

export function checkIfDefined(data: any){
    if(!data) throw new Error("NOT_FOUND")
    else {
    delete data.deletedAt
    return data
    }
}
configDotenv()
export async function authenticateToken(req : RequestModel, res: Response, next: Function) {

    const unprotected = ['/api/user/login', '/api/user/refresh']
    if (unprotected.includes(req.path)) {
        next()
        return
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return sendErrorResponse(res, 401, 'NO_TOKEN')
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string, (err: any, dec: any) => {
        if (err) {
            return sendErrorResponse(res, 403, 'INVALID_TOKEN')
        }
        req.username = dec.name
        next()
    })
}

export function sendErrorResponse(res: Response, code = 400, msg = "Bad request") {
    res.status(code).json({
        message: msg,
        timestamp: new Date()
    });
}

