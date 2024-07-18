import Logotype from '../../../assets/logo.png'

export default function Logo(){
    return(
        <div className={'logo'}>
            <a href={'/zasoserlib'}>
                <img src={Logotype}/>
            </a>
        </div>
    )
}