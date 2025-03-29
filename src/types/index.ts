// export interface User {
//   _id: string;
//   username: string;
//   email: string;
//   password: string; // Note: Consider removing this if you don't need it on the client-side
// }

// export interface AuthResponse {
//   token: string; // JWT token for authentication
//   user: Omit<User, 'password'>; // User data without password field for security reasons
// }

// types.ts or authTypes.ts (you can name it as per your project structure)

export interface User {
  _id: string; // Unique identifier for the user
  username: string; // Username of the user
  email: string; // Email address of the user
 
}

export interface Createtasks {
  _id: string;
  username: string;
  type: string;
  title: string;
  description: string;
  createdAt: Date; 
}

export interface AuthResponse {
  token: string; // JWT token for authentication
  user: Omit<User, 'password'>; // User data without password field for security reasons
}
