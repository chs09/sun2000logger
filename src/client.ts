const ModbusClient = require('modbus-serial');

import type {ModbusRTU, ReadRegisterResult} from 'modbus-serial/ModbusRTU';

import { EventEmitter } from 'events';

import { log as Logger } from './utils/logger';
import { settings } from './settings';
import { DataSet } from './data';

import { Register, PhaseAVoltage, PhaseBVoltage, PhaseCVoltage, Alarm1, Alarm2, Alarm3, PhaseACurrent, PhaseBCurrent, PhaseCCurrent, PowerFactor, GridFrequency, InternalTemperature, MeterPhaseAPower, MeterPhaseBPower, MeterPhaseCPower, Battery1SOC, Battery1ChargePower, Battery1Temperature, PeakPower, ActivePower } from './register';

interface ClientEvents {
    on(event: 'error', listener: (...args: any[]) => void): this;
    on(event: 'stop', listener: (...args: any[]) => void): this;
    on(event: 'data', listener: (dp: DataSet) => void): this;
}

/* set true for more debugging info */
if(settings.debug) {
	Logger.setLevel('debug');
}

function read<T>(client: ModbusRTU, reg: Register<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        Logger.info(`reading ${reg.name}`);
        client.readHoldingRegisters(reg.address, reg.length)
            .then((data) => {
                const value = reg.read(data.buffer);
				resolve(value);
				
				const unit = reg.unit ? reg.unit : '';
				Logger.info( `${reg.name}: ${value} ${unit}` );
            })
            .catch(reject);
    });
}

async function requestBlock(client: ModbusRTU, dp: DataSet)
{
	dp.phaseAVoltage = await read(client, PhaseAVoltage);
    dp.phaseBVoltage = await read(client, PhaseBVoltage);
    dp.phaseCVoltage = await read(client, PhaseCVoltage);

    dp.alarms = [];
    dp.alarms.push(...await read(client, Alarm1));
    dp.alarms.push(...await read(client, Alarm2));
    dp.alarms.push(...await read(client, Alarm3));

    dp.phaseACurrent = await read(client, PhaseACurrent);
    dp.phaseBCurrent = await read(client, PhaseBCurrent);
    dp.phaseCCurrent = await read(client, PhaseCCurrent);

    dp.powerFactor = await read(client, PowerFactor);
    dp.gridFrequency = await read(client, GridFrequency);
    dp.inverterTemperature = await read(client, InternalTemperature);

    dp.meterPhaseAPower = await read(client, MeterPhaseAPower);
    dp.meterPhaseBPower = await read(client, MeterPhaseBPower);
    dp.meterPhaseCPower = await read(client, MeterPhaseCPower);

    dp.battery1SOC = await read(client, Battery1SOC);
    dp.battery1ChargePower = await read(client, Battery1ChargePower);
    dp.battery1Temperature = await read(client, Battery1Temperature);

    dp.activePower = await read(client, ActivePower);
    dp.peakPower = await read(client, PeakPower);
}

export class Client extends EventEmitter implements ClientEvents {
	fetch() {
		try {
			this.start();
		} catch (err)  {
			this.emit('error', err);
		}
	}

    stop() {
        Logger.debug('pluggit adapter: terminating');
        this.emit('stop');
    }

    private async start() {
        this.emit('start');
    
        // create an empty modbus client
        //const ModbusRTU = require("modbus-serial");
        const client: ModbusRTU = new ModbusClient();
    
        // IP and port of the MODBUS slave, default port is 502
        // open connection to a tcp line
        Logger.info(`Connecting to ${settings.host}:${settings.port}`);

        client.setID(1);
        client.setTimeout(10000);
        client.connectTCP(settings.host, { port: settings.port }, (err?:Error) => {
            if(err !== undefined) {
                Logger.error(`Connection to ${settings.host}:${settings.port} failed!`, err);
                this.emit('error', err);
                return;
            }
            Logger.debug(`Connection to ${settings.host}:${settings.port} sucessful´.`);
            
            setTimeout(async () => {
                /* modbus data is stored here */
                let dp = {} as DataSet;
                try {
                    Logger.info("reading data");
                    await requestBlock(client, dp);
                    this.emit('data', dp);
                } catch (err) {
                    Logger.error(err);
                    this.emit('error', err);
                    return this.stop();
                } finally {
                    client.close(() => {
                        Logger.debug("Client closed");
                    });
                }
            }, 1000);
        });
    }
}
