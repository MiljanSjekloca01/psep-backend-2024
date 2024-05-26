import { Router } from "express";
import asyncHandler from "express-async-handler"
import { ServiceService } from "../services/service.service";
import { RequestModel } from "../models/request.model";

export const serviceRouter = Router()


serviceRouter.get("/device/:id",asyncHandler(
    async (req,res) => {
        res.json(await ServiceService.getAllServicesByDevice(+req.params.id))
    }
))

serviceRouter.get("/code/:code",asyncHandler(
    async (req,res) => {
        res.json(await ServiceService.getServiceByCode(req.params.code))
    }
))


serviceRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await ServiceService.getServiceById(+req.params.id))
    }
))


serviceRouter.post("/create",asyncHandler(
    async (req: RequestModel,res) => {
        res.json(await ServiceService.createService(req.body,req.user))
    }
))

serviceRouter.put("/update",asyncHandler(
    async (req: RequestModel,res) => {
        res.json(await ServiceService.updateServiceById(+req.params.id,req.body,req.user))
    }
))

serviceRouter.put("/delete",asyncHandler(
    async (req,res) => {
        res.json(await ServiceService.deleteServiceById(+req.params.id))
    }
))
