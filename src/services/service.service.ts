import { IsNull } from "typeorm";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";

const repo = AppDataSource.getRepository(Service)


export class ServiceService {
    static async getAllServicesByDevice(id: number){
        const data = await repo.find({
            where:{
                device:{
                    deviceId: id,//model: {}
                    deletedAt: IsNull()
                },
                state: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations:{
                
            }

        })
    }
}