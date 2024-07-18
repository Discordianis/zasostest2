import { useEffect, useState } from "react";
import useInput from "../../../hooks/useInput.js";

export default function Search() {
    let inputText = useInput('');
    let [searchText, setSearchText] = useState('');
    let [resultCount, setResultCount] = useState('');
    let [searchList, setSearchList] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const setTimer = setTimeout(() => { setSearchText(inputText.value) }, 1000);
        return () => clearTimeout(setTimer);
    }, [inputText.value]);

    useEffect(() => {
        async function fetchFunc() {
            let fetchJson = await fetch(`https://api.lib.social/api/manga?fields[]=rate_avg&fields[]=rate&fields[]=releaseDate&q=${searchText}`, {
                "headers": {
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
                "referrer": "https://ranobelib.me/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "omit"
            });
            let jsonData = await fetchJson.json();
            let searchData = jsonData.data;
            setResultCount(searchData.length);
            setSearchList(searchData);
            console.log(searchText.length);
            jsonData.ok ? setLoading(true) : setLoading(false);
        }
        if (inputText.value.trim().length > 2) {
            fetchFunc();
        }
    }, [searchText]);

    useEffect(() => {
        inputText.value.trim().length < 2 && setSearchList([])
        setLoading(true)
    }, [inputText.value]);

    return (
        <div className={'search_main'}>
            <div className={'search_div'}>
                <input placeholder={'Поиск...'} {...inputText} />
            </div>
            {(resultCount > 0 && inputText.value.length > 2) &&
                <div className={'search_result'}>
                    {searchList.map((listSearch, index) => index < 10 &&
                        <a href={`/zasoserlib/books/${listSearch.slug_url}`}
                            key={listSearch.id}>{listSearch.rus_name}</a>
                    )}
                </div>
            }
            {(inputText.value.length > 2 && loading) &&
                <div className={'search_result'}>
                    <p>Загрузка...</p>
                </div>
            }
            {(resultCount <= 0 && inputText.value.length > 2 && !loading) &&
            <div className={'search_result'}>
                <p>Нет результатов.</p>
            </div>
            }
        </div>
    )
}
