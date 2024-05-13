import { IsNull } from "typeorm";
import { State } from "../entities/State";
import { AppDataSource } from "../db";

const repo = AppDataSource.getRepository(State)
export class StateService{
    static async getAllStates(){
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            }
        })
        data.forEach(s => delete s.deletedAt)
        return data
    }
}