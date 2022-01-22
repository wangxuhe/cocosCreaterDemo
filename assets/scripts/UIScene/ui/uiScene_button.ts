
import { _decorator, Component, Button, Layout, EventHandler, Toggle, ToggleComponent, Label, ToggleContainer} from 'cc';
const { ccclass, property} = _decorator;

/*
按钮的点击事件类型主要为: CLick
主要的使用方式有三种：
1. 通过编译器内的ClickEvents， 添加：
    target: 带有脚本组件的节点
    Component: 脚本组件名称
    Handler: 回调函数
    customEventData: 自定义数据
2. 通过EventHander创建
3. 通过this.node.on来进行回调
第三种方式跟前两种相比，使用简便但不能自定义数据相关

复选按钮，主要通过Toggle组件实现，其实就是CheckBox, 它继承于Button
官方提供了： Toggle, ToggleGroup

*/
@ccclass('uiScene_button')
export class uiScene_button extends Component {
    @property(Button)
    public button_1: Button = null;                 // 使用UI编译器内的ClickEvents设置点击事件
    @property(Button)
    public button_2: Button = null;                 // 使用EventHander对象
    @property(Button)
    public button_3: Button = null;                 // 使用button.node.on方式
    @property(Layout)
    public layout: Layout = null; 
    @property(ToggleContainer)
    public togContainer: ToggleContainer = null;                  

    private _checkBoxs: Toggle[] = [];              // 复选按钮表

    onLoad() {
        // 普通按钮回调相关
        this._initButtonHandler();
        // 复选按钮组相关
        this._initCheckButton();
        // 单选按钮组相关
        this._initRadioButton();
    }

    _initButtonHandler() {
        // 创建EventHander
        const btnHandler = new EventHandler();
        btnHandler.target = this.node;                  // 事件处理代码组件的所属节点
        btnHandler.component = "uiScene_button";        // 脚本类名
        btnHandler.handler = "setClickEvent";           // 回调接口
        btnHandler.customEventData = "button_2";        // 自定义数据
        this.button_2.clickEvents.push(btnHandler);

        
        // 创建on事件相关
        this.button_3.node.on(Button.EventType.CLICK, this.onButtonEvent, this);
    }

    _initCheckButton() {
        let layoutNode = this.layout.node
        let checkboxNum = layoutNode.children.length;
        for (let i = 0; i < checkboxNum; ++i) {
            // 获取指定名称的子节点
            let node = layoutNode.getChildByName("Toggle_" + (i+1));
            if (node) {
                // 获取节点内的指定toggle组件
                let toggle = node.getComponent(Toggle);
                toggle.node.on(Toggle.EventType.TOGGLE, this.onCheckBoxEvent, this);
                this._checkBoxs.push(toggle);
                
                // 获取toggle组件下的label组件节点
                let titleText = toggle.getComponentInChildren(Label);
                titleText.string = "复选按钮" + i;
            }
        }
    }

    _initRadioButton() {
        // 使用UI编译的CheckEvents设定事件

        // 设置toggle按钮是否可被反复的选中或未选中
        this.togContainer.allowSwitchOff = false;
    }

    // 使用UI编译器内的ClickEvents来实现点击相关
    setClickEvent(event: Event, data:string) {
        console.log("you click button name：", data);
    }

    // 通过on添加按钮回调接口
    onButtonEvent(button: Button) {
        console.log("you click button name:", button.name);
    }

    // 复选按钮事件
    onCheckBoxEvent(toggle: ToggleComponent) {
        for (let i = 0; i < this._checkBoxs.length; i++) {
            let toggle = this._checkBoxs[i];
            if (toggle.isChecked) {
                console.log("选择了按钮:", i);
            }
        }
    }

    // 单选按钮事件
    onRadioEvent(toggle: ToggleComponent) {
        console.log("选择的复选按钮:", toggle.node.name);
    }
}

