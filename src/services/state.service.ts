import { IsNull } from "typeorm";
import { State } from "../entities/State";
import { AppDataSource } from "../db";

const repo = AppDataSource.getRepository(State)
export class StateService{
    static async getAllStates(){
        return await repo.find({
            select:{
                stateId: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                deletedAt: IsNull()
            }
        }) 
    }
}