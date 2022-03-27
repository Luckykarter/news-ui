import axios from 'axios';

export function getArticles(keywords, from_date, to_date, ordering) {
    const articlesUrl = process.env.VUE_APP_API_GATEWAY + process.env.VUE_APP_ARTICLES;
    return axios.get(
        articlesUrl,
        {
            params: {
                search: keywords,
                from_date: from_date,
                to_date: to_date,
                ordering: ordering,
                limit: 10,
                offset: 0
            }
        }
    );
}

export function getMoreArticles(nextUrl) {
    return axios.get(nextUrl)
}


export function getDate(timestamp) {
    const d = new Date(Date.parse(timestamp));
    return d.toLocaleDateString();
}
