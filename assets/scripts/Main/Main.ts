
import { _decorator, Component, Node, ScrollView, Label, Button, Vec3, Vec2, UITransform, instantiate, error, CCInteger } from "cc";

// ccclass 主要用来修饰Component组件
// executeInEditMode 允许当前组件再编译器模式下运行，默认为false
// requireComponent 用于指定当前组件的依赖组件，默认为null
// executionOrder 用来指定脚本生命周期回调的执行优先级， 小于0的优先执行，大于0的最后执行
// disallowMultiple 同一个节点上只允许添加一个同类型(含子类的组件)， 默认为false 
// menu 会将当前组件添加到组件菜单中，方便用户查找
// help 当前组件的帮助文档的url， 设置完成后属性检查器会出现一个帮助的图标
const { ccclass, property, menu, help} = _decorator;

const _temp_vec3 = new Vec3();

@ccclass('Main')
@menu("scripts/main")
@help("https://docs.cocos.com/creator/3.3/manual/zh/scripting/decorator.html")
export class Main extends Component {
    @property({type: Node, tooltip: "列表Item模版"})
    public itemTemplate: Node  = null!;
    @property({type: ScrollView, tooltip: "滚动容器节点"})
    public scrollView: ScrollView  = null!;
    @property({type: CCInteger, tooltip: "垂直布局间隔"})
    public spacing = 0;
    @property
    public bufferZone = 0; // when item is away from bufferZone, we relocate it
    @property(Button)
    public btnExit: Button  = null!;

    private _content: Node = null!;
    private _items: Node[] = [];
    private _updateTimer = 0;
    private _updateInterval = 0.2;
    private _lastContentPosY = 0;
    private _itemTemplateUITrans!: UITransform;
    private _contentUITrans!: UITransform;

    onLoad() {
        this._content = this.scrollView.content!;
        this.initialize();
        this._updateTimer = 0;
        this._updateInterval = 0.2;
        this._lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
    }

    // 初始化 item
    initialize() {
        let listData = [
            {name: "UI示例"},
            {name: "Shader示例"},
            {name: "Demo1"},
            {name: "Demo2"},
            {name: "UI示例"},
            {name: "Shader示例"},
            {name: "Demo1"},
            {name: "Demo2"},
            {name: "UI示例"},
            {name: "Shader示例"},
            {name: "Demo1"},
            {name: "Demo2"},
        ];
        let itemCount = listData.length;

        this._itemTemplateUITrans = this.itemTemplate._uiProps.uiTransformComp!;
        this._contentUITrans = this._content._uiProps.uiTransformComp!;
        this._contentUITrans.height = itemCount * (this._itemTemplateUITrans.height + this.spacing) + this.spacing;
        for (let i = 0; i < itemCount; ++i) {
            let item = instantiate(this.itemTemplate) as Node;
            item.active = true;
            this._content.addChild(item);
            // 设置item位置
            let itemUITrans = item._uiProps.uiTransformComp!;
            item.setPosition(0, -itemUITrans.height * (0.5 + i) - this.spacing * (i + 1), 0);
            // 设置item内容
            const labelComp = item.getComponentInChildren(Label)!;
            labelComp.string = listData[i].name;
            this._items.push(item);
        }
    }

    start() {
        this.scrollView.node.on(ScrollView.EventType.SCROLL_TO_BOTTOM, this.scrollToBottomEvent, this);
        this.scrollView.node.on(ScrollView.EventType.SCROLL_TO_TOP, this.scrollToTopEvent, this);
        this.scrollView.node.on(ScrollView.EventType.BOUNCE_BOTTOM, this.scrollBottomEvent, this);
        this.scrollView.node.on(ScrollView.EventType.BOUNCE_TOP, this.scrollBounceEvent, this);
    }

    scrollToBottomEvent() {
        console.log("scrollToBottomEvent....")
    }

    scrollToTopEvent() {
        console.log("scrollToTopEvent....")
    }

    scrollBottomEvent() {
        console.log("scrollBottomEvent....")
    }

    scrollBounceEvent() {
        console.log("scrollBounceEvent....")
    }

    getPositionInView(item: Node) {
        let worldPos = item.parent!.getComponent(UITransform)!.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt: number) {
        this._updateTimer += dt;
        if (this._updateTimer < this._updateInterval){
            return;
        }
            
        this._updateTimer = 0;
        let items = this._items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content!.position.y < this._lastContentPosY; // scrolling direction
        let offset = (this._itemTemplateUITrans.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            items[i].getPosition(_temp_vec3);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && _temp_vec3.y + offset < 0) {
                    _temp_vec3.y += offset;
                    items[i].setPosition(_temp_vec3);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && _temp_vec3.y - offset > -this._contentUITrans.height) {
                    _temp_vec3.y -= offset;
                    items[i].setPosition(_temp_vec3);
                }
            }
        }
        // update lastContentPosY
        this._lastContentPosY = this.scrollView.content!.position.y;
    }

    scrollToFixedPosition() {
        this.scrollView.scrollToOffset(new Vec2(0, 500), 2, true);
    }

    onExitEvent() {
        console.log("您点击了退出按钮")
    }
}
