import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Customer } from "../output/entities/Customer";
import { Device } from "../output/entities/Device";
import { Manufacturer } from "../output/entities/Manufacturer";
import { Model } from "../output/entities/Model";
import { Service } from "../output/entities/Service";
import { State } from "../output/entities/State";
import { Type } from "../output/entities/Type";
import { User } from "../output/entities/User";

configDotenv()

export const AppDataSource = new DataSource({
    type:"mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Customer,Device,Manufacturer,Model,Service,State,Type,User],
    logging: false
})