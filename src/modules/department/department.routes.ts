import express from 'express';
import { departmentController} from './department.controller';


const router = express.Router();

// Public routes
router.post('/create',departmentController.createDepartment);
router.put("/update/:id", departmentController.updateDepartment);


export const departmentRoutes = router;
