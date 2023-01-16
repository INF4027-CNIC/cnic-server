import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
  return uuidv4();
};

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const isPasswordMatched = async (
  password: string,
  hashedPassword: string,
) => {
  return await argon2.verify(hashedPassword, password);
};
