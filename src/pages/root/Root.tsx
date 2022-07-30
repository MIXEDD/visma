import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import InputField from '../../atoms/input-field/InputField';
import Typography, { ElementType } from '../../atoms/typography/Typography';
import Button from '../../atoms/button/Button';
import { formatSpecialCharactersAndNumbers } from '../../utils/format';
import {
    getValidationErrors,
    isCorrectFullNameLength,
    isEmailValid,
    isFullNameNoMoreThanFourWords,
    isFullNameStartsWithCapitalLetter,
    isFullNameUnique,
    isRequiredValueFilled,
} from '../../utils/validations';
import Selector from '../../atoms/selector/Selector';
import { RootState } from '../../store';
import { TreeData } from '../../store/tree/types';
import { getTreeNodes } from '../../utils/tree';
import { onSetNode } from '../../store/tree/actions';

import styles from './Root.module.scss';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [coach, setCoach] = useState<string>('');
    const [fullNameErrors, setFullNameErrors] = useState<string[]>([]);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [coachErrors, setCoachErrors] = useState<string[]>([]);
    const treeState = useSelector((state: RootState) => state.tree);

    const coachesOptions = useMemo(() => {
        return getTreeNodes(treeState);
    }, [treeState]);

    const onChangeFullName = (value: string) => {
        setFullName(value);

        if (fullNameErrors.length) {
            setFullNameErrors([]);
        }
    };

    const onSetEmail = (value: string) => {
        setEmail(value);

        if (emailErrors.length) {
            setEmailErrors([]);
        }
    };

    const onSetCoach = (value: string) => {
        setCoach(value);

        if (coachErrors.length) {
            setCoachErrors([]);
        }
    };

    const onClickSubmit = () => {
        const fullNameErrorMessages = getValidationErrors(
            [isRequiredValueFilled, ...addFullNameValidation(fullName, treeState)],
            fullName,
        );
        const emailErrorMessages = getValidationErrors(
            [isRequiredValueFilled, ...addEmailValidation(email, fullName)],
            email,
        );
        const coachErrorMessages = getValidationErrors([isRequiredValueFilled], coach);

        setFullNameErrors(fullNameErrorMessages);
        setEmailErrors(emailErrorMessages);
        setCoachErrors(coachErrorMessages);

        if (
            !fullNameErrorMessages.length &&
            !emailErrorMessages.length &&
            !coachErrorMessages.length
        ) {
            dispatch(
                onSetNode({
                    fullName,
                    email,
                    coach,
                }),
            );
            navigate(ROUTES.TREE);
        }
    };

    return (
        <div className={styles.container}>
            <Typography text="Create form" elementType={ElementType.H1} />
            <InputField
                label="Full name*:"
                value={fullName}
                onChangeInput={onChangeFullName}
                format={formatSpecialCharactersAndNumbers}
                errors={fullNameErrors}
            />
            <InputField
                label="Email*:"
                value={email}
                onChangeInput={onSetEmail}
                errors={emailErrors}
            />
            <Selector
                data={[{ value: '', label: '' }, ...coachesOptions]}
                onChange={onSetCoach}
                label="Select coach*:"
                errors={coachErrors}
            />
            <Button text="Create" onClick={onClickSubmit} />
        </div>
    );
};

export default Root;
