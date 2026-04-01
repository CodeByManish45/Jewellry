/**
 * Simulation of an Authentication API Service
 */

const API_DELAY = 800; // ms

export const authService = {
  /**
   * Login user and return fake token + user details
   */
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple logic to simulate role-based login
        if (email === 'admin@sumitjewellers.com' && password === 'admin123') {
          resolve({
            user: {
              id: 1,
              name: 'Admin User',
              email: email,
              role: 'admin',
              avatar: 'A'
            },
            token: 'fake-jwt-token-admin'
          });
        } else if (email && password) {
          resolve({
            user: {
              id: Date.now(),
              name: email.split('@')[0],
              email: email,
              role: 'user',
              avatar: email.charAt(0).toUpperCase()
            },
            token: 'fake-jwt-token-user'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, API_DELAY);
    });
  },

  /**
   * Signup user and return user details
   */
  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Date.now(),
            ...userData,
            role: 'user', // Default role for new signups
            avatar: userData.name.charAt(0).toUpperCase()
          },
          token: 'fake-jwt-token-new'
        });
      }, API_DELAY);
    });
  },

  /**
   * Logout user
   */
  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300); // Shorter delay for logout
    });
  }
};
