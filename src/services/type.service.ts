import { IsNull } from "typeorm";
import { Type } from "../entities/Type";
import { AppDataSource } from "../db";
import { NameModel } from "../models/name.model";
import { validate } from "class-validator";
import { checkIfDefined } from "../utils";


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

        return checkIfDefined(data);

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

        const data = await repo.save(type);
        delete data.deletedAt;
        return data;
    }

    static async updateTypeById(id: number,model: NameModel){
        const data = await this.getTypeById(id);
        data.name = model.name
        data.updatedAt = new Date()

        return await repo.save(data)
        
    }

    static async deleteTypeById(id: number){
        const data = await this.getTypeById(id)
        data.deletedAt = new Date()
        await repo.save(data)
        return `Type with this id ${id} successfully deleted`
    }
 
}