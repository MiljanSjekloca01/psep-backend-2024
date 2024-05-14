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
import { typeRouter } from "./routers/type.router";
import { stateRouter } from "./routers/state.router";
import { serviceRouter } from "./routers/service.router";
import { manufacturerRouter } from "./routers/manufacturer.router";
import { modelRouter } from "./routers/model.router";
import { deviceRouter } from "./routers/device.router";
import { customerRouter } from "./routers/customer.router";

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

app.use("/api/service",serviceRouter)
app.use("/api/type",typeRouter)
app.use("/api/state",stateRouter)
app.use("/api/manufacturers",manufacturerRouter)
app.use("/api/models",modelRouter)
app.use("/api/devices",deviceRouter)
app.use("/api/customers",customerRouter)

app.get("/", async (req,res) => {
  res.json(await ServiceService.getAllServicesByDevice(1))
})


app.get("*", (req,res) => {
    res.status(404).json({
        message: "Not Found!"
    })
})