import './Support.css';
import Button from "../../Button/Button.jsx";
import useInput from "../../../hooks/useInput.js";

export default function Support(){
    let email = useInput();
    let reason = useInput();
    return(
        <div className={'support_page_main'}>
            <h2>Обращение в тех.поддержку</h2>
            <form className={'support_form'}>
                <label htmlFor={'support_lb'}>Ваш EMail:</label>
                <input id={'support_lb'} autoComplete={'email'} {...email}/>
                <label htmlFor={'reason_sup'}>Выберите причину обращения:</label>
                <select id={'reason_sup'} {...reason}>
                    <option value={''} defaultValue hidden>Выберите причину...</option>
                    <option value={'issue'}>Сайт не работает / что-то работает некорректно</option>
                    <option value={'payment'}>Не проходит оплата</option>
                    <option value={'idea'}>У меня есть идея для этого сайта</option>
                </select>
                <pre>email: {email.value}</pre>
                <pre>reason: {reason.value}</pre>
                <Button>Отправить</Button>
            </form>
        </div>
    )
}