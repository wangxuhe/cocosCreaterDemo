
import { _decorator, Component, Node, Sprite, Label, ProgressBar, Button, resources, SpriteAtlas } from 'cc';
import { TASKSTATE } from '../UIScene/config/taskConfig';
const { ccclass, property } = _decorator;
 
@ccclass('taskItemScript')
export class taskItemScript extends Component {
    @property(Sprite)
    public iconImg: Sprite = null;          // 图标
    @property(Label)
    public nameLabel: Label = null;         // 名称
    @property(Label)
    public descLabel: Label = null;         // 描述
    @property(ProgressBar)
    public bar: ProgressBar = null;         // 进度
    @property(Button)
    public button: Button = null;           // 按钮

    private _taskData:any = [];             // 任务数据

    // 更新Item
    public updateItem(data: any) {
        this._taskData = data;

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
        this.nameLabel.string = data.name;
        // 描述
        this.descLabel.string = data.desc;
        // 进度
        const curNum = data.curNum;
        const maxNum = data.maxNum;
        let processBar = this.bar.getComponent(ProgressBar); 
        processBar.progress = Math.min(1, curNum/maxNum);
        let barText = this.bar.getComponentInChildren(Label);
        barText.string = `${curNum}/${maxNum}`;
        // 按钮相关(1.未完成 2.可领取 3.已领取)
        let btnTitle = this.button.getComponentInChildren(Label);
        const state = data.state;
        if (state == TASKSTATE.NOT_FINISH) {
            btnTitle.string = "未完成";
            this.button.interactable = false;
        }
        else if (state == TASKSTATE.FINISH_NOT_GET) {
            btnTitle.string = "领取";
            this.button.interactable = true;
        }
        else if (state == TASKSTATE.FINISH_GETTED) {
            btnTitle.string = "完成";
            this.button.interactable = false;
        }
    }

    // 点击按钮事件
    clickButtonEvent(event: Event, customData: string) {
        let state = this._taskData.state;

        if (state != TASKSTATE.FINISH_NOT_GET) {
            console.log("不符合条件");
            return;
        }
        console.log("领取奖励.....");
    }
}
