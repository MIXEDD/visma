import { TreeData } from '../store/tree/types';

export const isRequiredValueFilled = (value: string): string | boolean => {
    if (!value?.trim()) {
        return 'Value is required';
    }

    return true;
};

export const isCorrectFullNameLength = (value: string): string | boolean => {
    const valueLength = value.trim().split(' ').join('').length;

    if (valueLength >= 3 && valueLength <= 64) {
        return true;
    }

    return 'Length must be between 3 and 64 characters';
};

export const isFullNameNoMoreThanFourWords = (value: string): string | boolean => {
    if (value.trim().split(' ').length > 4) {
        return 'Full name can only be no more than four words';
    }

    return true;
};

export const isFullNameStartsWithCapitalLetter = (value: string): string | boolean => {
    let isError = false;

    value
        .trim()
        .split(' ')
        .forEach((word) => {
            if (word[0] !== word[0].toUpperCase()) {
                isError = true;
            }
        });

    if (isError) {
        return 'All names have to start with uppercase letter';
    }

    return true;
};

export const isFullNameUnique =
    (treeData: TreeData) =>
    (value: string): string | boolean => {
        if (treeData.fullName === value) {
            return 'Such full name already exists';
        }

        if (treeData.subNodes) {
            for (const node of treeData.subNodes) {
                const result = isFullNameUnique(node)(value);

                if (typeof result === 'string') {
                    return result;
                }
            }
        }

        return false;
    };

export const isEmailValid =
    (fullname: string) =>
    (emailValue: string): string | boolean => {
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
