import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import void_star from '../../../assets/star_void.png';
import full_star from '../../../assets/star_full.png';
import './RanobePage.css'
import SubHeadLine from "../../SubHeadLine/SubHeadLine.jsx";
import HrefTab from "../../HrefTab/HrefTab.jsx";

export default function RanobePage() {
    const { slug_url } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState([]);

    const [bookNothing, setBookNothing] = useState(() => localStorage.getItem('bookNothing') === 'true');
    const [watched, setWatched] = useState(() => localStorage.getItem('watched') === 'true');
    const [watching, setWatching] = useState(() => localStorage.getItem('watching') === 'true');
    const [planned, setPlanned] = useState(() => localStorage.getItem('planned') === 'true');
    const [dropped, setDropped] = useState(() => localStorage.getItem('dropped') === 'true');
    const [expand, setExpand] = useState(false);

        const watchedF = () => {
            if (logged){
                setWatched(true);
                setBookNothing(false);
                setWatching(false);
                setPlanned(false);
                setDropped(false);
                setExpand(false);
            }
            else {
                navigate('/zasoserlib/login')
            }
        }

        const watchingF = () => {
            if (logged) {
                setWatching(true);
                setBookNothing(false);
                setWatched(false);
                setPlanned(false);
                setDropped(false);
                setExpand(false);
            }
            else {
                navigate('/zasoserlib/login')
            }
        }

        const plannedF = () => {
            if (logged) {
                setPlanned(true);
                setBookNothing(false);
                setWatching(false);
                setWatched(false);
                setDropped(false);
                setExpand(false);
            }
            else {
                navigate('/zasoserlib/login')
            }
        }

        const droppedF = () => {
            if (logged){
                setDropped(true);
                setBookNothing(false);
                setWatching(false);
                setWatched(false);
                setPlanned(false);
                setExpand(false);
            }
            else {
                navigate('/zasoserlib/login')
            }
        }

        const deleteListF = () => {
            if (logged) {
                setBookNothing(true);
                setWatching(false);
                setWatched(false);
                setPlanned(false);
                setDropped(false);
                setExpand(false);
            }
            else {
                navigate('/zasoserlib/login')
            }
        }

    useEffect(() => {
        localStorage.setItem('watched', watched);
        localStorage.setItem('watching', watching);
        localStorage.setItem('planned', planned);
        localStorage.setItem('dropped', dropped);
        localStorage.setItem('bookNothing', bookNothing);
    }, [watched, watching, planned, dropped, bookNothing]);

    const logged = localStorage.getItem('logged');

    const expandOptions = () => {
        !expand ?
            setExpand(true)
            :
            setExpand(false)
    }

    useEffect(() => {
        async function fetchBookData() {
            const response = await fetch(`https://api.lib.social/api/manga/${slug_url}?fields[]=background&fields[]=eng_name&fields[]=otherNames&fields[]=summary&fields[]=releaseDate&fields[]=type_id&fields[]=caution&fields[]=views&fields[]=close_view&fields[]=rate_avg&fields[]=rate&fields[]=genres&fields[]=tags&fields[]=teams&fields[]=franchise&fields[]=authors&fields[]=publisher&fields[]=userRating&fields[]=moderated&fields[]=metadata&fields[]=metadata.count&fields[]=metadata.close_comments&fields[]=manga_status_id&fields[]=chap_count&fields[]=status_id&fields[]=artists&fields[]=format`, {
                headers: {
                    "accept": "*/*",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Opera GX\";v=\"109\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
                    "sec-ch-ua-mobile": "?1",
                    "sec-ch-ua-platform": "\"Android\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "site-id": "3"
                },
                referrer: "https://ranobelib.me/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
                mode: "cors",
                credentials: "omit"
            });
            const jsonData = await response.json();
            const booksDataJson = jsonData.data;
            setBookData(booksDataJson)
            console.log(jsonData.data)
        }
        fetchBookData()
    }, [slug_url]);

    return (
        <div className="book_page_main">
            {bookData &&
                <>
                    <h2>{bookData.rus_name} / {bookData.name}</h2>
                    <div className={'book_info'}>
                        <div className={'left_info'}>
                            <img src={bookData.cover && bookData.cover.thumbnail}
                                 alt={bookData.cover && bookData.cover.filename}/>
                            <div className={'trigger'} style={{background: watched ?
                                    '#0c870c' : watching ? '#924f9d' : planned ? '#446cac' :
                                    dropped ? '#b72222' : ''}}>
                                <div className={'trigger_text'}>
                                    {(bookNothing || !logged) && <p onClick={plannedF}>Добавить в список</p>}
                                    {(watched && logged) && <p>Прочитано</p>}
                                    {(watching && logged) && <p>Читаю</p>}
                                    {(planned && logged) && <p>Запланировано</p>}
                                    {(dropped && logged) && <p>Брошено</p>}
                                </div>
                                <div className={'trigger_arrow'} onClick={expandOptions}>
                                    <span>▼</span>
                                </div>
                            </div>
                            {(expand) &&
                            <div className={'expanded_options'}>
                                    <p className={'trigger_standart'} onClick={watchedF}>Прочитано</p>
                                    <p className={'trigger_standart'} onClick={watchingF}>Читаю</p>
                                    <p className={'trigger_standart'} onClick={plannedF}>Запланировано</p>
                                    <p className={'trigger_standart'} onClick={droppedF}>Брошено</p>
                                    {!bookNothing && <p className={'trigger_delete'} onClick={deleteListF}>Удалить из списка</p>}
                            </div>
                            }
                        </div>
                        <div className={'right_info'}>
                            <div className={'short_info'}>
                                <div className={'status_info'}>
                                    <SubHeadLine>Информация</SubHeadLine>
                                    <div>
                                        <p>Тип: Новелла</p>
                                        <p>Количество глав: {bookData.items_count && bookData.items_count.uploaded}</p>
                                        <p>Статус: {bookData.status && bookData.status.label}</p>
                                        <div className={'book_genres'}>
                                            <div className={'key_genre'}>
                                                <p>Жанры:</p>
                                            </div>
                                            <div className={'genre_value'}>
                                                {bookData.genres && bookData.genres.map(item => <HrefTab key={item.id}>{item.name}</HrefTab>)}
                                            </div>
                                        </div>
                                        <p>Рейтинг: {bookData.ageRestriction && bookData.ageRestriction.label}</p>
                                    </div>
                                </div>
                                <div className={'rate_book'}>
                                    <SubHeadLine>Рейтинг</SubHeadLine>
                                    <div className={'book_stars'}>
                                        <div>
                                            <div className={'rate_void'}>
                                                <img src={void_star} alt={'rating void'}/>
                                            </div>
                                            <div className={'rate_full'} style=
                                                {{width: `${bookData.rating && bookData.rating.average * 10}%`}}>
                                                <img src={full_star} alt={'rating'}/>
                                            </div>
                                        </div>
                                        <p>{bookData.rating && bookData.rating.average}</p>
                                    </div>
                            </div>
                            </div>
                            <div className={'description_book'}>
                                <SubHeadLine>Описание</SubHeadLine>
                                <p>{bookData.summary}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
