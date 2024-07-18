import avatar from '../../../assets/avatar.jpg'

let nickname = localStorage.getItem('nickname') || '';
let profileAvatar = avatar;

export default function ProfileButton(){
    return(
        <div className={'profile_button'}>
            <a href={'/zasoserlib/profile'}>
                <img src={profileAvatar} alt={'profile avatar'}/>
                <p>{nickname}</p>
            </a>
        </div>
    )
}