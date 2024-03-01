import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import FilterNews from '../filter/filter';
import { ResponseData } from '../controller/loader';

interface AppInterface {
    controller: AppController;
    view: AppView;

    start(): void;
}

class App implements AppInterface {
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement: HTMLElement | null = document.querySelector('.sources') as HTMLElement;
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: ResponseData) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data: ResponseData) => this.view.drawSources(data));
        FilterNews.init();
    }
}

export default App;
