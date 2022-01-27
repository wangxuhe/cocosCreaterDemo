
import { _decorator, Component, Node, Label, Button, spriteAssembler, director } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('BgPrefab')
export class BgPrefab extends Component {
    @property({type: Label, tooltip: "文本标题"})
    public titleText = null;
    @property({type: Button, tooltip: "按钮"})
    public exitBtn = null;
    @property
    public isUiMain = false;
    
    onLoad() {
        this.exitBtn.node.on(Button.EventType.CLICK, this.onExitBtnEvent, this);
    }

    onExitBtnEvent() {
        if (this.isUiMain) {
            director.loadScene("MainScene");
        }
        else {
            director.loadScene("UI/UIScene");
        }
    }
}
