import { log as Logger } from './utils/logger';

import { DataSet } from './data';
import { settings } from './settings';

import { Client } from './client';

const InverterClient = new Client();

let interval = settings.interval;

InverterClient.on('data', async (dp: DataSet) => {
	console.log("DataSet", dp);
    
    //await storeDatabase(dp);

	if(!interval) {
		stop();
	}
});

InverterClient.on('error', (err) => {
	Logger.error('error', err);
    stop();
});

InverterClient.once('stop', () => {
    Logger.info('stop')
	stop();
});

if(interval && interval > 1000) {
	Logger.info('data interval ' + interval);
	setInterval(() => {
		InverterClient.fetch();
	}, interval);
	InverterClient.fetch();
} else {
	InverterClient.fetch();
	interval = undefined;
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

function stop() {
	Logger.info('main: terminating process');
	setTimeout( process.exit, 250 );
}