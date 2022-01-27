
import { _decorator, Component, Node, Label } from 'cc';
import { StorageManager } from '../../Manager/StorageManager';
const { ccclass, property } = _decorator;

 
@ccclass('uiScene_storage')
export class uiScene_storage extends Component {
    @property(Label)
    public showLabel: Label = null;

    private _storageManager: StorageManager = null;

    onLoad() {
        this._storageManager = StorageManager.getInstance();
    }

    start() {
        let value = this._storageManager.getData("Local_Debug_Data");
        this.showLabel.string = value;
        let jsonValue = this._storageManager.getData("Local_Deub_JsonData");
        console.log(jsonValue);
    }

    public clickSaveEvent(event: Event, customeEventData: string){
        // 存储number, string, boolean类型数据
        const key:string = "Local_Debug_Data";
        let value:any = "Hello Local storage";
        this._storageManager.saveData(key, value);

        // 存储json数据
        const jsonKey:string = "Local_Deub_JsonData";
        let jsonValue:any = {
            name: "uiScene_storage",
            index: 11,
            isLocal: true,
        };
        this._storageManager.saveData(jsonKey, jsonValue);
    }
}
