import './Login.css';
import Button from "../../Button/Button.jsx";
import Registration from "../Registration/Registration.jsx";
import useInput from "../../../hooks/useInput.js";
import {useState} from "react";

export default function Login(){

    let nicknameOrEmailInput = useInput();
    let passwordInput = useInput();

    const [showError, setShowError] = useState(false);
    const [logged, setLogged] = useState('');
    localStorage.setItem('logged', logged)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin = () => {
        const nickname = localStorage.getItem('nickname') || '';
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';
        if ((nicknameOrEmailInput.value === nickname || nicknameOrEmailInput.value === email) && passwordInput.value === password) {
            setLogged('logged');
            setShowError(false);
            window.location.href = '/zasoserlib';
        } else {
            setLogged('');
            setShowError(true);
        }
    }

    return(
        <div className={'login_page_main'}>
            <form onSubmit={handleSubmit} className={'login'}>
                <h2>Вход в аккаунт</h2>
                <label htmlFor={'login_nickname'}>Никнейм (псевдоним) или EMail:</label>
                <input id={'login_nickname'} autoComplete={'name'} name={'nickname'} type={'text'}
                       value={nicknameOrEmailInput.value} onChange={(e) => nicknameOrEmailInput.onChange(e)}
                       onBlur={() => nicknameOrEmailInput.onBlur} required/>
                {(nicknameOrEmailInput.inputblur && nicknameOrEmailInput.emptyInput) &&
                    <p>Поле не должно быть пустым!</p>}
                <label htmlFor={'login_password'}>Пароль:</label>
                <input id={'login_password'} autoComplete={'current-password'} name={'password'}
                       value={passwordInput.value} onChange={(e) => passwordInput.onChange(e)}
                       onBlur={() => passwordInput.onBlur} type={'password'} required/>
                {(passwordInput.inputblur && passwordInput.emptyInput) &&
                    <p>Поле не должно быть пустым!</p>}
                <Button onClick={handleLogin}>Войти</Button>
                {showError && <p className={'login_error'}>Такого пользователя не существует или введены неверные данные.</p>}
                <Registration />
            </form>
        </div>
    )
}