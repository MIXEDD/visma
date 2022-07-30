import * as format from './format';

describe('Format', () => {
    it('formatSpecialCharactersAndNumbers: should replace all special characters and numbers', () => {
        expect(format.formatSpecialCharactersAndNumbers('!@#$%^&*()_+-=')).toEqual('');
        expect(format.formatSpecialCharactersAndNumbers('!@#$%^&*()_+-=1234567890')).toEqual('');
        expect(format.formatSpecialCharactersAndNumbers('T!@#$%^&*E()_+-=12S3456789T0')).toEqual(
            'TEST',
        );
    });
});
