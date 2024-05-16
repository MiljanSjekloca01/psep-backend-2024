import { Router } from "express";
import asyncHandler from "express-async-handler"
import { DeviceService } from "../services/device.service";

export const deviceRouter = Router()


deviceRouter.get("/customer/:id",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.getAllDevicesByCustomerId(+req.params.id))
    }
))

deviceRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.getDeviceById(+req.params.id))
    }
))

deviceRouter.get("/:id/simple",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.getDeviceWithoutRelationsById(+req.params.id))
    }
))

deviceRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.createDevice(req.body))
    }
))

deviceRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.updateDeviceById(+req.params.id,req.body))
    }
))

deviceRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await DeviceService.deleteDeviceById(+req.params.id))
    }
))