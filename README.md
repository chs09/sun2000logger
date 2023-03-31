# Huawei SUN2000 Solar Inverter Data Logger
data logger for local SUN2000 PV installations

## Disclaimer
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This software is developed and tested on a SUN2000-10KTL-M1 inverter.
Information about SUN2000 ModBus registers can be found at https://photomate.zendesk.com/hc/en-gb/article_attachments/6535471431581/Solar_Inverter_Modbus_Interface_Definitions.pdf

The software uses the nodejs ModBus-Serial stack which can be found here:
  https://github.com/yaacov/node-modbus-serial#readme

## Install
First install Node and then Typescript with
```
npm install -g typescript
```

## First Run
```
npm install
tsc
npx node ./dist/index.js
```

## Settings

settings.ts
```ts
export const settings: Settings = {
    host: '192.168.178.99',
    port: 502,
    period: 60,
    debug: false,
    mysql:                   // remove for no mysql database
    {
      host: "127.0.0.1",     // ip of mysql server
      user: "USER",          // mysql server user name
      pass: "PASS",          // mysql server password
      database: "DATABASE"   // database/schema name
    }
};
```

## Files

### index.ts
main module
- general initialization
- read out inverter values
- store values in database

### client.ts
modbus connector module
- read out inverter values via modbus

### data.ts
datapoint definition

### register.ts, alarms.ts
register definitions for the SUN2000 modbus registers

## Datapoints
```json
{
  phaseAVoltage: 237.6,
  phaseBVoltage: 236,
  phaseCVoltage: 236.2,
  alarms: [ { bit: 9, name: 'Battery Abnormal', id: 2068, level: 1 } ],
  phaseACurrent: 0.595,
  phaseBCurrent: 0.594,
  phaseCCurrent: 0.624,
  powerFactor: 1,
  gridFrequency: 49.98,
  inverterTemperature: 49,
  meterPhaseAPower: -39,
  meterPhaseBPower: 145,
  meterPhaseCPower: 63,
  battery1SOC: 100,
  battery1ChargePower: 18,
  battery1Temperature: 40.9,
  activePower: 0.361,
  peakPower: 7.164,
  pv1Voltage: 415.8,
  pv1Current: 0.48,
  pv2Voltage: 450.5,
  pv2Current: 0.44
}
```

## Database
To create database use pluggit.sql

### Tables
- devices (device registry)
- state (state and alarm changes)
- pluggit (data)