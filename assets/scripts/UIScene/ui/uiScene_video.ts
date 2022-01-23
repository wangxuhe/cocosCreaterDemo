
import { _decorator, Component, Node, VideoPlayer, Label, LabelOutline, Slider, sys, VideoClip, Button, Toggle} from 'cc';
const { ccclass, property, menu} = _decorator;

/*
视频播放， 支持本地和远程播放， 格式为mp4
*/

 
@ccclass('uiScene_video')
@menu("https://docs.cocos.com/creator/manual/zh/ui-system/components/editor/videoplayer.html")
export class uiScene_video extends Component {
    @property(VideoPlayer)
    public videoPlayer: VideoPlayer = null;             // 视频组件
    @property(VideoClip)
    public videoClip: VideoClip = null;                 // 视频资源      
    @property(Label)
    public tipLabel: Label = null;                      // 提示文本
    @property(Button)
    public pauseBtn: Button = null;                     // 暂停按钮
    @property(Button)
    public stopBtn: Button = null;                      // 停止按钮
    @property(Toggle)
    public loopToggle: Toggle = null;                   // 循环播放Checkbox
    @property(Toggle)
    public muteToggle: Toggle = null;                   // 静音Checkbox
    @property(Button)
    public rateBtn: Button = null;                      // 速率按钮
    @property(Slider)
    public processSlider: Slider = null;                // 进度滑动条
    @property(Slider)
    public volumeSlider: Slider = null;                 // 音量滑动条
    @property(Label)
    public volumeLabel: Label = null;                   // 音量文本

    private _isPasue:boolean = false;                   // 是否暂停播放
    private _isPlaying:boolean = false;                 // 是否正在播放中 
    private _rateNum = 0;                               // 播放速率
    private _process:number = 0;                        // 播放进度

    onLoad() {
        // 初始化UI相关
        this.initDefaultUI();

        this.pauseBtn.node.on(Button.EventType.CLICK, this.onPauseBtnEvent, this);
        this.stopBtn.node.on(Button.EventType.CLICK, this.onStopBtnEvent, this);
        this.loopToggle.node.on(Toggle.EventType.TOGGLE, this.onToggleLoopEvent, this);
        this.muteToggle.node.on(Toggle.EventType.TOGGLE, this.onToggleMuteEvent, this);
        this.rateBtn.node.on(Button.EventType.CLICK, this.onRateBtnEvent, this);
        this.processSlider.node.on('slide', this.onSliderProgressEvent, this);
        this.volumeSlider.node.on('slide', this.onSliderVolumeEvent, this); 
    }

    start() {
        // 隐藏不支持 video player 的平台
        switch (sys.platform) {
            case sys.Platform.MACOS:
            case sys.Platform.ALIPAY_MINI_GAME:
            case sys.Platform.BYTEDANCE_MINI_GAME:
            case sys.Platform.COCOSPLAY:
            case sys.Platform.HUAWEI_QUICK_GAME:
            case sys.Platform.VIVO_MINI_GAME:
            case sys.Platform.XIAOMI_QUICK_GAME:
            case sys.Platform.BAIDU_MINI_GAME:
            case sys.Platform.LINKSURE_MINI_GAME:
            case sys.Platform.QTT_MINI_GAME:
            case sys.Platform.WIN32:
                this.videoPlayer.node.active = false;
                break;
        }
    }

    update() {
        // 更新播放进度
        let curTime = this.videoPlayer.currentTime;
        let totalTime = this.videoPlayer.duration;
        this.processSlider.progress = curTime/totalTime;
    }

    private initDefaultUI() {
        // 设置循环
        this.videoPlayer.loop = false;
        this.loopToggle.isChecked = false; 
        // 设置静音
        this.videoPlayer.mute = false;
        this.muteToggle.isChecked = false;
        // 设置速率[1,10]
        this.videoPlayer.playbackRate = 1;
        this._rateNum = 1;
        // 设置音量[0,1]
        this.videoPlayer.volume = 0;
        this.volumeSlider.progress = 0;
        // 设置播放进度为0
        this.processSlider.progress = 0;
        this._process = 0;
    }

