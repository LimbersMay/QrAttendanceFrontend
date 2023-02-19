import React, {useEffect, useMemo, useState} from "react";

type FormValidation<T> = Record<string, string | null>

export type FormValidations = Record<string, [Function, string, string?]>

type FormState<T> = T & Record<string, any>

export const useForm = <T>( initialForm: FormState<T>, formValidations: FormValidations = {} ) => {

    const [formState, setFormState] = useState<FormState<T>>( initialForm );
    const [ formValidation, setFormValidation ] = useState<FormValidation<T>>({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation]);

    const convertValue = (value: any) => {
        return value.toString();
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const newValue = convertValue(value);

        setFormState({
            ...formState,
            [name]: newValue
        });
    }

    const onDateChange = (name: string, value: unknown) => {
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues: FormValidation<T> = {};

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage, dependency ] = formValidations[formField];

            //formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
            // make validations that accept n params
            formCheckedValues[`${formField}Valid`] = fn(formState[formField], formState[dependency ?? '']) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onDateChange,
        ...formValidation,
        formValidation,
        isFormValid
    }
}