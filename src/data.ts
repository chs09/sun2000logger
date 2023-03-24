import { Alarm } from "./alarms";

export interface DataSet {
    activePower: number;
    peakPower: number;

    phaseACurrent: number;
    phaseBCurrent: number;
    phaseCCurrent: number;

    powerFactor: number;
    gridFrequency: number;
    inverterTemperature: number;
    
    meterPhaseAPower: number;
    meterPhaseBPower: number;
    meterPhaseCPower: number;
    
    battery1SOC: number;
    battery1ChargePower: number;
    battery1Temperature: number;
    
    alarms: Alarm[];
    
    phaseCVoltage: number;
    phaseBVoltage: number;
    phaseAVoltage: number;

    pv1Voltage: number;
    pv1Current: number;

    pv2Voltage: number;
    pv2Current: number;

    pvPower: number;
}