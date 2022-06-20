import 'dotenv/config';
import { AppDataSource, env} from "./config";
import app from './app';

AppDataSource.initialize()
    .then(async () => {

        app.listen(env.API_PORT)
        console.log(env.API_CONSOLE);
    })
    .catch(error => console.log(error));