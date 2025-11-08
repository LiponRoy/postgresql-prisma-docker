import { Router } from "express";
import { employeeController } from "./employee.controller";

const router = Router();

router.post("/create", employeeController.createEmployee);


export const employeeRoutes = router;
