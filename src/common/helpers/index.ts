import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
  // generate code with format yyyyxxxxxxxxxxxxx
  const date = new Date();

  const year = date.getFullYear();

  // Generate random number with 15 digits
  const randomNumber = Math.floor(Math.random() * 100000000);

  return `${year}${randomNumber}`;
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
