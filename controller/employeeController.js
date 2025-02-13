import { Employee } from "../models/employeeModel.js"
import bcrypt from "bcryptjs";
import { default as jwt } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Add employee
export const addEmployee = async (req, res) => {
    try {
        const { username, password, name, ssn, dob, hiredOn, email, mobile, address, role } = req.body;
    
        const employee = await Employee.findOne({ email });

        if(employee) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        employee = new Employee({ username, password: hashedPassword, name, ssn, dob, hiredOn, email, mobile, address, role: role || 'employee' });
        await employee.save();
        res.status(201).json({ message: 'Employee registered successfully.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"});
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ email });
        
        if (!employee) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const employeeExists = await bcrypt.compare(password, employee.password);

        if (!employeeExists) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            id: employee._id,
            role: employee.role
        }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, employee });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get employee by id
export const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch(error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update Employee Data
export const updateEmployee = async (req, res) => {
    try {
            const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if(!employee) {
               return res.status(404).json({ message: "Employee not found" });
            }
            res.status(201).json(employee)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Delete Employee Data
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        
        if(!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(201).json({ message: "Employee deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Leave application
export const applyLeave = async (req, res) => {
    try {
        const { type, startDate, endDate } = req.body;
        const employee = await Employee.findById(req.params.id);
        if(!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        employee.leaves.push({ type, startDate, endDate, status: 'pending' });
        await employee.save();

        res.json(employee);
    } catch(error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Approve or Reject leaves
export const leaveStatus = async (req, res) => {
    try {
        const { leaveId, status } = req.body;
        const employee = await Employee.findById(req.params.id);

        if(!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        const leave = employee.leaves.id(leaveId);
        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        leave.status = status;
        await employee.save();
        res.json(leave, { message: `Leave ${status} successfully.`})
    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

