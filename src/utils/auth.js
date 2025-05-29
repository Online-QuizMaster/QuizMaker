import { jwtDecode } from 'jwt-decode'; 

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

export const getUserInitialFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decodedToken = jwtDecode(token);
  const fullName = decodedToken.fullName; 
  const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
  
  return initials;
};

export const getTeacherId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
     
      return decodedToken.userid; 
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
  return null;
};

export const getUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
      return decodedToken.userid; 
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }
  return null;
};
