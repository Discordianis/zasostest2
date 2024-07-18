import {useEffect, useState} from "react";

export default function useValidation(value, validations){

    let [emptyInput, setEmptyInput] = useState(true);
    let [minLengthError, setMinLengthError] = useState(false);
    let [maxLengthError, setMaxLengthError] = useState(false);
    let [emailError, setEmailError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);
    let [anyError, setAnyError] = useState(false);

    //валидация почты
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    //валидация пароля
    const rp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/iu;

    useEffect(() => {
        for (const validKey in validations) {
            switch (validKey){
                case 'empty_input':
                    value.length ? setEmptyInput(false) :
                    setEmptyInput(true);
                    break;
                case 'min_length':
                    value.length < validations[validKey] ?
                    setMinLengthError(true) :
                    setMinLengthError(false);
                    break;
                case 'max_length':
                    value.length > validations[validKey] ?
                    setMaxLengthError(true) :
                    setMaxLengthError(false);
                    break;
                case 'email_error':
                    re.test(String(value).trim()) ?
                    setEmailError(false) : setEmailError(true);
                    break;
                case 'password_error':
                    rp.test(String(value).trim()) ?
                    setPasswordError(false) :
                    setPasswordError(true);
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if (emptyInput || minLengthError || maxLengthError || emailError || passwordError){
            setAnyError(true);
        }
        else {
            setAnyError(false)
        }
    }, [emptyInput, minLengthError, maxLengthError, emailError, passwordError]);

    return{
        emptyInput,
        minLengthError,
        maxLengthError,
        emailError,
        passwordError,
        anyError
    }
}