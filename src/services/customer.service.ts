import { IsNull } from "typeorm";
import { Customer } from "../entities/Customer";
import { AppDataSource } from "../db";


const repo = AppDataSource.getRepository(Customer)

export class CustomerService {
    static async getAllCustomers(){
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            }
        })
    }
}