    // 视频事件
    videoPlayerEvent(event: Event, eventType:string) {
        let tipStr = ""
        const TYPE = VideoPlayer.EventType;
        switch(eventType) {
            case TYPE.PLAYING: {
                tipStr = "视频播放中";
                this._isPlaying = true;
                break;
            };
            case TYPE.PAUSED: {
                tipStr = "视频暂停中";
                break;
            };
            case TYPE.STOPPED: {
                tipStr = "视频停止中";
                this._isPlaying = false;
                break;
            };
            case TYPE.COMPLETED: {
                tipStr = "视频播放完毕";
                break;
            };
            case TYPE.META_LOADED: {
                tipStr = "视频元数据加载完毕";
                break;
            };
            case TYPE.READY_TO_PLAY: {
                tipStr = "视频加载完毕可播放";
                break;
            };
            case TYPE.ERROR: {
                tipStr = "处理视频时触发的错误";
                break;
            };
            case TYPE.CLICKED: {
                tipStr = "视频被点击";
                break;
            };
        }
        if (eventType == TYPE.META_LOADED || eventType == TYPE.META_LOADED) {
            this._in
            this.videoPlayer.play();
        }
        this.tipLabel.string = tipStr;
    }

    // 播放本地视频(UI编译器中设置事件)
    clickPlayLocalVideo(event: Event, customEventData:string) {
        // 设置视频来源类型
        this.videoPlayer.resourceType = VideoPlayer.ResourceType.LOCAL;
        // 检测本地视频资源是否相等
        if (this.videoPlayer.clip == this.videoClip) {
            this.videoPlayer.play();
        }
        else {
            this.videoPlayer.clip = this.videoClip;
        }
    }

    // 播放远程视频(UI编译器中设置事件)
    clickPlayRemoteVideo(event: Event, customEventData:string){
        // 设置视频来源类型
        this.videoPlayer.resourceType = VideoPlayer.ResourceType.REMOTE;
        const remoteURL = 'http://download.cocos.org/CocosTest/test-case/movie.mp4';
        if (this.videoPlayer.remoteURL == remoteURL) {
            // 注意，如果视频处于正在播放状态，将重新开始播放； 如果处于暂停状态，将会继续播放
            this.videoPlayer.play();
        }
        else {
            this.videoPlayer.remoteURL = remoteURL;
        }
    }

    // 暂停视频事件
    private onPauseBtnEvent(button: Button) {
        // 检测是否暂停
        let titleStr = "";
        if (this._isPasue) {
            this.videoPlayer.resume();      // 恢复视频播放
            this._isPasue = false;
            titleStr = "暂停视频";
        }
        else {
            this.videoPlayer.pause();
            this._isPasue = true;
            titleStr = "恢复视频";
        }
        let btnTitleLabel = button.getComponentInChildren(Label);
        btnTitleLabel.string = titleStr;
    }

    // 停止视频事件
    private onStopBtnEvent(button: Button) {
        // 检测是否正在播放中
        let titleStr = "";
        console.log("视频是否播放中:", this._isPlaying);
        if (this._isPlaying) {
            this.videoPlayer.stop();
            this._isPlaying = false;
            titleStr = "播放视频";
        }
        else {
            this.videoPlayer.play();
            this._isPlaying = true;
            titleStr = "停止视频";
        }
        let btnTitleLabel = button.getComponentInChildren(Label);
        btnTitleLabel.string = titleStr;
    }

    // toggle循环播放事件
    private onToggleLoopEvent(toggle: Toggle) {
        // 视频播放结束后是否再次播放
        let isLoop = this.loopToggle.isChecked;
        this.videoPlayer.loop = isLoop;
    }

    // toggle静音事件
    private onToggleMuteEvent(toggle: Toggle) {
        // 是否静音播放
        let isMute = toggle.isChecked;
        this.videoPlayer.mute = isMute;
    }

    // 播放速率
    private onRateBtnEvent(button: Button) {
        // 设置速率，范围在[1, 10]之间
        this._rateNum = this._rateNum++ >= 3 ? 1 : this._rateNum;
        this.videoPlayer.playbackRate = this._rateNum;
        // 设置标题
        this.rateBtn.getComponent(Label).string = `X${this._rateNum}`;
    }

    // 滑动条进度事件
    private onSliderProgressEvent(slider: Slider) {
        // 获取视频播放总时长(秒)
        let duration = this.videoPlayer.duration;
        // 获取进度,范围在[0,1]之间
        const process = this.processSlider.progress;
        // 设置视频播放开始时间点(秒)
        this.videoPlayer.currentTime = process * duration;
    }

    // 设置音量进度
    private onSliderVolumeEvent(slider: Slider) {
        // 设置音量，范围在[0, 1]之间
        this.videoPlayer.volume = this.volumeSlider.progress;

        //
        this.volumeLabel.string = `音量${this.videoPlayer.volume}`;
    }
}
