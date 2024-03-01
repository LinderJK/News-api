import { ArticlesArray } from '../view/news/news';
import { SourcesArray } from '../view/sources/sources';
import FilterNews from '../filter/filter';

interface Options {
    [key: string]: string;
}

interface ResponseData {
    articles?: ArticlesArray;
    sources?: SourcesArray;
    status?: RequestStatus;
    totalResults?: number;
}

enum RequestStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading',
}

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface GetResponse {
    endpoint: string;
    options?: Options;
}

export type CallbackFunction = (data: ResponseData) => void;

class Loader {
    private baseLink: string;
    private options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: GetResponse,
        callback: CallbackFunction = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: HttpMethod, endpoint: string, callback: CallbackFunction, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                callback(data);
                FilterNews.setSources(data.sources);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
