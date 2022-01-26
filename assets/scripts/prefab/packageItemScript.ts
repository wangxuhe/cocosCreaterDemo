
import { _decorator, Component, Sprite, Label, SpriteAtlas, resources, Node} from 'cc';
import { TASKSTATE } from '../UIScene/config/taskConfig';
const { ccclass, property } = _decorator;

/*
主要组成： 
    * ScrollView
    * Item 为Prefab， 内部嵌套着对应的脚本组件
    * 配置脚本： taskConfig
*/
 
@ccclass('packageItemScript')
export class packageItemScript extends Component {
    @property(Sprite)
    public iconImg: Sprite = null;          // 图标
    @property(Label)
    public nameLabel: Label = null;         // 名称
    @property(Label)
    public numLabel: Label = null;          // 数目

    private _itemData:any = [];             // 物品数据

    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, this.clickItemEvent, this);
    }

    // 更新Item
    updateItem(data: any) {
        this._itemData = data;

        // icon
        resources.load('image/emoji', SpriteAtlas, (err: any, atlas) => {
            if (err) {
                console.log("SpriteAtlas load failed");
                console.log(err);
                return;
            }
            this.iconImg.spriteFrame = atlas.getSpriteFrame(data.iconImg);
        });
        // 名字
        this.nameLabel.string = data.itemName;
        // 数目
        this.numLabel.string = data.haveNum;
    }

    private clickItemEvent(node: Node) {
        console.log("您点击了物品：", this.nameLabel.string);
    }
}
