import { IsNull } from "typeorm"
import { AppDataSource } from "../db"
import { Device } from "../entities/Device"
import { checkIfDefined } from "../utils"
import { DeviceModel } from "../models/device.model"

const repo = AppDataSource.getRepository(Device)


export class DeviceService{
    static async getAllDevicesByCustomerId(id:number){
        return await repo.find({
            select:{
                deviceId: true,
                sn: true,
                model: { modelId: true, name: true,
                    type: {typeId: true, name: true},
                    manufacturer: { manufacturerId: true, name: true}
                },
                createdAt: true
            },
            where:{
                model:{
                    deletedAt: IsNull()
                },
                customer:{
                    customerId: id,
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations:{
            model:{type: true},
            }
        })
    }

    static async getDeviceById(id: number): Promise<Device>{
        const data = await repo.findOne({
            select:{
                deviceId: true,
                sn: true,
                model: { modelId: true, name: true,
                    type: {typeId: true, name: true},
                    manufacturer: { manufacturerId: true, name: true}
                },
                customer:{customerId: true,name: true},
                createdAt: true
            },
            where:{
                model:{
                    deletedAt: IsNull()
                },
                customer:{
                    deletedAt: IsNull()
                },
                deviceId: id,
                deletedAt: IsNull()
            },
            relations:{
            model:{type: true},
            customer: true
            }
        })

        return checkIfDefined(data)
    }

    static async getDeviceWithoutRelationsById(id: number): Promise<Device>{
        const data = await repo.findOne({
            select:{ deviceId: true, sn: true, modelId:true, customerId: true, createdAt: true },
            where:{ model:{ deletedAt: IsNull() }, customer:{ deletedAt: IsNull() }, deviceId: id, deletedAt: IsNull() },
        })
        return checkIfDefined(data)
    }


    static async createDevice(model: DeviceModel){
        const data = await repo.save({
            sn: model.sn,
            modelId: model.modelId,
            customerId: model.customerId,
            createdAt: new Date(),
        })
        delete data.deletedAt
        return data
    }

    static async updateDeviceById(id: number,model: DeviceModel){
        const data = await this.getDeviceWithoutRelationsById(id);
        
        data.sn = model.sn
        data.modelId = model.modelId
        data.customerId = model.customerId
        data.updatedAt = new Date()

        return await repo.save(data)
    }

    static async deleteDeviceById(id: number){
        const data = await this.getDeviceWithoutRelationsById(id);
        data.deletedAt = new Date()
        await repo.save(data)
        return "Device deleted"
    }

   
}