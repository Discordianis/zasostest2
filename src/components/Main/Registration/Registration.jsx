import './Registration.css';
import Button from "../../Button/Button.jsx";
import Modal from "../../Modal/Modal.jsx";
import {useState} from "react";
import useInput from "../../../hooks/useInput.js";

export default function Registration(){

    let nicknameInput = useInput('', {min_length: 3,max_length: 15 , empty_input: true});
    let emailInput = useInput('', {email_error: true, empty_input: true});
    let passwordInput = useInput('', {password_error: true, min_length: 8, empty_input: true});
    let [showModal, setShowModal] = useState(false);

    let [usernameError, setUsernameError] = useState(false);
    let [emailError, setEmailError] = useState(false);

    const handleRegistration = () => {
        let hasNicknameError = false;
        let hasEmailError = false;

        if (localStorage.getItem('nickname') === nicknameInput.value) {
            hasNicknameError = true;
        }

        if (localStorage.getItem('email') === emailInput.value) {
            hasEmailError = true;
        }

        if (!hasNicknameError && !hasEmailError) {
            setUsernameError(false);
            setEmailError(false);
            localStorage.setItem('nickname', nicknameInput.value);
            localStorage.setItem('email', emailInput.value);
            localStorage.setItem('password', passwordInput.value);
            console.log('регистрация успешна');
            console.log(localStorage.getItem('nickname'));
            setShowModal(false);
        } else {
            setUsernameError(hasNicknameError);
            setEmailError(hasEmailError);
        }
    }

    function handleClickEsc(e){
        if (e.key === 'Escape'){
            setShowModal(false);
        }
    }

    return(
        <div className={'or_regist'}>
            <p>Нет аккаунта?</p>
            <Button onClick={() => setShowModal(true)}>Зарегистрироваться</Button>
            <Modal open={showModal} onKeyDown={handleClickEsc}>
                <div className={'button_close'}>
                    <Button onClick={() => setShowModal(false)}>Х</Button>
                </div>
                <div className={'regist_page_main'}>
                    <form className={'regist'}>
                        <h2>Регистрация</h2>

                        <label htmlFor={'regist_nickname'}>Никнейм (псевдоним):</label>
                        <input id={'regist_nickname'} name={'nickname'} required
                               autoComplete={'name'} type={'text'} onChange={(e) => nicknameInput.onChange(e)}
                               onBlur={() => nicknameInput.onBlur()} value={nicknameInput.value}/>
                        {(nicknameInput.inputBlur && nicknameInput.emptyInput) &&
                        <p>Поле не должно быть пустым!</p>}
                        {(nicknameInput.inputBlur && nicknameInput.maxLengthError && !nicknameInput.emptyInput) &&
                        <p>Псевдоним не должен быть длиннее 12 символов!</p>}
                        {(nicknameInput.inputBlur && nicknameInput.minLengthError && !nicknameInput.emptyInput) &&
                        <p>Псевдоним должен быть длиннее 3 символов!</p>}

                        <label htmlFor={'regist_email'}>EMail:</label>
                        <input id={'regist_email'} name={'email'} required
                               autoComplete={'email'} type={'email'} onChange={(e) => emailInput.onChange(e)}
                               onBlur={() => emailInput.onBlur()} value={emailInput.value.trim()}/>
                        {(emailInput.inputBlur && emailInput.emptyInput) && <p>Поле не должно быть пустым!</p>}
                        {(emailInput.inputBlur && emailInput.emailError && !emailInput.emptyInput) &&
                        <p>Некорректная почта!</p>}

                        <label htmlFor={'regist_password'}>Пароль:</label>
                        <input id={'regist_password'} name={'password'} required autoComplete={'new-password'}
                               type={'password'} onChange={(e) => passwordInput.onChange(e)}
                               onBlur={() => passwordInput.onBlur()} value={passwordInput.value.trim()}/>
                        {(passwordInput.emptyInput && passwordInput.inputBlur) && <p>Поле не должно быть пустым!</p>}
                        <ul style={{color:'#757575'}}>Пароль должен иметь:</ul>
                        <li style={{color:'#757575'}}>Как минимум одну букву верхнего регистра;</li>
                        <li style={{color:'#757575'}}>Как минимум одну цифру;</li>
                        <li style={{color:'#757575'}}>Как минимум один специальный символ;</li>
                        <li style={{color:'#757575'}}>Общую длину 8 символов и более.</li>

                        <Button
                        disabled={nicknameInput.anyError || emailInput.anyError || passwordInput.anyError}
                        type={'submit'} onClick={handleRegistration}>Зарегистрироваться</Button>
                        {usernameError && <p className={'user_error'}>Пользователь с таким псевдонимом уже существует.</p>}
                        {emailError && <p className={'email_error'}>Эта почта уже зарегистрирована.</p>}
                    </form>
                </div>
            </Modal>
        </div>
    )
}