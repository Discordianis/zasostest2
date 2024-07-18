import {useState} from "react";
import useValidation from "./useValidation.js";

export default function useInput(defaultValue = '', validation){

    let [value, setValue] = useState(defaultValue);
    let [inputBlur, setInputBlur] = useState(false);
    let valid = useValidation(value, validation)

    return{
        value,
        onChange: (e) => setValue(e.target.value),
        onBlur: () => setInputBlur(true),
        inputBlur: inputBlur,
        ...valid
    }
}