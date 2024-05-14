import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./db";
import { CustomerService } from "./services/customer.service";
import { TypeService } from "./services/type.service";
import { ManufacturerService } from "./services/manufacturer.service";
import { ModelService } from "./services/model.service";
import { DeviceService } from "./services/device.service";
import { ServiceService } from "./services/service.service";

const app = express();
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
configDotenv()

const port = process.env.SERVER_PORT || 4000;
AppDataSource.initialize().then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log("App started and listening on port " + port)
    })
}).catch((e) => {
    console.log(e);
})



app.get("/", async (req,res) => {
  res.json(await DeviceService.getAllDevices())
})


app.get("*", (req,res) => {
    res.status(404).json({
        message: "Not Found!"
    })
})