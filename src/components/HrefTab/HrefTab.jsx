import './HrefTab.css';

export default function HrefTab({children, ...props}){
    return(
        <a className={'hreftab'} {...props}>{children}</a>
    )
}