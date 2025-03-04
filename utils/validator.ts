// utils/validator.ts
export const isValidPhoneNumber = (phone: string): boolean => {
    // Remove non-digit characters
    const cleanPhone = phone.replace(/[^\d]/g, "");
    // Check if it matches Nigerian format (without +)
    const regex = /^(234)\d{10}$/;
    return regex.test(cleanPhone);
};

export const formatPhoneNumber = (phone: string): string => {
    const cleanPhone = phone.replace(/[^\d]/g, "");

    if (cleanPhone.startsWith("0")) {
        // Convert local format to international without +
        return "234" + cleanPhone.slice(1);
    }
    if (cleanPhone.startsWith("+234")) {
        // Remove + for Termii's requirement
        return cleanPhone.slice(1);
    }
    if (cleanPhone.startsWith("234")) {
        return cleanPhone;
    }
    return cleanPhone;  // Return if already in the correct format
};
