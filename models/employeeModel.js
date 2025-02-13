import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password : {type: String, required: true},
    name: {
            first: { type: String, required: true },
            last: { type: String, required: true }
    },
    ssn: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    hiredOn: { type: String, required: true },
    terminatedOn: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    mobile: { type: Number, required: true },
    address: {
        street: { type: Number, required: true },
        city: { type: Number, required: true },
        state: { type: Number, required: true },
        zip: { type: Number, required: true },
    },
    role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
    leaves: [
        {
            type: { type: String, enum: ['sick', 'casual', 'annual'], required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
        }
    ]
}, { timestamps: true })

export const Employee = mongoose.model('Employee', employeeSchema);