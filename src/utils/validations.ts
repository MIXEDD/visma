export const isCorrectFullNameLength = (value: string) => {
    const valueLength = value.trim().split(' ').join('').length;

    if (valueLength >= 3 && valueLength <= 64) {
        return true;
    }

    return 'Length must be between 3 and 64 characters';
};

export const isFullNameNoMoreThanFourWords = (value: string) => {
    if (value.trim().split(' ').length > 4) {
        return 'Full name can only be no more than four words';
    }

    return true;
};

export const isFullNameStartsWithCapitalLetter = (value: string) => {
    let isError = false;

    value.split(' ').forEach((word) => {
        if (word[0] !== word[0].toUpperCase()) {
            isError = true;
        }
    });

    if (isError) {
        return 'All names have to start with uppercase letter';
    }

    return true;
};

export const isFullNameUnique = (data: any) => (value: string) => {
    return true;
};

export const isEmailValid = (fullname: string) => (emailValue: string) => {
    let email: string = '';
    const words = fullname.trim().split(' ');

    words.forEach((word, index) => {
        email += word.toLowerCase();

        if (index < words.length - 1) {
            email += '.';
        }
    });

    email += '@example.com';

    if (email !== emailValue) {
        return 'Email is of incorrect format';
    }

    return true;
};
