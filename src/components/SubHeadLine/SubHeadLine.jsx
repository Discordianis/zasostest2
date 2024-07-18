import './SubHeadLine.css';

export default function SubHeadLine({children}, ...props){
    return(
        <div className={'subheadline'} {...props}>{children}</div>
    )
}