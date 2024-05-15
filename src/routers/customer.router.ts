import { Router } from "express";
import asyncHandler from "express-async-handler"
import { CustomerService } from "../services/customer.service";

export const customerRouter = Router()


customerRouter.get("/",asyncHandler(
    async (req,res) => {
        res.json(await CustomerService.getAllCustomers())
    }
))


customerRouter.get("/:id",asyncHandler(
    async (req,res) => {
        res.json(await CustomerService.getCustomerById(+req.params.id))
    }
))

customerRouter.post("/create",asyncHandler(
    async (req,res) => {
        res.json(await CustomerService.createCustomer(req.body))
    }
))

customerRouter.put("/update/:id",asyncHandler(
    async (req,res) => {
        res.json(await CustomerService.updateCustomerById(+req.params.id,req.body))
    }
))

customerRouter.put("/delete/:id",asyncHandler(
    async (req,res) => {
        res.json(await CustomerService.deleteCustomerById(+req.params.id))
    }
))