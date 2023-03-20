export enum Level {
    Warning, Minor, Major
}

export interface Alarm {
    bit: number;
    name: string;
    id: number;
    level: Level;
}

export const Alarms1: Alarm[] = [
    {bit: 0, name: "High String Input Voltage", id: 2001, level: Level.Major},
    {bit: 1, name: "DC Arc Fault", id: 2002, level: Level.Major},
    {bit: 2, name: "String Reverse Connection", id: 2011, level: Level.Major},
    {bit: 3, name: "String Current Backfeed", id: 2012, level: Level.Warning},
    {bit: 4, name: "Abnormal String Power", id: 2013, level: Level.Warning},
    {bit: 5, name: "AFCI Self-Check Fail", id: 2021, level: Level.Major},
    {bit: 6, name: "Phase Wire Short-Circuited to PE", id: 2031, level: Level.Major},
    {bit: 7, name: "Grid Loss", id: 2032, level: Level.Major},
    {bit: 8, name: "Grid Undervoltage", id: 2033, level: Level.Major},
    {bit: 9, name: "Grid Overvoltage", id: 2034, level: Level.Major},
    {bit: 10, name: "Grid Voltage Imbalance", id: 2035, level: Level.Major},
    {bit: 11, name: "Grid Overfrequency", id: 2036, level: Level.Major},
    {bit: 12, name: "Grid Underfrequency", id: 2037, level: Level.Major},
    {bit: 13, name: "Unstable Grid Frequency", id: 2038, level: Level.Major},
    {bit: 14, name: "Output Overcurrent", id: 2039, level: Level.Major},
    {bit: 15, name: "Output DC Component Overhigh", id: 2040, level: Level.Major},
];

export const Alarms2: Alarm[] = [
    {bit: 0, name: "Abnormal Residual Current", id: 2051, level: Level.Major},
    {bit: 1, name: "Abnormal Grounding", id: 2061, level: Level.Major},
    {bit: 2, name: "Low Insulation Resistance", id: 2062, level: Level.Major},
    {bit: 3, name: "Overtemperature", id: 2063, level: Level.Minor},
    {bit: 4, name: "Device Fault", id: 2064, level: Level.Major},
    {bit: 5, name: "Upgrade Failed or Version Mismatch", id: 2065, level: Level.Minor},
    {bit: 6, name: "License Expired", id: 2066, level: Level.Warning},
    {bit: 7, name: "Faulty Monitoring Unit", id: 61440, level: Level.Minor},
    {bit: 8, name: "Faulty Power Collector", id: 2067, level: Level.Major},
    {bit: 9, name: "Battery Abnormal", id: 2068, level: Level.Minor},
    {bit: 10, name: "Active Islanding", id: 2070, level: Level.Major},
    {bit: 11, name: "Passive Islanding", id: 2071, level: Level.Major},
    {bit: 12, name: "Transient AC Overvoltage", id: 2072, level: Level.Major},
    {bit: 13, name: "Peripheral Port Short Circuit", id: 2075, level: Level.Warning},
    {bit: 14, name: "Churn Output Overload", id: 2077, level: Level.Major},
    {bit: 15, name: "Abnormal PV Module Config", id: 2080, level: Level.Major},
];

export const Alarms3: Alarm[] = [
    {bit: 0, name: "Optimizer Fault", id: 2081, level: Level.Warning},
    {bit: 1, name: "Built-in PID operation abnormal", id: 2085, level: Level.Minor},
    {bit: 2, name: "High Input String Voltage to Ground", id: 2085, level: Level.Major},
    {bit: 3, name: "External Fan Abnormal", id: 2086, level: Level.Major},
    {bit: 4, name: "Battery Reverse Connection", id: 2069, level: Level.Major},
    {bit: 5, name: "On-grid/Off-grid Controller Abnormal", id: 2082, level: Level.Major},
    {bit: 6, name: "PV String Loss", id: 2015, level: Level.Warning},
    {bit: 7, name: "Internal Fan Abnormal", id: 2097, level: Level.Major},
    {bit: 8, name: "DC Protection Unit Abnormal", id: 2088, level: Level.Major},
    {bit: 9, name: "EL Unit Abnormal", id: 2089, level: Level.Minor},
    {bit: 10, name: "Active Adjustment Instruction Abnormal", id: 2090, level: Level.Major},
    {bit: 11, name: "Reactive Adjustment Instruction Abnormal", id: 2091, level: Level.Major},
    {bit: 12, name: "CT Wiring Abnormal", id: 2092, level: Level.Major},
    {bit: 13, name: "DC Arc Fault (ADMC Alarm)", id: 2003, level: Level.Major},
];

export function check(buf: number, alarms: Alarm[]) {
    const bitset = buf;
    const set = [];
    for(let a of alarms) {
        let bit = 1 << a.bit;
        if((bitset & bit) === bit) {
            set.push(a);
        }
    }
    return set;
}