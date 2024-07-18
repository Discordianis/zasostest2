import './Clicker.css';
import {useEffect, useState} from "react";
import Button from "../Button/Button.jsx";

export default function Clicker(){
    let initCount = localStorage.getItem('countGold') ? parseInt(localStorage.getItem('countGold')) : 0;
    let initLvl = localStorage.getItem('lvl') ? parseInt(localStorage.getItem('lvl')) : 1;
    let [countGold, setCountGold] = useState(initCount);
    let [lvl, setLvl] = useState(initLvl);
    useEffect(() => {
        localStorage.setItem('countGold', countGold);
        localStorage.setItem('lvl', lvl);
    }, [countGold, lvl]);
    
    function xCount(){
        if (lvl === 1){
            setCountGold(gold => gold + 1);
        }
        else if (lvl === 2){
            setCountGold(gold => gold + 2)
        }
        else if (lvl === 3){
            setCountGold(gold => gold + 3)
        }
    }
    return(
        <>
        <div className={'clicker_main'}>
            <div className={'clicker_clicked'}>
                <Button onClick={(xCount)}>Тыкни на меня!</Button>
                <p><strong>Монеты: {countGold}</strong></p>
            </div>
            <div className={'clicker_store'}>
                <h3>Магазин</h3>
                <div>
                    {lvl < 3 &&
                        <>
                            <div className={'clicker_clicks'}>
                                <Button disabled={(countGold < 10 && lvl === 1) || (countGold < 100 && lvl === 2)} onClick={() => { setLvl(level => level + 1); setCountGold(gold => gold - `${(lvl === 1 && 10) || (lvl === 2 && 100)}`)}}>
                                    Дополнительные клики
                                </Button>
                                <p>Цена - {lvl === 1 && 10}{lvl === 2 && 100} монет</p>
                            </div>
                        </>
                    }

                </div>
                <div>
                    <Button onClick={() => {setLvl(1); setCountGold(0)}}>Сбросить уровень</Button>
                </div>
            </div>
        </div>
        </>
    )
}