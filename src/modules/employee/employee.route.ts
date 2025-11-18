import { Router } from "express";
import { employeeController } from "./employee.controller";

const router = Router();

router.post("/create", employeeController.createEmployee);
router.get("/getAllEmployee", employeeController.getAllEmployee);


export const employeeRoutes = router;
