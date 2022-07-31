import { TreeData } from '../store/tree/types';

export const isRequiredValueFilled = (value: string | number): string | boolean => {
    if (typeof value === 'number') {
        return true;
    }

    if (!value?.trim()) {
        return 'Value is required';
    }

    return true;
};

export const isCorrectFullNameLength = (value: string): string | boolean => {
    const valueLength = value.trim().split(' ').filter(Boolean).join('').length;

    if (valueLength >= 3 && valueLength <= 64) {
        return true;
    }

    return 'Length must be between 3 and 64 characters';
};

export const isFullNameNoMoreThanFourWords = (value: string): string | boolean => {
    if (value.trim().split(' ').filter(Boolean).length > 4) {
        return 'Full name can only be no more than four words';
    }

    return true;
};

export const isFullNameStartsWithCapitalLetter = (value: string): string | boolean => {
    const valueArray = value.trim().split(' ').filter(Boolean);

    for (const word of valueArray) {
        if (word[0] !== word[0].toUpperCase()) {
            return 'All names have to start with uppercase letter';
        }
    }

    return true;
};

export const isFullNameUnique =
    (treeData: TreeData) =>
    (value: string): string | boolean => {
        if (treeData.fullName === value.trim().split(' ').filter(Boolean).join(' ')) {
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

        return true;
    };

export const isEmailValid =
    (fullName: string) =>
    (emailValue: string): string | boolean => {
        let email: string = '';
        const words = fullName.trim().split(' ').filter(Boolean);

        words.forEach((word, index) => {
            email += word.toLowerCase();

            if (index < words.length - 1) {
                email += '.';
            } else {
                email += '@example.com';
            }
        });

        if (email !== emailValue.trim()) {
            return 'Email is of incorrect format';
        }

        return true;
    };

export const getValidationErrors = (
    validations: ((value: string) => string | boolean)[],
    value: string,
) => {
    return validations
        .map((validationFunc) => {
            const result = validationFunc(value);

            if (typeof result === 'string') {
                return result;
            }

            return null;
        })
        .filter(Boolean) as string[];
};
