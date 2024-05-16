import { IsNull } from "typeorm";
import { Type } from "../entities/Type";
import { AppDataSource } from "../db";
import { NameModel } from "../models/name.model";
import { validate } from "class-validator";


const repo = AppDataSource.getRepository(Type)


export class TypeService{
    
    static async getAllTypes(){
        return await repo.find({
            select:{
                typeId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        }) 
    }


    static async getTypeById(id: number){
       const data =  await repo.findOne({
            select:{
                typeId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                typeId: id,
                deletedAt: IsNull()
            }
        }) 

        if (data) return data
        else throw new Error("NOT_FOUND")

    }

    static async createType(model: NameModel){
        /*
        if(!model.name){
            throw new Error("Name is required")
        }*/
        const type = new Type();
        type.name = model.name;
        type.createdAt = new Date();

        const errors = await validate(type);
        if (errors.length > 0) {
            throw new Error("Name is required");
        }

        const data: Type = await repo.save(type);

        delete data.deletedAt;
        return data;
    }

    static async updateTypeById(id: number,model: NameModel){
        const data = await this.getTypeById(id);
        data.name = model.name
        data.updatedAt = new Date()

        const newData = await repo.save(data)
        delete newData.deletedAt;
        return newData
    }

    static async deleteTypeById(id: number){
        const data = await this.getTypeById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
 
}