// src/utils/auth.js
import { jwtDecode } from 'jwt-decode'; // Corrected import

// Get the user type (teacher or student) from the token
export const getUserTypeFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // Using jwtDecode instead of jwt_decode
    console.log('Decoded token:', decoded);
    return decoded.userType || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

// Get the first letter of the user's full name
export const getUserInitialFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // Using jwtDecode instead of jwt_decode
    const name = decoded.fullName || '';
    return name.charAt(0).toUpperCase();
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

// Get the teacher ID from the token (assuming it's in the user_id field)
export const getTeacherId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Using jwtDecode instead of jwt_decode
     
      return decodedToken.userid; 
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
  return null;
};
