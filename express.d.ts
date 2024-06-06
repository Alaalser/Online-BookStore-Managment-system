declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type according to your 'user' object structure
    }
  }
}
