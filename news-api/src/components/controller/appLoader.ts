import Loader from './loader';

interface Environment {
    API_URL: string;
    API_KEY: string;
}

class AppLoader extends Loader {
    constructor() {
        const environment: Environment = {
            API_URL: process.env.API_URL || '',
            API_KEY: process.env.API_KEY || '',
        };
        super(environment.API_URL, {
            apiKey: environment.API_KEY,
        });
    }
}

export default AppLoader;
