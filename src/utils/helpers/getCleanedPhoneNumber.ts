export const getCleanedPhoneNumber = (phoneNumber: number) => {
    if (!phoneNumber) {
        return null;
    }

    const cleanedPhoneNumber = phoneNumber.toString().replace(/\D/g, '');

    if (cleanedPhoneNumber.length < 11) {
        return null;
    }

    return cleanedPhoneNumber;
}