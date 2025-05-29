import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import './Profile.css'; 

const Profile = () => {
  const [studentResults, setStudentResults] = useState([]);
  const [average, setAverage] = useState(null);
  const [teacherResults, setTeacherResults] = useState([]);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserType(decoded.userType);
      setUserId(decoded.userid);

      if (decoded.userType === "student") {
        fetchStudentResults(decoded.userid);
      } else if (decoded.userType === "teacher") {
        fetchTeacherResults(decoded.userid);
      }
    }
  }, []);

  const fetchStudentResults = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user-stats/${userId}`);
      setStudentResults(res.data.completed || []);
      setAverage(res.data.average);
    } catch (error) {
      console.error("Error fetching student stats", error);
    }
  };

  const fetchTeacherResults = async (teacherId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/teacher-results/${teacherId}`);
      setTeacherResults(res.data || []);
    } catch (error) {
      console.error("Error fetching teacher results", error);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200; 
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200; 
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="head-h2">Profile Page</h2>
      {userType === 'student' && (
        <div className="pf-stats-section">
          <div className="pf-stat-card">
            <h3>Completed Quizzes</h3>
            <p className="pf-stat-value">{studentResults.length}</p>
            <span className="pf-icon pf-trophy-icon">🏆</span>
          </div>
          <div className="pf-stat-card">
            <h3>Average Score</h3>
            <p className="pf-stat-value">{average ? average.toFixed(1) : 'N/A'}%</p>
            <span className="pf-icon pf-chart-icon">📊</span>
          </div>
          <div className="pf-stat-card pf-stats-overview">
            <h3>Statistics Overview</h3>
            <div className="pf-slider-container">
              <button className="pf-slider-arrow pf-arrow-left" onClick={scrollLeft}>◄</button>
              <div className="pf-stat-slider" ref={sliderRef}>
                {studentResults.map((quiz, index) => (
                  <div key={index} className="pf-stat-item">
                    <p>{quiz.quizName}</p>
                    <p className="pf-stat-value">{quiz.mark.toFixed(2)}%</p>
                    <p className={`pf-stat-change ${quiz.mark >= 50 ? 'positive' : 'negative'}`}>
                      {quiz.mark >= 50 ? '+Good' : '-Improve'}
                    </p>
                    <div className="pf-placeholder-chart pf-bar-chart"></div>
                  </div>
                ))}
              </div>
              <button className="pf-slider-arrow pf-arrow-right" onClick={scrollRight}>►</button>
            </div>
          </div>
        </div>
      )}

      {userType === "teacher" && (
        <>
          <h3>Student Results for Your Quizzes</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Quiz Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {teacherResults.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.studentName}</td>
                  <td>{entry.quizName}</td>
                  <td>{entry.mark.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Profile;
