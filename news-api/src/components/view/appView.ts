import News, { ArticlesArray } from './news/news';
import Sources, { SourcesArray } from './sources/sources';
import { ResponseData } from '../controller/loader';

interface AppViewInterface {
    drawNews(data: ResponseData): void;

    drawSources(data: ResponseData): void;
}

export class AppView implements AppViewInterface {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: { articles?: ArticlesArray }): void {
        const values: ArticlesArray = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: { sources?: SourcesArray }): void {
        const values: SourcesArray = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
