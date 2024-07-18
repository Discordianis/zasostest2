import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";
import './Modal.css'

export default function Modal({children, open, ...props}){
    let openedModal = useRef();
    useEffect(() => {
        if (open){
            openedModal.current.showModal();
        }
        else {
            openedModal.current.close();
        }
    }, [open]);
    return createPortal(
        <dialog className={'modal_main'} ref={openedModal} {...props}>{children}</dialog>,
        document.getElementById('modal')
    )
}