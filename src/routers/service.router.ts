import { Router } from "express";
import asyncHandler from "express-async-handler"
import { StateService } from "../services/state.service";
import { ServiceService } from "../services/service.service";

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