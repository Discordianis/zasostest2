import {Faq} from "../../../database/projectDAL.js";
import {Hist} from "../../../database/projectDAL.js";
import Button from "../../Button/Button.jsx";
import {useState} from "react";
import './StoryParts.css'

export default function StoryParts(){
    let [desc, setDesc] = useState();
    return(
        <div className={'story_parts'}>
            <div className={'story_parts_hist'}>
                <h2>Какие-то названия</h2>
                {Hist.map(hist =>
                    <p key={hist.name}>
                        {hist.rus_name}
                    </p>)}
            </div>
            <div className={'story_parts_faq'}>
                {Faq.map(faq =>
                    <Button key={faq.id} isActive={desc === faq.description}
                    onClick={() => setDesc(faq.description)}>
                        {faq.quest}
                    </Button>)}
            </div>
            <div className={'faq_desc'}>
                <p>{desc}</p>
            </div>
        </div>
    )
}