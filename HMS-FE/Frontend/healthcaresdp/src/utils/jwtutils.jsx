import jwt_decode from 'jwt-decode';

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwt_decode(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // If decoding fails, treat token as expired
  }
}
