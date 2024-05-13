import { IsNull } from "typeorm";
import { Manufacturer } from "../entities/Manufacturer";
import { AppDataSource } from "../db";


const repo = AppDataSource.getRepository(Manufacturer)

export class ManufacturerService{
    static async getAllManufacturers(){
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            }
        })
        data.forEach(s => delete s.deletedAt)
        return data
    }
}