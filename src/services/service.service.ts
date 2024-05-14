import { IsNull } from "typeorm";
import { Service } from "../entities/Service";
import { AppDataSource } from "../db";

const repo = AppDataSource.getRepository(Service)


export class ServiceService {
    
    static async getAllServicesByDevice(id: number){
       return await repo.find({
            select:{
                serviceId: true,
                state:{ stateId: true, name: true },
                createdAt: true,
                createdByUser:{ userId: true, userName: true, },
                updatedAt: true,
                updatedByUser:{ userId: true, userName: true }
            },
            where:{       
                device:{
                    deviceId: id,
                    model:{ deletedAt: IsNull() },
                    customer:{ deletedAt: IsNull() },
                    deletedAt: IsNull()
                },
                state: { deletedAt: IsNull() },
                deletedAt: IsNull()
            },
            relations:{ state: true, createdByUser: true, updatedByUser: true }})
    }


    static async getServiceByCode(code: string){
        const data =  await repo.findOne({
             select:{
                 serviceId: true,
                 code: true,
                 device:{ 
                    sn:true,
                    model:{  name: true, 
                        manufacturer: {name: true},
                        type: {  name: true} 
                    },
                    customer:{ name: true}
                    },
                 state:{ name: true },
                 createdAt: true,
             },
             where:{     
                 code: code,
                 device:{
                     model:{ deletedAt: IsNull() },
                     customer:{ deletedAt: IsNull() },
                     deletedAt: IsNull()
                 },
                 state: { deletedAt: IsNull() },
                 deletedAt: IsNull()
             },
             relations:{ state: true,device: { model: { manufacturer: true, type: true}, customer: true } }
            })

            if(data == undefined)throw new Error("THIS CODE SERVICE NOT FOUND")
            else return data
            
     }



}