import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './Profile.css';
import { 
  User, 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Award,
  Target,
  Calendar,
  Users,
  BarChart3,
  Activity,
  Zap,
  Brain
} from 'lucide-react';

const Profile = () => {
  const [studentResults, setStudentResults] = useState([]);
  const [average, setAverage] = useState(null);
  const [teacherResults, setTeacherResults] = useState([]);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserType(decoded.userType);
      setUserId(decoded.userid);
      setUserName(decoded.name || decoded.email?.split('@')[0] || 'User');

      if (decoded.userType === "student") {
        fetchStudentResults(decoded.userid);
      } else if (decoded.userType === "teacher") {
        fetchTeacherResults(decoded.userid);
      }
    }
  }, []);

  const fetchStudentResults = async (userId) => {
    try {
      const res = await axios.get(`https://quizee-backend-vge7.onrender.com/api/user-stats/${userId}`);
      setStudentResults(res.data.completed || []);
      setAverage(res.data.average);
    } catch (error) {
      console.error("Error fetching student stats", error);
    }
  };

  const fetchTeacherResults = async (teacherId) => {
    try {
      const res = await axios.get(`https://quizee-backend-vge7.onrender.com/api/teacher-results/${teacherId}`);
      setTeacherResults(res.data || []);
    } catch (error) {
      console.error("Error fetching teacher results", error);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: '#10b981', icon: '🏆' };
    if (score >= 75) return { level: 'Good', color: '#3b82f6', icon: '⭐' };
    if (score >= 60) return { level: 'Average', color: '#f59e0b', icon: '📈' };
    return { level: 'Needs Improvement', color: '#ef4444', icon: '📚' };
  };

  const getAchievementBadge = (count) => {
    if (count >= 20) return { title: 'Quiz Master', icon: '👑', color: '#fbbf24' };
    if (count >= 10) return { title: 'Quiz Expert', icon: '🎯', color: '#3b82f6' };
    if (count >= 5) return { title: 'Quiz Enthusiast', icon: '🌟', color: '#10b981' };
    return { title: 'Getting Started', icon: '🚀', color: '#8b5cf6' };
  };

  return (
    <div className={`profile-dashboard ${isLoaded ? 'profile-loaded' : ''}`}>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="header-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <User className="avatar-icon" />
              <div className="avatar-status"></div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">Welcome back, {userName}!</h1>
              <p className="profile-role">
                {userType === 'student' ? '🎓 Student Dashboard' : '👨‍🏫 Teacher Dashboard'}
              </p>
            </div>
          </div>
          
          {userType === 'student' && (
            <div className="achievement-badge">
              <div className="badge-icon">{getAchievementBadge(studentResults.length).icon}</div>
              <div className="badge-content">
                <span className="badge-title">{getAchievementBadge(studentResults.length).title}</span>
                <span className="badge-subtitle">{studentResults.length} Quizzes Completed</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {userType === 'student' && (
        <>
          {/* Student Stats Overview */}
          <div className="stats-overview">
            <div className="stats-container">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <BookOpen />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{studentResults.length}</span>
                  <span className="stat-label">Completed Quizzes</span>
                  <span className="stat-trend">
                    <TrendingUp className="trend-icon" />
                    +{studentResults.length > 0 ? Math.round(studentResults.length / 7) : 0} this week
                  </span>
                </div>
                <div className="stat-decoration">
                  <Trophy className="decoration-icon" />
                </div>
              </div>

              <div className="stat-card secondary">
                <div className="stat-icon">
                  <Target />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{average ? average.toFixed(1) : 'N/A'}%</span>
                  <span className="stat-label">Average Score</span>
                  <span className="stat-trend">
                    <Activity className="trend-icon" />
                    {average && getPerformanceLevel(average).level}
                  </span>
                </div>
                <div className="stat-decoration">
                  <Star className="decoration-icon" />
                </div>
              </div>

              <div className="stat-card tertiary">
                <div className="stat-icon">
                  <Zap />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{studentResults.filter(quiz => quiz.mark >= 80).length}</span>
                  <span className="stat-label">High Scores</span>
                  <span className="stat-trend">
                    <Award className="trend-icon" />
                    80%+ Achievement
                  </span>
                </div>
                <div className="stat-decoration">
                  <Brain className="decoration-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Quiz Results */}
          <div className="quiz-results-section">
            <div className="section-header">
              <div className="header-text">
                <h2 className="section-title">
                  <BarChart3 className="title-icon" />
                  Quiz Performance Analytics
                </h2>
                <p className="section-description">
                  Track your progress and identify areas for improvement
                </p>
              </div>
            </div>

            <div className="results-container">
              <div className="slider-controls">
                <button className="slider-btn" onClick={scrollLeft}>
                  <ChevronLeft />
                </button>
                <button className="slider-btn" onClick={scrollRight}>
                  <ChevronRight />
                </button>
              </div>

              <div className="quiz-slider" ref={sliderRef}>
                {studentResults.map((quiz, index) => {
                  const performance = getPerformanceLevel(quiz.mark);
                  return (
                    <div key={index} className="quiz-result-card">
                      <div className="card-header">
                        <div className="quiz-icon">{performance.icon}</div>
                        <div className="performance-badge" style={{ backgroundColor: performance.color }}>
                          {performance.level}
                        </div>
                      </div>
                      
                      <div className="card-content">
                        <h3 className="quiz-name">{quiz.quizName}</h3>
                        <div className="score-display">
                          <span className="score-number">{quiz.mark.toFixed(1)}%</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ 
                                width: `${quiz.mark}%`,
                                backgroundColor: performance.color 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="card-footer">
                          <div className="quiz-meta">
                            <Calendar className="meta-icon" />
                            <span>Recently completed</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-glow" style={{ background: `linear-gradient(135deg, ${performance.color}20, ${performance.color}10)` }}></div>
                    </div>
                  );
                })}
              </div>

              {studentResults.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <BookOpen />
                  </div>
                  <h3>No quizzes completed yet</h3>
                  <p>Start taking quizzes to see your performance analytics here!</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {userType === "teacher" && (
        <div className="teacher-results-section">
          <div className="section-header">
            <div className="header-text">
              <h2 className="section-title">
                <Users className="title-icon" />
                Student Performance Overview
              </h2>
              <p className="section-description">
                Monitor your students' progress across all your quizzes
              </p>
            </div>
            <div className="results-stats">
              <div className="results-stat">
                <span className="stat-number">{teacherResults.length}</span>
                <span className="stat-label">Total Submissions</span>
              </div>
              <div className="results-stat">
                <span className="stat-number">
                  {teacherResults.length > 0 ? 
                    (teacherResults.reduce((sum, result) => sum + result.mark, 0) / teacherResults.length).toFixed(1) 
                    : 'N/A'}%
                </span>
                <span className="stat-label">Class Average</span>
              </div>
            </div>
          </div>

          <div className="teacher-table-container">
            <div className="table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <User className="th-icon" />
                        Student Name
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <BookOpen className="th-icon" />
                        Quiz Name
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Target className="th-icon" />
                        Score
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <TrendingUp className="th-icon" />
                        Performance
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teacherResults.map((entry, index) => {
                    const performance = getPerformanceLevel(entry.mark);
                    return (
                      <tr key={index} className="table-row">
                        <td>
                          <div className="student-cell">
                            <div className="student-avatar">
                              {entry.studentName.charAt(0).toUpperCase()}
                            </div>
                            <span className="student-name">{entry.studentName}</span>
                          </div>
                        </td>
                        <td>
                          <div className="quiz-cell">
                            <span className="quiz-title">{entry.quizName}</span>
                          </div>
                        </td>
                        <td>
                          <div className="score-cell">
                            <span className="score-value">{entry.mark.toFixed(1)}%</span>
                            <div className="mini-score-bar">
                              <div 
                                className="mini-score-fill" 
                                style={{ 
                                  width: `${entry.mark}%`,
                                  backgroundColor: performance.color 
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="performance-cell">
                            <span 
                              className="performance-tag"
                              style={{ 
                                backgroundColor: `${performance.color}20`,
                                color: performance.color,
                                border: `1px solid ${performance.color}40`
                              }}
                            >
                              {performance.icon} {performance.level}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {teacherResults.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Users />
                  </div>
                  <h3>No student submissions yet</h3>
                  <p>Student quiz results will appear here once they start taking your quizzes.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Background Elements */}
      <div className="profile-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
    </div>
  );
};

export default Profile;