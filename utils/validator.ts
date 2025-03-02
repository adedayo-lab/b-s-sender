export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+234|234|0)[789]\d{9}$/;
  return phoneRegex.test(phone);
};
