import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./db";
import { ServiceService } from "./services/service.service";
import { typeRouter } from "./routers/type.router";
import { stateRouter } from "./routers/state.router";
import { serviceRouter } from "./routers/service.router";
import { manufacturerRouter } from "./routers/manufacturer.router";
import { modelRouter } from "./routers/model.router";
import { deviceRouter } from "./routers/device.router";
import { customerRouter } from "./routers/customer.router";
import { userRouter } from "./routers/user.router";
import { authenticateToken } from "./utils";

const app = express();
app.use(express.json())
app.use('/favicon.ico', express.static('../favicon.ico'));
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

app.use(authenticateToken)
app.use("/api/user",userRouter)
app.use("/api/service",serviceRouter)
app.use("/api/type",typeRouter)
app.use("/api/state",stateRouter)
app.use("/api/manufacturer",manufacturerRouter)
app.use("/api/model",modelRouter)
app.use("/api/device",deviceRouter)
app.use("/api/customer",customerRouter)


app.get("/", async (req,res) => {
  res.json("Backend running")
})


const handleNotFound = (req,res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    })

}


app.get("*", handleNotFound);
app.post("*", handleNotFound);
app.put("*", handleNotFound);
app.delete("*", handleNotFound);

/* 
app.use((err, req, res, next) => {
    if (err.message === "NOT_FOUND") {
        res.status(404).json({
            message: "NOT_FOUND"
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});*/