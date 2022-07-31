export const formatSpecialCharactersAndNumbers = (value: string) =>
    value.replace(/[^a-zA-Z\s]/g, '');

export const formatTrim = (value: string) => value.trim();

export const formatMultipleSpaces = (value: string) => value.replace(/\s\s+/g, ' ');

export const formatCharactersAndNumbersAndSpaces = (value: string) =>
    formatMultipleSpaces(formatSpecialCharactersAndNumbers(value));
