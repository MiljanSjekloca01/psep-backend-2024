import { IsNull } from "typeorm"
import { Model } from "../entities/Model"
import { AppDataSource } from "../db"
import { checkIfDefined } from "../utils"

const repo = AppDataSource.getRepository(Model)


export class ModelService{
    static async getAllModels(){
        return await repo.find({
           select:{
                modelId: true,
                name:true,
                createdAt: true,
                updatedAt: true,
                manufacturer: { manufacturerId: true,name: true},
                type:{ typeId: true,name: true }
           },
           where:{
                type:{
                    deletedAt: IsNull()
                },
                manufacturer:{
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
           },
           relations: {
            type: true,
            manufacturer: true
           }
        })
       
    }

    static async getModelById(id: number): Promise<Model>{
        const data = await repo.findOne({
            select:{modelId: true,name:true,manufacturerId:true,typeId:true,createdAt:true,updatedAt:true},
            where:{ type:{ deletedAt: IsNull() }, manufacturer:{ deletedAt: IsNull() }, modelId: id, deletedAt: IsNull() },
        })
        return checkIfDefined(data)
    }


    static async createModel( model: Model){
        const data: Model = await repo.save({
            name: model.name,
            createdat: new Date(),
            typeId: model.typeId,
            manufacturerId: model.manufacturerId
        })
        delete data.deletedAt
        return data;
    }

    static async updateModelById(id: number,model: Model){
        const data = await this.getModelById(id)
        data.name = model.name
        data.typeId = model.typeId
        data.updatedAt = new Date()
        data.manufacturerId = model.manufacturerId
        
        return await repo.save(data)

    }


    static async deleteModelById(id: number){
        const data = await this.getModelById(id)
        data.deletedAt = new Date()
        await repo.save(data)

        return "Model deleted succesfully"

    }





}