import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import InputField from '../../atoms/input-field/InputField';
import Typography, { ElementType } from '../../atoms/typography/Typography';
import Button from '../../atoms/button/Button';
import { formatSpecialCharactersAndNumbers } from '../../utils/format';
import {
    isCorrectFullNameLength,
    isEmailValid,
    isFullNameNoMoreThanFourWords,
    isFullNameStartsWithCapitalLetter,
    isFullNameUnique,
    isRequiredValueFilled,
} from '../../utils/validations';
import Selector from '../../atoms/selector/Selector';
import { RootReducer } from '../../store';
import { TreeData } from '../../store/tree/types';

import styles from './Root.module.scss';
import { getTreeNodes } from '../../utils/tree';

const addFullNameValidation = (value: string, treeData: TreeData) => {
    if (!value) {
        return [];
    }

    return [
        isCorrectFullNameLength,
        isFullNameNoMoreThanFourWords,
        isFullNameStartsWithCapitalLetter,
        isFullNameUnique(treeData),
    ];
};

const addEmailValidation = (value: string, fullName: string) => {
    if (!value) {
        return [];
    }

    return [isEmailValid(fullName)];
};

const Root: React.FC = () => {
    const [fullName, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [coach, setCoach] = useState<string>('');
    const [isFormError, setIsFormError] = useState<boolean>(true);
    const treeState = useSelector((state: RootReducer) => state.tree);

    const coachesOptions = useMemo(() => {
        return getTreeNodes(treeState);
    }, [treeState]);

    const onChangeFullName = (value: string) => {
        setFullname(value);
    };

    const onSetEmail = (value: string) => {
        setEmail(value);
    };

    const onSetCoach = (value: string) => {
        setCoach(value);
    };

    const onClickSubmit = () => {};

    return (
        <div className={styles.container}>
            <Typography text="Create form" elementType={ElementType.H1} />
            <InputField
                label="Full name*:"
                onChangeInput={onChangeFullName}
                value={fullName}
                format={formatSpecialCharactersAndNumbers}
                validations={{
                    validationFunctions: [
                        isRequiredValueFilled,
                        ...addFullNameValidation(fullName, treeState),
                    ],
                    setFormError: setIsFormError,
                }}
            />
            <InputField
                label="Email*:"
                onChangeInput={onSetEmail}
                value={email}
                validations={{
                    validationFunctions: [
                        isRequiredValueFilled,
                        ...addEmailValidation(email, fullName),
                    ],
                    setFormError: setIsFormError,
                }}
            />
            <Selector
                data={[{ value: '', label: '' }, ...coachesOptions]}
                onChange={onSetCoach}
                label="Select coach*:"
                validations={{
                    validationFunctions: [isRequiredValueFilled],
                    setFormError: setIsFormError,
                }}
            />
            <Button text="Create" onClick={onClickSubmit} disabled={isFormError} />
        </div>
    );
};

export default Root;
