const mongoose=require("mongoose");
const initData=require("./input.js");
const User=require("../models/login.js");
const Student=require("../models/attendance.js");
const MONGO_URL="mongodb://127.0.0.1:27017/LLMUSER";

main().then(()=>console.log("connected to DB")).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDb=async ()=>{
    await User.insertMany(initData.data);
    console.log("data was inserted");
};

const studentData = {
    name: "sri",
    studentId: "STU2024001",
    overallAttendance: 85.3,
    presentDays: 256,
    absentDays: 44,
    attendanceAlert: {
      status: "Good",
      colorCode: "green"
    },
    subjectWiseAttendance: [
      { subject: "DSA", percentage: 88 },
      { subject: "Python", percentage: 94 },
      { subject: "Java", percentage: 95 },
      { subject: "Web Development", percentage: 87 },
      { subject: "JavaScript", percentage: 90 },
      { subject: "React", percentage: 92 }
    ],
    monthlyAttendanceTrend: [
      { month: "Jan", percentage: 95 },
      { month: "Feb", percentage: 88 },
      { month: "Mar", percentage: 80 },
      { month: "Apr", percentage: 83 },
      { month: "May", percentage: 81 }
    ],
    notifications: 3
  };
  

const initStudent=async ()=>{
    const student = new Student(studentData);
    await student.save();
    console.log("data was inserted");
};

// initDb();
initStudent();