export const generatePassword = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

  const allCharacters = lowercase + uppercase + numbers + specialCharacters;
  let password = '';

  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password +=
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

  for (let i = 4; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};
