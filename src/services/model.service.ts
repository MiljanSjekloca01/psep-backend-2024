import { IsNull } from "typeorm"
import { Model } from "../entities/Model"
import { AppDataSource } from "../db"

const repo = AppDataSource.getRepository(Model)


export class ModelService{
    static async getAllModels(){
        return await repo.find({
           select:{
                modelId: true,
                name:true,
                createdAt: true,
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
        /*
        data.forEach(m => {
            delete m.type.deletedAt
            delete m.manufacturer.deletedAt
            delete m.deletedAt
        })
        */
    }
}