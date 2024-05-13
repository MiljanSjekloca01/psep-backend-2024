import { IsNull } from "typeorm";
import { Type } from "../entities/Type";
import { AppDataSource } from "../db";


const repo = AppDataSource.getRepository(Type)


export class TypeService{
    static async getAllTypes(){
        const data = await repo.find({
            where:{
                deletedAt: IsNull()
            }
        })

        data.forEach(t => delete t.deletedAt)
        return data
    }
}