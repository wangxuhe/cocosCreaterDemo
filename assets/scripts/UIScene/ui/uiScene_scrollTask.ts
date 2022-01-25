
import { _decorator, Component, Node, ScrollView, Prefab, Label, instantiate, UITransform, Vec3} from 'cc';
import { taskConfigs } from '../config/taskConfig';
const { ccclass, property } = _decorator;

/*
主要组成： 
    * ScrollView
    * Item 为Prefab， 内部嵌套着对应的脚本组件
    * 配置脚本： packageConfig
*/
 
@ccclass('uiScene_scrollTask')
export class uiScene_scrollTask extends Component {
    @property(ScrollView)
    public scroll: ScrollView = null;
    @property(Prefab)
    public itemTemplate: Prefab = null;
    @property
    public spaceHeight = 10;
    @property(Label)
    public tipLabel: Label = null;

    private _content: Node = null;                  // 滚动区域节点
    private _contentUITrans: UITransform = null;    // 滚动区域变换组件
    private _nodes: Node[] = [];                    // 列表Nodes
    private _itemHeight = 0;

    private _taskDatas:any = [];                    // 任务列表数据

    onLoad() {
        this._content = this.scroll.content;
        this._contentUITrans = this._content._uiProps.uiTransformComp;
        // 获取item高度
        let prefabRootNode = this.itemTemplate.data;
        let uiTransComp = prefabRootNode.getComponent(UITransform);
        this._itemHeight = uiTransComp.height;
    }

    start () {
        this._taskDatas = taskConfigs;
        this.createList();
    }

    // 更新滚动区域大小
    private updateContentSize(num: number) {
        this._contentUITrans.height = num * (this._itemHeight + this.spaceHeight) + this.spaceHeight;
    }

    // 创建列表
    private createList() {
        const num = this._taskDatas.length;
        // 设置内容滚动区域
        this.updateContentSize(num);
        // 创建
        for (let i = 0; i < num; ++i) {
            const item = instantiate(this.itemTemplate);
            const taskData = this._taskDatas[i];
            this._content.addChild(item);

            // 设置item位置
            let itemTransComp = item._uiProps.uiTransformComp;
            let itemHeight = itemTransComp.height
            item.setPosition(0, -itemHeight * (0.5 + i) - this.spaceHeight * (i + 1), 0);

            // 更新item
            let taskItem = item.getComponent("taskItemScript");
            if (taskItem) {
                taskItem.updateItem(taskData);
            }
            this._nodes.push(item);
        }
    }
}

