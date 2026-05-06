import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import ExamList from "./components/ExamList";
import ExamPage from "./components/ExamPage";
// import "./App.css";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import CreateExam from "./components/teacher/CreateExam";
import MyExams from "./components/teacher/MyExams";
import StudentDashboard from "./components/teacher/StudentDashboard";
import AttemptExam from "./components/teacher/AttemptExam";
import ViewResult from "./components/teacher/ViewResult";
import ExamResults from "./components/teacher/ExamResults";
import ExamAnalytics from "./components/teacher/ExamAnalytics";
import AllStudents from "./components/teacher/AllStudents";
import ContactUs from "./pages/ContactUs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exam/:id" element={<ExamPage />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/my-exams" element={<MyExams />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* ✅ Attempt exam */}
        <Route path="/attempt/:id" element={<AttemptExam />} />


        <Route path="/attempt/:id" element={<AttemptExam />} />
        <Route path="/result/:id" element={<ViewResult />} />
        <Route path="/teacher/results/:id" element={<ExamResults />} />
       <Route path="/analytics" element={<ExamAnalytics />} />
       <Route path="/students" element={<AllStudents />} />
       <Route path="/contactus" element={<ContactUs/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
