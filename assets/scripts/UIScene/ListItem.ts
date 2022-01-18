
import { _decorator, Component, Node, Button, Label } from 'cc';
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

    updateItem(index:number, data:any) {
        console.log("ListItem Index:", index, data.name)
        this.titleText.string = data.name;

        this._index = index;
        this._itemData = data;
    }

    onClickEvent() {
        console.log(this._index)
        if(this._index == 0){
            console.log("您点击了Sprite示例按钮")
        }else if(this._index == 1) {
            console.log("您点击了Button示例按钮")
        }else if(this._index == 2) {
            console.log("您点击了Label示例按钮")
        }else if(this._index == 3) {
            console.log("您点击了Bar示例按钮")
        }
    }

}
