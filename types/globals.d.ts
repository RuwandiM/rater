declare global {
    interface SessionClaims {
      metadata?: {
        role?: string;
      };
    }
  }