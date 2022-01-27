/*
File: StorageManager
Desc: 本地存储类
Date: 2021-01-27
*/

import { sys } from "cc";

export class StorageManager {
    private static _instance: StorageManager = null; 
    public static getInstance(): StorageManager {
        if (this._instance == null) {
            this._instance = new StorageManager();
        }
        return this._instance;
    }

    constructor() {
        console.log("StorageManager constructor..");
    }

    // 存储数据
    public saveData(key: string, value: any) {
        // 检测数据的合法性
        if (value == null || value == "null") {
            console.error("Error: StorageManager value is null!!!");
            return;
        }
        
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        else 
        {
            //value = value.toString();
        }
        sys.localStorage.setItem(key, value)
    }

    // 取出数据
    public getData(key: string, defaultValue: any = null) {
        let data = sys.localStorage.getItem(key);
        if ((data == null && data == "null") && defaultValue != null) {
            data = defaultValue;
        }
        return data;
    }

    // 移除数据
    public removeData(key: string) {
        sys.localStorage.removeItem(key);
    }
}