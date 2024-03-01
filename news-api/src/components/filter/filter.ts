import { app } from '../../index';
import { SourcesArray } from '../view/sources/sources';
import '../filter/filter.css';
import { ResponseData } from '../controller/loader';

class FilterNews {
    // private static sources: SourcesArray = [];
    private static originalSources: SourcesArray;

    public static setSources(data: ResponseData): void {
        if (data.sources !== undefined) {
            this.originalSources = data.sources;
        }
    }

    public static init(): void {
        this.inputHandler();
    }

    private static inputHandler(): void {
        const filterInput = document.getElementById('filterInput') as HTMLInputElement;
        filterInput.addEventListener('input', () => {
            this.filterNews(filterInput.value);
        });
    }

    private static filterNews(resource: string): void {
        const filteredSources = this.originalSources.slice().filter((item) => item.id.includes(resource));
        const filteredData = { sources: filteredSources };
        app.view.drawSources(filteredData);
    }
}

export default FilterNews;
