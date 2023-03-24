import {Buffer} from 'node:buffer';
import * as Alarms from './alarms';

export interface Register<T> {
    name: string;
    address: number;
    length: number;
    unit?: string;
    read(buf: Buffer): T;
}

function I16(buf: Buffer, gain=1) {
    return buf.readInt16BE() / gain;
}

function U16(buf: Buffer, gain=1) {
    return buf.readUInt16BE() / gain;
}

function I32(buf: Buffer, gain=1) {
    return buf.readInt32BE() / gain;
}

export const PV1Voltage: Register<number> = { name: "PV1 Voltage", address: 32016, length: 1, read: (buf) => I16(buf, 10), unit: 'V' };
export const PV1Current: Register<number> = { name: "PV1 Current", address: 32017, length: 1, read: (buf) => I16(buf, 100), unit: 'A' };

export const PV2Voltage: Register<number> = { name: "PV2 Voltage", address: 32018, length: 1, read: (buf) => I16(buf, 10), unit: 'V' };
export const PV2Current: Register<number> = { name: "PV2 Current", address: 32019, length: 1, read: (buf) => I16(buf, 100), unit: 'A' };

export const InputPower: Register<number> = { name: "Input Power", address: 32064, length: 2, read: (buf) => I32(buf, 1), unit: 'W' };

export const PhaseAVoltage: Register<number> = { name: "Phase A Voltage", address: 32069, length: 1, read: (buf) => U16(buf, 10), unit: 'V' };
export const PhaseBVoltage: Register<number> = { name: "Phase B Voltage", address: 32070, length: 1, read: (buf) => U16(buf, 10), unit: 'V' };
export const PhaseCVoltage: Register<number> = { name: "Phase C Voltage", address: 32071, length: 1, read: (buf) => U16(buf, 10), unit: 'V' };

export const PhaseACurrent: Register<number> = { name: "Phase A Current", address: 32072, length: 2, read: (buf) => I32(buf, 1000), unit: 'A' };
export const PhaseBCurrent: Register<number> = { name: "Phase B Current", address: 32074, length: 2, read: (buf) => I32(buf, 1000), unit: 'A' };
export const PhaseCCurrent: Register<number> = { name: "Phase C Current", address: 32076, length: 2, read: (buf) => I32(buf, 1000), unit: 'A' };

export const PeakPower: Register<number> = { name: "Peak Active Power of Current Day", address: 32078, length: 2, read: (buf) => I32(buf, 1000), unit: 'kW' };
export const ActivePower: Register<number> = { name: "Active Power", address: 32080, length: 2, read: (buf) => I32(buf, 1000), unit: 'kW' };

export const Alarm1: Register<Alarms.Alarm[]> = { name: "Alarm Register 1", address: 32008, length: 1, read: (buf) => Alarms.check(U16(buf), Alarms.Alarms1)};
export const Alarm2: Register<Alarms.Alarm[]> = { name: "Alarm Register 2", address: 32009, length: 1, read: (buf) => Alarms.check(U16(buf), Alarms.Alarms2)};
export const Alarm3: Register<Alarms.Alarm[]> = { name: "Alarm Register 3", address: 32010, length: 1, read: (buf) => Alarms.check(U16(buf), Alarms.Alarms3)};

export const PowerFactor: Register<number> = { name: "Power Factor", address: 32084, length: 1, read: (buf) => I16(buf, 1000) };
export const GridFrequency: Register<number> = { name: "Grid Frequency", address: 32085, length: 1, read: (buf) => U16(buf, 100), unit: 'Hz' };
export const InternalTemperature: Register<number> = { name: "Inverter Temperature", address: 32087, length: 1, read: (buf) => I16(buf, 10), unit: '°C' };

export const MeterPhaseAPower: Register<number> = { name: "Phase A Power", address: 37132, length: 2, read: (buf) => I32(buf, 1), unit: 'W' };
export const MeterPhaseBPower: Register<number> = { name: "Phase B Power", address: 37134, length: 2, read: (buf) => I32(buf, 1), unit: 'W' };
export const MeterPhaseCPower: Register<number> = { name: "Phase C Power", address: 37136, length: 2, read: (buf) => I32(buf, 1), unit: 'W' };

export const Battery1SOC: Register<number> = { name: "Battery SOC", address: 37004, length: 1, read: (buf) => U16(buf, 10), unit: '%' };
export const Battery1ChargePower: Register<number> = { name: "Battery Power", address: 37001, length: 2, read: (buf) => I32(buf, 1), unit: 'W' };
export const Battery1Temperature: Register<number> = { name: "Battery Temperature", address: 37022, length: 1, read: (buf) => I16(buf, 10), unit: '°C' };