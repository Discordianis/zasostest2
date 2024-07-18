import '/src/components/Header/Header.css'
import Logo from "./Logo/Logo.jsx";
import Search from "./Search/Search.jsx";
import LoginOrSignUp from "./LoginOrSignUp/LoginOrSignUp.jsx";
import ProfileButton from "./ProfileButton/ProfileButton.jsx";

export default function Header(){
    const logged = false;
    return(
        <div className={'header'}>
            <Logo />
            <Search />
            {logged ? <ProfileButton /> : <LoginOrSignUp />}
        </div>
    )
}