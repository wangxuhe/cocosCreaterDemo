
import { _decorator, Component, Node, Button, Label, director } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('ListItem')
export class ListItem extends Component {
    @property(Label)
    public titleText:Label = null;

    private _index:number = 0;
    private _itemData:any;

    onLoad() {
        this.node.on(Button.EventType.CLICK, this.onClickEvent, this);
    }

    start() 
    {
        
    }

    public updateItem(index:number, data:any) {
        console.log("ListItem Index:", index, data.name)
        this.titleText.string = data.name;

        this._index = index;
        this._itemData = data;
    }

    onClickEvent() {
        console.log(this._itemData)
        let sceneName = this._itemData.sceneName;
        if (sceneName)
        {
            director.loadScene(sceneName);
        }
    }
}
