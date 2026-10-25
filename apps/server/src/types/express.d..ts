declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string | null;
      imageUrl: string | null;
    }
  }
}

export {};