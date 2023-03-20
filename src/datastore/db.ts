import * as mysql from 'mysql2';
import { DataSet } from '../data';
import { Settings } from '../settings';
import { log as Logger } from '../utils/logger';
import { Store } from './store';

class DBStore implements Store {
    private settings: mysql.ConnectionOptions;

    constructor(settings: Settings) {
        this.settings = {};
        Object.assign(this.settings, settings.mysql);
    }

    store(dp: DataSet): Promise<void> {
        /* is mysql adapter defined? */
        if (this.settings?.host === undefined) {
            return Promise.reject('No db connection configured.');
        }

    //     /* connect to mysql database */
    //     let connection = mysql.createConnection(this.settings);

    //     connection.connect((err) => {
    //         if (err) {
    //             Logger.error('adapter pluggit can\'t connect to mysql-server ' + err);
    //             return stop();
    //         }
    //         Logger.info('adapter pluggit connected to mysql-server on ' + this.settings.host);
    //     });

    //     /* select database and insert data */
    //     connection.query('USE ' + this.settings.database);

    //     function findDeviceId() {
    //         return new Promise(function (resolve, reject) {
    //             let sqlSelectDevice = connection.format('SELECT id FROM devices WHERE serial = ?', [dp['serial']]);
    //             Logger.debug(sqlSelectDevice);
    //             connection.query(sqlSelectDevice, (err, results) => {
    //                 if (err) {
    //                     reject(sqlSelectDevice + err);
    //                     return;
    //                 }
    //                 if (results.length > 0) {
    //                     resolve(results[0].id);
    //                 } else {
    //                     let sqlInsertDevice = connection.format('INSERT INTO devices(serial, name) VALUES ( ?, ? )', [dp['serial'], dp['name']]);
    //                     Logger.debug(sqlInsertDevice);
    //                     connection.query(sqlInsertDevice, function (err, results) {
    //                         if (err) {
    //                             reject(sqlInsertDevice + err);
    //                         } else {
    //                             // https://github.com/mysqljs/mysql#getting-the-id-of-an-inserted-row
    //                             resolve(results.insertId);
    //                         }
    //                     });
    //                 }
    //             });
    //         });
    //     }

    //     function updateDeviceStats(deviceId) {
    //         let values = [dp['name'], dp['filterReset'], dp['workTime'], dp['version'], deviceId];
    //         let sqlUpdateDevice = connection.format('UPDATE devices SET name = ?, filter_reset = ?, work_time = ?, version = ? WHERE id = ?', values);
    //         Logger.debug(sqlUpdateDevice);
    //         connection.query(sqlUpdateDevice);
    //     }

    //     function insertDataRow(deviceId) {
    //         let values = [deviceId, dp['timestamp'], dp['t1'], dp['t2'], dp['t3'], dp['t4'], dp['t5'], dp['fan1'], dp['fan2'], dp['humidity'], dp['bypassState'], dp['speed']];
    //         var sqlInsertValues = connection.format('INSERT INTO datapoints VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', values);
    //         Logger.debug(sqlInsertValues);
    //         connection.query(sqlInsertValues);
    //     }

    //     function updateState(deviceId) {
    //         let sqlInsertAlarm = 'INSERT INTO states (device, timestamp, state, alarm) '
    //             + ` SELECT ${deviceId}, ${dp['timestamp']}, ${connection.escape(dp['stateText'])}, ${connection.escape(dp['alarmState'])}`
    //             + ' WHERE NOT EXISTS(' // insert alarm if state changed since last time
    //             + '   SELECT 1 FROM states '
    //             + `   WHERE device = ${deviceId} `
    //             + `   AND timestamp = (SELECT timestamp FROM states WHERE device = ${deviceId} ORDER BY timestamp DESC LIMIT 1)`
    //             + `   AND alarm = ${connection.escape(dp['alarmState'])}`
    //             + `   AND state = ${connection.escape(dp['stateText'])}`
    //             + ');'; // end of WHERE NOT EXISTS

    //         Logger.debug(sqlInsertAlarm);
    //         connection.query(sqlInsertAlarm);
    //     }

    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let deviceId = await findDeviceId();

    //             updateDeviceStats(deviceId);
    //             insertDataRow(deviceId);
    //             updateState(deviceId);
    //             resolve(deviceId);
    //         } catch (err) {
    //             Logger.error('unable to update database ', err);
    //             reject(err);
    //         } finally {
    //             /* close database */
    //             connection.end();
    //         }
    //     });
        return Promise.resolve();
    }
}