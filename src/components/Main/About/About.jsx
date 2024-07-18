import './About.css'

export default function About(){
    return(
        <div className={'about_main'}>
            <p>
                <strong>
                    Вопрос: «Зачем есть этот сайт?»
                </strong><br/>
                Ответ: «Да просто так!»
            </p>
            <br/>
            <p>
                <strong>
                    Вопрос: «Кто это создал?»
                </strong><br/>
                Ответ: «А это важно?»
            </p>
        </div>
    )
}