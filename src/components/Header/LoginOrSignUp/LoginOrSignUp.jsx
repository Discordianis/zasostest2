import Button from "../../Button/Button.jsx";
import ProfileButton from "../ProfileButton/ProfileButton.jsx";

export default function LoginOrSignUp(){
    const logged = localStorage.getItem('logged') || '';

    return(
        <>
            {logged ?
                <>
                    <ProfileButton/>
                </>
                 :
                <div className={'login_button'}>
                    <a href={'/zasoserlib/login'}>
                        <Button>Войти</Button>
                    </a>
                </div>
            }
        </>

    )
}