
import { _decorator, Component, Node, ScrollView, Prefab, Label, instantiate, UITransform, Vec3} from 'cc';
import { packageConfigs } from '../config/packageConfig';
const { ccclass, property } = _decorator;

const _temp_vec3 = new Vec3();
 
@ccclass('uiScene_scrollPackage')
export class uiScene_scrollPackage extends Component {
    @property(ScrollView)
    public scroll: ScrollView = null;
    @property(Prefab)
    public itemTemplate: Prefab = null;
    @property
    public spaceHeight = 10;
    @property(Label)
    public tipLabel: Label = null;

    private _content: Node = null;                  // 滚动区域节点
    private _nodes: Node[] = [];                    // 列表Nodes

    private _bagDatas:any = [];                    // 背包列表数据

    onLoad() {
        this._content = this.scroll.content;
    }

    start () {
        this._bagDatas = packageConfigs;
        this.createList();
    }

    // 创建列表
    private createList() {
        const num = this._bagDatas.length;
        // 创建
        for (let i = 0; i < num; ++i) {
            const item = instantiate(this.itemTemplate);
            this._content.addChild(item);

            // 设置item位置
            let itemTransComp = item._uiProps.uiTransformComp;
            let itemHeight = itemTransComp.height
            item.setPosition(0, -itemHeight * (0.5 + i) - this.spaceHeight * (i + 1), 0);

            // 更新item
            let taskItem = item.getComponent("packageItemScript");
            if (taskItem) {
                taskItem.updateItem(this._bagDatas[i]);
            }
            this._nodes.push(item);
        }
    }
}

