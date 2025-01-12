//import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {

  // Not used / called anywhere
  // getProfile() { 
  //   // TODO: return the decoded token ***********************************************
  // }

  loggedIn() {

    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;

  }
  // Not used or called anywhere
  // isTokenExpired(token: string) { 
  //   // TODO: return a value that indicates if the token is expired ***********************************************

  // }

  getToken(): string {

    // TODO: return the token
    const loggedInUser = localStorage.getItem('id_token') || '';
    return loggedInUser;

  }

  login(idToken: string) {
    
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);

    // TODO: redirect to the home page
    window.location.assign('/');

  }

  logout() {
    
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    
    // TODO: redirect to the login page
    window.location.assign('/');

  }
}

// Export an instance of the AuthService class
export default new AuthService();
