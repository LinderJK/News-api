import { ArticlesArray } from '../view/news/news';
import { SourcesArray } from '../view/sources/sources';
import FilterNews from '../filter/filter';

interface OptionsObj {
    [key: string]: string;
}

export interface ResponseData {
    articles?: ArticlesArray;
    sources?: SourcesArray;
    status: RequestStatus;
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

interface Request {
    endpoint: string;
    options?: OptionsObj;
}

interface LoaderInterface {
    getResp(request: Request, callback?: CallbackFunction): void;

    errorHandler(res: Response): Response;

    makeUrl(options: OptionsObj, endpoint: string): string;

    load(method: HttpMethod, endpoint: string, callback: CallbackFunction, options: OptionsObj): void;

    getSources?(callback: CallbackFunction): void;

    getNews?(e: Event, callback: CallbackFunction): void;
}

export type CallbackFunction = (data: ResponseData) => void;

class Loader implements LoaderInterface {
    private baseLink: string;
    private options: OptionsObj;

    constructor(baseLink: string, options: OptionsObj) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Request,
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

    makeUrl(options: OptionsObj, endpoint: string): string {
        const urlOptions: OptionsObj = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: HttpMethod, endpoint: string, callback: CallbackFunction, options: OptionsObj = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: ResponseData) => {
                callback(data);
                FilterNews.setSources(data);
            })
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
