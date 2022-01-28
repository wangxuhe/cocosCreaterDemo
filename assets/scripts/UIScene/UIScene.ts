
import { _decorator, Component, Node, ScrollView, Button, UITransform, instantiate, Vec2, Vec3, director} from 'cc';
import { ListItem } from './ListItem';
const { ccclass, property } = _decorator;

const _temp_vec3 = new Vec3();

let dataList = [
    // 标题， 场景名
    {name:"Text 示例", sceneName: "UI/uiScene_text"},
    {name:"Sprite 示例", sceneName: "UI/uiScene_sprite"},
    {name:"Mask 示例", sceneName: "UI/uiScene_mask"},
    {name:"Button 示例", sceneName: "UI/uiScene_button"},
    {name:"Bar 示例", sceneName: "UI/uiScene_bar"},
    {name:"EditBox 示例", sceneName: "UI/uiScene_editBox"},
    {name:"webView 示例", sceneName: "UI/uiScene_webView"},
    {name:"videoPlayer 示例", sceneName: "UI/uiScene_video"},
    {name:"pageView 示例", sceneName: "UI/uiScene_pageView"},
    {name:"scrollView 任务示例", sceneName: "UI/uiScene_scrollTask"},
    {name:"scrollView 背包示例", sceneName: "UI/uiScene_scrollPackage"},
    {name:"localStorage 本地存储", sceneName: "UI/ UIScene_Storage"},
];
 
@ccclass('ListView')
export class ListView extends Component {
    @property({type: Node, tooltip: "列表Item模版"})
    public itemTemp: Node  = null;
    @property({type: ScrollView, tooltip: "滚动容器节点"})
    public scrollView: ScrollView  = null;
    @property
    public spaceHeight = 0;
    @property(ListItem)
    public itemClass: ListItem = null;
    @property(Button)
    public backBtn: Button = null;

    private _content: Node = null;              // 滚动区域节点
    private _itemNodes: Node[] = [];            // 列表items节点
    private _updateTimer = 0;
    private _updateInterval = 0.2;
    private _lastContentPosY = 0;
    private _itemTempUITrans!: UITransform;     // 模版item变换组件
    private _contentUITrans!: UITransform;      // 滚动区域变换组件
    private _itemList = [];                     // 列表数据
    private _totalCount = 0;                    // 列表数目
    private _bufferZone = 600;


    onLoad() {
        this._updateTimer = 0;
        this._updateInterval = 0.2;
        this._lastContentPosY = 0; 

        this._content = this.scrollView.content;
        this._itemTempUITrans = this.itemTemp._uiProps.uiTransformComp!;
        this._contentUITrans = this._content._uiProps.uiTransformComp!;

        this.backBtn.node.on(Button.EventType.CLICK, this.onBackEvent, this); 
    }

    start () {
        this._itemList = dataList;
        this._totalCount = this._itemList.length;
        this.createList();  
    }

    // 创建列表
    createList() {
        // 设置滚动区域高度
        this._contentUITrans.height = this._totalCount * (this._itemTempUITrans.height + this.spaceHeight) + this.spaceHeight;
        // 清空列表
        this.clearAllItems();
        // 创建
        for (let i = 0; i < this._totalCount; ++i) {
            let item = instantiate(this.itemTemp) as Node;
            item.active = true;
            this._content.addChild(item)
            // 设置item位置
            let uiTransComp = item._uiProps.uiTransformComp;
            item.setPosition(0, -uiTransComp.height * (0.5 + i) - this.spaceHeight * (i + 1), 0);
            // 更新item
            item.getComponent("ListItem").updateItem(i, this._itemList[i]);
     
            
            this._itemNodes.push(item);
        }
    }

    getPositionInView(item: Node) {
        let worldPos = item.parent!.getComponent(UITransform)!.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    // update(dt: number) {
    //     this._updateTimer += dt;
    //     if (this._updateTimer < this._updateInterval){
    //         return;
    //     }
            
    //     this._updateTimer = 0;
    //     let items = this._itemNodes;
    //     let buffer = this._bufferZone;
    //     let isDown = this.scrollView.content!.position.y < this._lastContentPosY;
    //     let offset = (this._itemTempUITrans.height + this.spaceHeight) * items.length;
    //     for (let i = 0; i < items.length; ++i) {
    //         let viewPos = this.getPositionInView(items[i]);
    //         items[i].getPosition(_temp_vec3);
    //         if (isDown) {
    //             // if away from buffer zone and not reaching top of content
    //             if (viewPos.y < -buffer && _temp_vec3.y + offset < 0) {
    //                 _temp_vec3.y += offset;
    //                 items[i].setPosition(_temp_vec3);
    //             }
    //         } else {
    //             // if away from buffer zone and not reaching bottom of content
    //             if (viewPos.y > buffer && _temp_vec3.y - offset > -this._contentUITrans.height) {
    //                 _temp_vec3.y -= offset;
    //                 items[i].setPosition(_temp_vec3);
    //             }
    //         }
    //     }
    //     // update lastContentPosY
    //     this._lastContentPosY = this.scrollView.content!.position.y;
    // }

    scrollToFixedPosition() {
        this.scrollView.scrollToOffset(new Vec2(0, 500), 2, true);
    }

    // 清理所有列表
    clearAllItems() {
        for(let i = 0; i < this._totalCount; ++i) {
            let itemNode = this._itemNodes[i]
            if(itemNode)
            {
                itemNode.destroy();
            }
        }
    }

    // 销毁
    onDestory() {
        //
    }

    onBackEvent() {
        director.loadScene("MainScene");
    }
}

