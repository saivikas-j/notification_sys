import App from "./App";
import * as cron from 'node-cron';

const start =async () => {
    console.log(`Running the job at ${new Date()}`);
    App();
}

cron.schedule('0 12 * * *', start);