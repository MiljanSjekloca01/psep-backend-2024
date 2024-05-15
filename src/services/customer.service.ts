import { IsNull } from "typeorm";
import { Customer } from "../entities/Customer";
import { AppDataSource } from "../db";
import { CustomerModel } from "../models/customer.model";


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

    static async getCustomerById(id: number) {
        const data = await repo.findOne({
            select: {
                customerId: true,
                name: true,
                email: true,
                phone: true,
                taxId: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                customerId: id,
                deletedAt: IsNull()
            }
        })

        if (data) return data
        else throw new Error("NOT_FOUND")
    }

    static async createCustomer(model: CustomerModel) {
        const data = await repo.save({
            name: model.name,
            email: model.email,
            phone: model.phone,
            taxId: model.taxId,
            createdAt: new Date()
        })

        delete data.deletedAt
        return data
    }

    static async updateCustomerById(id: number, model: CustomerModel) {
        const data = await this.getCustomerById(id);
        data.name = model.name
        data.email = model.email
        data.phone = model.phone
        data.taxId = model.taxId
        data.updatedAt = new Date()

        delete data.deletedAt
        return data
    }

    static async deleteCustomerById(id: number) {
        const data = await this.getCustomerById(id);
        data.deletedAt = new Date()
        await repo.save(data)
    }



}