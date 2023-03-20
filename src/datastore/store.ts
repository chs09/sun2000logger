import type { DataSet } from "../data";

export interface Store {
    store(dp: DataSet): Promise<void>;
}