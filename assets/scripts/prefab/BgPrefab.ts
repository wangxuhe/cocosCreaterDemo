
import { _decorator, Component, Node, Label, Button, spriteAssembler, director } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('BgPrefab')
export class BgPrefab extends Component {

    @property({type: Label, tooltip: "文本标题"})
    public titleText = null;

    @property({type: Button, tooltip: "按钮"})
    public exitBtn = null;
    
    onLoad() {
        this.exitBtn.node.on(Button.EventType.CLICK, this.onExitBtnEvent, this);
    }

    start () {
        // [3]
    }

    onDestory() {
        // 
    }

    onExitBtnEvent() {
        console.log("点击了BgPrefab的返回按钮")
        director.loadScene("UIScene");
    }
}
