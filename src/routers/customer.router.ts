import { Router } from "express";
import asyncHandler from "express-async-handler"
import { CustomerService } from "../services/customer.service";

export const customerRouter = Router()


customerRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await CustomerService.getAllCustomers())
    }
))