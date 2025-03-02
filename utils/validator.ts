// utils/validator.ts
export const isValidPhoneNumber = (phone: string): boolean => {
    // Regex for international or local formats
    const regex = /^(\+234|234|0)\d{10}$/;
    return regex.test(phone);
};

export const formatPhoneNumber = (phone: string): string => {
    // Convert local format to international format
    if (phone.startsWith("0")) {
        return "+234" + phone.slice(1);
    }
    if (phone.startsWith("234")) {
        return "+" + phone;
    }
    return phone;  // Return if already in international format
};
