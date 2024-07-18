import './Button.css';

export default function Button({children, isActive, ...props}){
    return(
        <button className={isActive ? 'button active' : 'button'} {...props}>{children}</button>
    )
}