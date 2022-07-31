import * as validations from './validations';

const treeData = {
    fullName: 'Penelope Randi',
    email: 'penelope.randi@example.com',
    subNodes: [
        {
            fullName: 'Andre Martina',
            email: 'andre.martina@example.com',
            subNodes: [
                {
                    fullName: 'Barakat Yehud',
                    email: 'barakat.yehud@example.com',
                    subNodes: [
                        {
                            fullName: 'Janvier Inara',
                            email: 'janvier.inara@example.com',
                        },
                        {
                            fullName: 'Janvier Inara In',
                            email: 'janvier.inara.in@example.com',
                        },
                        {
                            fullName: 'Janvier Inara InI',
                            email: 'janvier.inara.ini@example.com',
                        },
                    ],
                },
            ],
        },
        {
            fullName: 'Reiner Pollux',
            email: 'reiner.pollux@example.com',
        },
    ],
};

describe('Validations', () => {
    it('isRequiredValueFilled: Should check field is filled', () => {
        expect(validations.isRequiredValueFilled('')).toEqual('Value is required');
        expect(validations.isRequiredValueFilled('   ')).toEqual('Value is required');
        expect(validations.isRequiredValueFilled('123')).toBeTruthy();
        expect(validations.isRequiredValueFilled(0)).toBeTruthy();
        expect(validations.isRequiredValueFilled(10)).toBeTruthy();
    });

    it('isCorrectFullNameLength: Should check value length is between 3 and 64', () => {
        expect(validations.isCorrectFullNameLength('1')).toEqual(
            'Length must be between 3 and 64 characters',
        );
        expect(validations.isCorrectFullNameLength('23')).toEqual(
            'Length must be between 3 and 64 characters',
        );
        expect(validations.isCorrectFullNameLength('233')).toBeTruthy();
        expect(
            validations.isCorrectFullNameLength(
                '1111111111111111111111111111111111111111111111111111111111111111111111',
            ),
        ).toEqual('Length must be between 3 and 64 characters');
        expect(validations.isCorrectFullNameLength('   23   ')).toEqual(
            'Length must be between 3 and 64 characters',
        );
    });

    it('isFullNameNoMoreThanFourWords: Should check value is no more than 4 words', () => {
        expect(validations.isFullNameNoMoreThanFourWords('Test')).toBeTruthy();
        expect(validations.isFullNameNoMoreThanFourWords(' Test ')).toBeTruthy();
        expect(validations.isFullNameNoMoreThanFourWords('Test Test Test Test Test')).toEqual(
            'Full name can only be no more than four words',
        );
        expect(validations.isFullNameNoMoreThanFourWords('   Test Test Test Test   ')).toBeTruthy();
        expect(validations.isCorrectFullNameLength('   2     3   ')).toEqual(
            'Length must be between 3 and 64 characters',
        );
    });

    it('isFullNameStartsWithCapitalLetter: Should check if all values start with capital letter', () => {
        expect(validations.isFullNameStartsWithCapitalLetter('test')).toEqual(
            'All names have to start with uppercase letter',
        );
        expect(validations.isFullNameStartsWithCapitalLetter('Test')).toBeTruthy();
        expect(validations.isFullNameStartsWithCapitalLetter('Test test')).toEqual(
            'All names have to start with uppercase letter',
        );
        expect(validations.isFullNameStartsWithCapitalLetter('Test test   Test test')).toEqual(
            'All names have to start with uppercase letter',
        );
        expect(validations.isFullNameStartsWithCapitalLetter('Test Test   Test Test')).toBeTruthy();
    });

    it('isFullNameUnique: Should check if name is unique', () => {
        expect(validations.isFullNameUnique(treeData)('Maksimilian Ceresniovyj')).toBeTruthy();
        expect(validations.isFullNameUnique(treeData)('Penelope Randi')).toEqual(
            'Such full name already exists',
        );
        expect(validations.isFullNameUnique(treeData)('Janvier Inara InI')).toEqual(
            'Such full name already exists',
        );
        expect(validations.isFullNameUnique(treeData)('   Janvier Inara InI   ')).toEqual(
            'Such full name already exists',
        );
    });

    it('isEmailValid: Should check if email is valid', () => {
        expect(validations.isEmailValid('Test Test')('test.test@example.com')).toBeTruthy();
        expect(validations.isEmailValid('Test Test Test')('test.test@example.com')).toEqual(
            'Email is of incorrect format',
        );
        expect(
            validations.isEmailValid('Test    Test     Test')('test.test.test@example.com'),
        ).toBeTruthy();
        expect(
            validations.isEmailValid('   Test    Test     Test   ')(
                '   test.test.test@example.com   ',
            ),
        ).toBeTruthy();
    });

    it('onValidateField: Should return errors', () => {
        expect(
            validations.getValidationErrors([validations.isRequiredValueFilled], ''),
        ).toStrictEqual(['Value is required']);
        expect(
            validations.getValidationErrors(
                [
                    validations.isCorrectFullNameLength,
                    validations.isFullNameNoMoreThanFourWords,
                    validations.isFullNameStartsWithCapitalLetter,
                    validations.isFullNameUnique(treeData),
                ],
                'test',
            ),
        ).toStrictEqual(['All names have to start with uppercase letter']);
        expect(
            validations.getValidationErrors(
                [
                    validations.isCorrectFullNameLength,
                    validations.isFullNameNoMoreThanFourWords,
                    validations.isFullNameStartsWithCapitalLetter,
                    validations.isFullNameUnique(treeData),
                ],
                'Penelope Randi',
            ),
        ).toStrictEqual(['Such full name already exists']);
        expect(
            validations.getValidationErrors(
                [
                    validations.isCorrectFullNameLength,
                    validations.isFullNameNoMoreThanFourWords,
                    validations.isFullNameStartsWithCapitalLetter,
                    validations.isFullNameUnique(treeData),
                ],
                'pe',
            ),
        ).toStrictEqual([
            'Length must be between 3 and 64 characters',
            'All names have to start with uppercase letter',
        ]);

        expect(
            validations.getValidationErrors(
                [
                    validations.isCorrectFullNameLength,
                    validations.isFullNameNoMoreThanFourWords,
                    validations.isFullNameStartsWithCapitalLetter,
                    validations.isFullNameUnique(treeData),
                ],
                'pe pe pe pe pe',
            ),
        ).toStrictEqual([
            'Full name can only be no more than four words',
            'All names have to start with uppercase letter',
        ]);
    });
});
