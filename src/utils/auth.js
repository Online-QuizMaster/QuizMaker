import { jwtDecode } from 'jwt-decode'; 

// Get userType from token
export const getUserTypeFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); 
    console.log('Decoded token:', decoded);
    return decoded.userType || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

// Get user's initials from full name in token
export const getUserInitialFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    const fullName = decodedToken.fullName;

    if (!fullName || typeof fullName !== 'string') return null;

    const initials = fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();

    return initials;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

// Get teacherId from token (same as userId here)
export const getTeacherId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
      return decodedToken.userid || null; 
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
  return null;
};

// Get userId from token
export const getUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
      return decodedToken.userid || null; 
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
  return null;
};
