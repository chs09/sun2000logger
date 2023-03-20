export interface Settings {
    host: string,
    port: number,

    debug?: boolean,

    interval?: number,

    mysql?: {
        host: string,
        user: string,
        pass: string,
        database: string;
    }
}

export const settings: Settings = {
    host: '192.168.178.99',
    port: 502
};