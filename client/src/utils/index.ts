export const handleFirebaseError = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/invalid-credential": "Invalid credentials.",
    "auth/operation-not-allowed":
      "Email/password accounts are not enabled. Please contact support.",
    "auth/weak-password":
      "The password is too weak. Please choose a stronger password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };

  return (
    errorMessages[errorCode] || "An unknown error occurred. Please try again."
  );
};
