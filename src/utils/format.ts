export const formatSpecialCharactersAndNumbers = (value: string) =>
    value.replace(/[^a-zA-Z\s]/g, '');
