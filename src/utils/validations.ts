export const isCorrectFullNameLength = (value: string) => {
    const valueLength = value.trim().split(' ').join('').length;

    if (valueLength >= 3 && valueLength <= 64) {
        return true;
    }

    return 'Length must be between 3 and 64 characters';
};
