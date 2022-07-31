import * as format from './format';

describe('Format', () => {
    it('formatSpecialCharactersAndNumbers: should replace all special characters and numbers', () => {
        expect(format.formatSpecialCharactersAndNumbers('!@#$%^&*()_+-=')).toEqual('');
        expect(format.formatSpecialCharactersAndNumbers('!@#$%^&*()_+-=1234567890')).toEqual('');
        expect(format.formatSpecialCharactersAndNumbers('T!@#$%^&*E()_+-=12S3456789T0')).toEqual(
            'TEST',
        );
    });

    it('formatTrim: Should trim spaces', () => {
        expect(format.formatTrim('  test  ')).toEqual('test');
    });

    it('formatMultipleSpaces: Should remove multiple spaces', () => {
        expect(format.formatMultipleSpaces('  te   s   t  ')).toEqual(' te s t ');
    });

    it('formatCharactersAndNumbersAndSpaces: Should remove special characters, number, multiple spaces', () => {
        expect(
            format.formatCharactersAndNumbersAndSpaces('T!@#$%^&*E    ()_+-=12S345     6789T0'),
        ).toEqual('TE S T');
    });
});
