import { IsNull } from "typeorm"
import { Model } from "../entities/Model"
import { AppDataSource } from "../db"

const repo = AppDataSource.getRepository(Model)


export class ModelService{
    static async getAllModels(){
        const data = await repo.find({
           where:{
                deletedAt: IsNull()
           },
           
        })

        data.forEach(m => {
            delete m.manufacturer.deletedAt
            delete m.type.deletedAt
            delete m.deletedAt
        })
        return data
    }
}