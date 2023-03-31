import { Alarm } from "./alarms";

export interface DataSet {

    /** Input Power of the PV plant minus the current usage */
    activePower: number;
    
    /** Peak Power of Current Day*/
    peakPower: number;

    /** Phase A Current (A) */
    phaseACurrent: number;

    /** Phase B Current (A) */
    phaseBCurrent: number;

    /** Phase C Current (A) */
    phaseCCurrent: number;

    /** Power Factor */
    powerFactor: number;

    /** Grid Frequency (Hz) */
    gridFrequency: number;

    /** Inverter Temperature (°C) */
    inverterTemperature: number;
    
    /** Phase A Current (A) */
    meterPhaseAPower: number;
    
    /** Phase B Current (A) */
    meterPhaseBPower: number;

    /** Phase C Current (A) */
    meterPhaseCPower: number;
    
    /** Battery 1 State of Charge (%) */
    battery1SOC: number;

    /**Battery 1 Charge Power (W) */
    battery1ChargePower: number;

    /** Battery 1 Temperature (°C) */
    battery1Temperature: number;
    
    /** List of Alarms */
    alarms: Alarm[];
    
    /** Phase C Voltage (V) */
    phaseCVoltage: number;

    /** Phase B Voltage (V) */
    phaseBVoltage: number;

    /** Phase A Voltage (V) */
    phaseAVoltage: number;

    /** String 1 Voltage (V) */
    pv1Voltage: number;

    /** String 1 Current (A) */
    pv1Current: number;

    /** String 2 Voltage (V) */
    pv2Voltage: number;

    /** String 2 Current (A) */
    pv2Current: number;

    /** Total Input Power (W) */
    pvPower: number;
}