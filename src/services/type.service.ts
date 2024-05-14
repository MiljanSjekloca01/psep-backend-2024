import { IsNull } from "typeorm";
import { Type } from "../entities/Type";
import { AppDataSource } from "../db";


const repo = AppDataSource.getRepository(Type)


export class TypeService{
    
    static async getAllTypes(){
        return await repo.find({
            select:{
                typeId: true,
                name: true,
                createdAt: true,
            },
            where: {
                deletedAt: IsNull()
            }
        }) 
    }
}