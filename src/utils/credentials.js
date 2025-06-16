// Utility for basic credential obfuscation
// Note: This is NOT secure encryption, just basic obfuscation
// For real security, use proper authentication services

const obfuscate = (str) => {
  return btoa(str).split('').reverse().join('');
};

const deobfuscate = (str) => {
  return atob(str.split('').reverse().join(''));
};

// Obfuscated credentials (change these to your obfuscated values)
const OBFUSCATED_USERNAME = obfuscate('admin'); 
const OBFUSCATED_PASSWORD = obfuscate('portfolio2025');

export const getCredentials = () => {
  return {
    username: deobfuscate(OBFUSCATED_USERNAME),
    password: deobfuscate(OBFUSCATED_PASSWORD)
  };
};

// To generate your obfuscated credentials, run in browser console:
// console.log('Username:', btoa('your_username').split('').reverse().join(''));
// console.log('Password:', btoa('your_password').split('').reverse().join(''));
