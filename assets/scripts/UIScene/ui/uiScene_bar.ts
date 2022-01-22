
import { _decorator, Component, Node, ProgressBar, Sprite, Slider, Label } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('uiScene_bar')
export class uiScene_bar extends Component {
    @property(Sprite)
    public sprite:Sprite = null;                    // 精灵进度条
    @property(ProgressBar)
    public progressBar1:ProgressBar = null;         // 进度条1
    @property(ProgressBar)
    public progressBar2:ProgressBar = null;         // 进度条2
    @property(Slider)
    public slider:ProgressBar = null;               // 滑动条
    @property(Label)
    public sliderText:Label = null;                 // 滑动条文本

    private _process:number = 0;         // 进度值，取值范围[0, 1]

    onLoad() {
        this.slider.node.on('slide', this.onSlideEvent, this);
    }

    changeProgress(num: number) {
        this.sprite.getComponent(ProgressBar).progress = num;
        this.progressBar1.getComponent(ProgressBar).progress = num;
        this.progressBar2.getComponent(ProgressBar).progress = num;
    }

    update (deltaTime: number) {
        this._process += 0.1 * deltaTime;
        if (this._process > 1) {
            this._process = 0;
        }
        this.changeProgress(this._process);
    }

    onSlideEvent(slider: Slider) {
        this.sliderText.string = slider.progress;
    }
}

