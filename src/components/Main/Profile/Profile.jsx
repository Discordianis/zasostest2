import Button from "../../Button/Button.jsx";
import './Profile.css'
import Error from "../../Error/Error.jsx";

export default function Profile(){

    const isLogged = localStorage.getItem('logged');
    const logout = () => {
        localStorage.setItem('logged', '');
        window.location.href = '/zasoserlib';
    }
    return(
        <>
            {
            isLogged ?
                <div className={'profile_main_page'}>
                    <h2>Тут пока ничего нет, зато есть кнопка выхода!</h2>
                    <div className={'button_logout'}>
                        <Button onClick={logout}>Выйти из аккаунта</Button>
                    </div>
                </div>
            : <Error />
            }
        </>
    )
}