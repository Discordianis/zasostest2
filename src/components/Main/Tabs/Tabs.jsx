import './Tabs.css';
import Button from "../../Button/Button.jsx";
import {useState} from "react";

export default function Tabs({active, onChange}){
    return(
        <div className={'tabs_main'}>
            <Button isActive={active === 'main'} onClick={() => onChange('main')}>Главная</Button>
            <Button isActive={active === 'about'} onClick={() => onChange('about')}>О сайте</Button>
            <Button isActive={active === 'support'} onClick={() => onChange('support')}>Помощь</Button>
            <Button isActive={active === 'clicker'} onClick={() => onChange('clicker')}>Кликер</Button>
        </div>
    )
}