import { app } from '../../index';
import { SourcesArray } from '../view/sources/sources';
import '../filter/filter.css';

class FilterNews {
    private static originalSources: SourcesArray = [];

    public static setSources(sources: SourcesArray) {
        this.originalSources = sources;
    }

    public static init() {
        this.inputHandler();
    }

    private static inputHandler() {
        const filterInput = document.getElementById('filterInput') as HTMLInputElement;
        filterInput.addEventListener('input', () => {
            this.filterNews(filterInput.value);
        });
    }

    private static filterNews(resource: string) {
        let filteredSources = this.originalSources;
        filteredSources = this.originalSources.slice().filter((item) => item.id.includes(resource));
        const filteredData = { sources: filteredSources };
        app.view.drawSources(filteredData);
    }
}

export default FilterNews;
