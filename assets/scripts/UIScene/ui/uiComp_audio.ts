
import { _decorator, Component, Node, AudioClip, AudioSource, Slider, Toggle } from 'cc';
const { ccclass, property } = _decorator;

/*
参考：
AudioSource组件： https://docs.cocos.com/creator/3.3/manual/zh/audio-system/audiosource.html
音频播放示例：https://docs.cocos.com/creator/3.3/manual/zh/audio-system/audioExample.html
*/
 
@ccclass('uiComp_audio')
export class uiComp_audio extends Component {
    @property(AudioClip)
    public audioClip: AudioClip = null;

    private _audioSource: AudioSource = null;
    onLoad() 
    {
        this._audioSource = this.node.getComponent(AudioSource);
    }

    onEnable() 
    {
        this._audioSource.node.on(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        this._audioSource.node.on(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    onDisable() {
        this._audioSource.node.off(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        this._audioSource.node.off(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    private onAudioStarted() {
        console.log("AudioSource EventType Started...");
    }

    private onAudioEnded() {
        console.log("AudioSource EventType End...");
    }

    // 音乐进度条事件
    public MusicProcessEvent(node: Node, customData: string) {
        let slider = node.getComponent(Slider);
        let process = slider.progress;
        
        // 设置音量[0, 1]
        this._audioSource.volume = process;
    }

    // 音乐开关事件
    public MusicSwitchEvent(node: Node, customData: string) {
        const toggle = node.getComponent(Toggle);
        if (toggle.isChecked) {
            this._audioSource.play();
        }
        else {
            this._audioSource.pause();
        }
    }
}

