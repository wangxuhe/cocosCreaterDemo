/*
File: AudioManager
Desc: 声音类
Date: 2021-01-27
参考： https://docs.cocos.com/creator/3.3/manual/zh/audio-system/audioExample.html
*/

import { AudioClip, AudioSource, error, resources } from "cc";


export class AudioManager {
    private static _instance: AudioManager = null; 
    public static getInstance(): AudioManager {
        if (this._instance == null) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }

    private _audioSource = null;

    // 初始化
    init(audioSource: AudioSource) {
        this._audioSource = audioSource;
    }

    // 播放音乐
    public playMusic(isLoop: boolean = true) {
        this._audioSource.Loop = isLoop;
        if (!this._audioSource.playing) {
            this._audioSource.play();
        }
    }

    // 暂停音乐播放
    public pauseMusic() {
        this._audioSource.pause();
    }

    // 停止音乐播放
    public stopMusic() {
        this._audioSource.stop();
    }

    // 设置音量
    public setVolume(volume: number) {
        // 保存数据

        // 检测音乐是否播放中
        if (!this._audioSource.playing) {
            return;
        }
        this._audioSource.volume = volume;
    }

    // 播放音效
    public playSound(clip: AudioClip, volumeScale: number = 1) {
        this._audioSource.playOneShot(clip, volumeScale);
    }


    // 播放音乐
    /*
    public playMusic(name: string, isLoop: boolean = true) {
        const path = `audio/music/${name}`
        resources.load(path, AudioClip, (err, clip) => {
            if (err) {
                console.error(err);
                return;
            }
            clip!.setLoop(isLoop);
        });
    }

    // 播放音效
    public static playSound(name: string) {
        const path = `audio/sound/${name}`;
        loader.loadRes(path, AudioClip, (err, clip) => {
            if (err) {
                console.warn(err);
                return;
            }

            clip!.setLoop(false);
            clip!.playOneShot(1);
        });
    }
    */
}