const mongoose = require('mongoose');

const subjectAttendanceSchema = new mongoose.Schema({
  subject: String,
  percentage: Number,
});

const monthlyTrendSchema = new mongoose.Schema({
  month: String,
  percentage: Number,
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  overallAttendance: {
    type: Number,
    required: true
  },
  presentDays: {
    type: Number,
    required: true
  },
  absentDays: {
    type: Number,
    required: true
  },
  attendanceAlert: {
    status: {
      type: String, // e.g., "Good", "Warning", "Poor"
      enum: ['Good', 'Warning', 'Poor'],
      default: 'Good'
    },
    colorCode: String // optional: "green", "orange", "red"
  },
  subjectWiseAttendance: [subjectAttendanceSchema],
  monthlyAttendanceTrend: [monthlyTrendSchema],
  notifications: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
