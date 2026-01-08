// ✅ src/utils/validation.ts

// Validate email format
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password (min length 6)
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Validate name (letters only, at least 2 chars)
export const validateName = (name: string): boolean => {
  const re = /^[A-Za-z\s]{2,}$/;
  return re.test(name);
};




