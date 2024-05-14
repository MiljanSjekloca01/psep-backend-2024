import { Router } from "express";
import asyncHandler from "express-async-handler"
import { DeviceService } from "../services/device.service";

export const deviceRouter = Router()


deviceRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.getAllDevices())
    }
))