
import { _decorator, Component, Node, Label, WebView, Button, sys } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('uiScene_webView')
export class uiScene_webView extends Component {
    @property(Label)
    public tipLabel: Label = null;          // 提示文本
    @property(WebView)
    public webView: WebView = null;         // 网页组件


    // 按钮点击事件
    onClickBtnEvent(target: Button, customEventData:string) {
        // 加载网页
        this.webView.url = "https://www.baidu.com";
    }

    // webView事件
    onWebviewEvent(target: WebView, eventType: typeof WebView.EventType) {
        this.tipLabel.string = "触发事件类型:" + eventType;
    }
}

