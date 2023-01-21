import React, {useEffect, useMemo, useState} from "react";

type FormValidation<T> = Record<string, string | null>

type FormValidations = Record<string, [Function, any]>

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

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues: FormValidation<T> = {};

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}