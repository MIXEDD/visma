export const onValidateField = (
    validations: Array<(value: string) => string | boolean>,
    value: string,
    setFormError: (error: boolean) => void,
    setLocalErrors: (errors: string[]) => void,
) => {
    if (!validations) {
        return;
    }

    const errorMessages = validations
        .map((validationFunc) => {
            const result = validationFunc(value);

            if (typeof result === 'string') {
                return result;
            }

            return null;
        })
        .filter(Boolean) as string[];

    setLocalErrors(errorMessages);

    if (errorMessages.length) {
        setFormError(true);
    } else {
        setFormError(false);
    }
};
