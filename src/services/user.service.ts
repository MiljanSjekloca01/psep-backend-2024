import { configDotenv } from "dotenv";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { LoginModel } from "../models/login.model";
import { checkIfDefined } from "../utils";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


configDotenv()
const repo = AppDataSource.getRepository(User);
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService{

    static async login(model: LoginModel) {
        const user = await this.getUserByUsername(model.username)
        const matches = await bcrypt.compare(model.password, user.password); 
        if (matches) {
            return {
                username: user.username,
                access: jwt.sign({ name: user.username }, accessSecret, { expiresIn: accessExpire as string }),
                refresh: jwt.sign({ name: user.username }, refreshSecret, { expiresIn: refreshExpire as string })
            };
        }else{
            throw new Error("BAD_CREDENTIALS")
        }
    }

    public static async refreshToken(refresh: string) {
        try {
            const decoded: any = jwt.verify(refresh, refreshSecret as string)
            return {
                username: decoded.name,
                access: jwt.sign({ name: decoded.name }, accessSecret, { expiresIn: accessExpire }),
                refresh: refresh
            }
        } catch (err) {
            throw new Error('REFRESH_FAILED');
        }
    }

    static async getUserByUsername(username: string): Promise<User> {
        const data = await repo.findOne({
            where: {
                active: true,
                username: username
            }
        })
        return checkIfDefined(data)
    }
}