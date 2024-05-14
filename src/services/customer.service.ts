import { IsNull } from "typeorm";
import { Customer } from "../entities/Customer";
import { AppDataSource } from "../db";


const repo = AppDataSource.getRepository(Customer)

export class CustomerService {

    static async getAllCustomers(){
       return await repo.find({
            select:{
                customerId: true,
                name: true,
                email: true,
                phone: true,
                taxId: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                deletedAt: IsNull()
            }
        }) 
    
    }

}