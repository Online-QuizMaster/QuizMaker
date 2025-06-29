import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './QuizDashboard.css';
import quizeeImg from '../Assets/Quizee.jpg';
import axios from 'axios';
import { getUserTypeFromToken, getTeacherId } from '../utils/auth';
import { Search, Filter, Plus, Trash2, Play, Clock, Users, BookOpen, Star, TrendingUp } from 'lucide-react';

const staticQuizzes = [
  {
    id: 1,
    title: 'Java/OOP',
    description: 'Test your Java skills with this exciting quiz! Master object-oriented programming concepts and advanced Java features.',
    updated: 'Updated 2 days ago',
    image: quizeeImg,
    difficulty: 'Intermediate',
    questions: 25,
    participants: 1247,
    rating: 4.8,
    category: 'Programming'
  },
  {
    id: 2,
    title: 'Aptitude',
    description: 'Challenge your logical thinking with this comprehensive aptitude quiz! Improve your problem-solving skills.',
    updated: 'Updated 3 days ago',
    image: quizeeImg,
    difficulty: 'Beginner',
    questions: 30,
    participants: 892,
    rating: 4.6,
    category: 'Logic'
  },
  {
    id: 3,
    title: 'Computer Network',
    description: 'Test your knowledge of computer networks with this detailed quiz! Explore networking protocols and concepts.',
    updated: 'Updated 1 week ago',
    image: quizeeImg,
    difficulty: 'Advanced',
    questions: 20,
    participants: 634,
    rating: 4.7,
    category: 'Networking'
  },
  {
    id: 4,
    title: 'Database Management System',
    description: 'Evaluate your DBMS skills with this challenging quiz! Master SQL queries and database design principles.',
    updated: 'Updated 5 days ago',
    image: quizeeImg,
    difficulty: 'Intermediate',
    questions: 28,
    participants: 756,
    rating: 4.9,
    category: 'Database'
  },
];

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState(staticQuizzes);
  const [userType, setUserType] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const type = getUserTypeFromToken();
    const id = getTeacherId();
    setUserType(type);
    setTeacherId(id);

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://quizee-backend-vge7.onrender.com/api/get-all-quizzes');
        
        const apiQuizzes = response.data.quizzes
          .filter((quiz) => {
            if (type === 'teacher') {
              return quiz.teacherId === id;
            }
            return true;
          })
          .map((quiz) => ({
            id: quiz._id,
            title: quiz.title,
            description: quiz.description,
            updated: 'Just now',
            image: quizeeImg, // Using your local image
            difficulty: 'Intermediate',
            questions: 20,
            participants: Math.floor(Math.random() * 1000) + 100,
            rating: (Math.random() * 1 + 4).toFixed(1),
            category: 'Custom'
          }));

        setQuizzes((prevQuizzes) => {
          const allQuizzes = [...prevQuizzes, ...apiQuizzes];
          const uniqueQuizzes = allQuizzes.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          return uniqueQuizzes;
        });
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [userType, teacherId]);

  const handleDelete = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await axios.delete(`https://quizee-backend-vge7.onrender.com/api/delete-quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert("Quiz deleted successfully!");
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz.");
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(quizzes.map(quiz => quiz.category))];

  return (
    <div className={`quiz-dashboard ${isLoaded ? 'dashboard-loaded' : ''}`}>
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <div className="welcome-badge">
              <Star className="badge-icon" />
              <span className="badge-text">Quiz Dashboard</span>
            </div>
            <h1 className="dashboard-title">
              <span className="title-line">Discover Amazing</span>
              <span className="title-line highlight">Quiz Experiences</span>
            </h1>
            <p className="dashboard-description">
              Explore our collection of interactive quizzes designed to challenge and enhance your knowledge
            </p>
          </div>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <BookOpen />
              </div>
              <div className="stat-content">
                <span className="stat-number">{quizzes.length}</span>
                <span className="stat-label">Total Quizzes</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Users />
              </div>
              <div className="stat-content">
                <span className="stat-number">12K+</span>
                <span className="stat-label">Active Users</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-content">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-filter-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <Filter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {userType === 'teacher' && (
            <Link to="/create" className="create-quiz-btn">
              <Plus className="btn-icon" />
              <span>Create Quiz</span>
            </Link>
          )}
        </div>
      </div>

      {/* Quiz Results Section */}
      <div className="quiz-section">
        <div className="quiz-section-header">
          <p className="quiz-count">
            <span className="count-number">{filteredQuizzes.length}</span>
            <span className="count-text">quizzes found</span>
          </p>
        </div>

        <div className="quiz-grid">
          {filteredQuizzes.map((quiz, index) => (
            <div 
              key={quiz.id} 
              className="quiz-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image-container">
                <img src={quiz.image} alt={quiz.title} className="quiz-image" />
                <div className="image-overlay">
                  <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(quiz.difficulty) }}>
                    {quiz.difficulty}
                  </div>
                  <div className="rating-badge">
                    <Star className="star-icon" />
                    <span>{quiz.rating}</span>
                  </div>
                </div>
              </div>

              <div className="quiz-content">
                <div className="quiz-header">
                  <h3 className="quiz-title">{quiz.title}</h3>
                  <span className="quiz-category">{quiz.category}</span>
                </div>
                
                <p className="quiz-description">
                  {quiz.description.split(' ').slice(0, 20).join(' ')}
                  {quiz.description.split(' ').length > 20 ? '...' : ''}
                </p>

                <div className="quiz-meta">
                  <div className="meta-item">
                    <BookOpen className="meta-icon" />
                    <span>{quiz.questions} Questions</span>
                  </div>
                  <div className="meta-item">
                    <Users className="meta-icon" />
                    <span>{quiz.participants} Participants</span>
                  </div>
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <span>{quiz.updated}</span>
                  </div>
                </div>

                <div className="quiz-actions">
                  <Link to={`/quiz/${quiz.id}`} className="start-quiz-btn">
                    <Play className="btn-icon" />
                    <span>Start Quiz</span>
                  </Link>
                  
                  {userType === 'teacher' && (
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="delete-quiz-btn"
                    >
                      <Trash2 className="btn-icon" />
                    </button>
                  )}
                </div>
              </div>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search />
            </div>
            <h3>No quizzes found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      {/* Floating Background Elements */}
      <div className="dashboard-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
    </div>
  );
};

export default QuizDashboard;