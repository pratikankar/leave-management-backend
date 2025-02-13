import express from "express";
import { addEmployee, applyLeave, deleteEmployee, getAllEmployees, getEmployee, leaveStatus, login, updateEmployee } from "../controller/employeeController.js"
import { AuthMiddleware } from '../middleware/authMiddleware.js';

const route = express.Router();

route.post('/addemployee', addEmployee);
route.post('/login', login);
route.get('/employees', AuthMiddleware, getAllEmployees);
route.get('/employee/:id', AuthMiddleware, getEmployee);
route.put('/employee/:id', AuthMiddleware, updateEmployee);
route.delete('/employee/:id', AuthMiddleware, deleteEmployee);
route.post('/employee/:id/apply-leave', AuthMiddleware, applyLeave);
route.put('/employee/:id/update-leave', AuthMiddleware, leaveStatus);

export default route;