
import { _decorator, Component, Node, Sprite, SpriteFrame, Color, Button, resources, SpriteAtlas, assetManager, ImageAsset, Texture2D } from 'cc';
const { ccclass, property, help} = _decorator;


 
@ccclass('uiScene_sprite')
@help("https://docs.cocos.com/creator/3.3/manual/zh/ui-system/components/editor/sprite.html")
export class uiScene_sprite extends Component {
    @property({type: Sprite, tooltip: "单色精灵"})
    public singleSprite = null;

    @property({type: Sprite, tooltip: "填充精灵"})
    public fillSprite = null;

    @property({type: Sprite, tooltip: "精灵集"})
    public frameSprite = null;

    @property({type: SpriteFrame, tooltip: "精灵集资源"})
    public frameName = null;

    private _range = 0;

    onLoad() {
        this._range = 0;
        this.fillSprite.fillRange = this._range;

        //------------------- 单色精灵相关 -------------------
        // 设置颜色
        this.singleSprite._color = Color.RED.clone();
        // 设置触摸事件
        this.singleSprite.node.on(Node.EventType.TOUCH_END, this.onSingleClick, this);
        //------------------- 精灵图集相关 -------------------
        // 编译器更换图片
        this.frameSprite.spriteFrame = this.frameName;

        // 动态更换图片相关
        this.dynamicChangeSpriteFrame();
    }

    /*
    动态更换图片相关
    1. 动态更换图片要将资源添加到resources目录中， 使用接口为: resources.load
    2. 路径使用，要添加指定的文件类型，比如spriteFrame, texture, 否则生成的时候ImageAsset
    */
    dynamicChangeSpriteFrame() {
        let sprite_3 = this.frameSprite;
        // ------------------------- 更换图片 -------------------------
        // 方式1: 使用imageAsset后调用createWithImage更换
        let assertUrl = "image/PurpleMonster";
        resources.load(assertUrl, ImageAsset, (err, imageAsset) => {
            if (err) {
                console.log("ImageAssert load failed");
                console.log(err);
                return;
            }
            // 通过createWithImage可以将ImageAssert创建为SpriteFrame
            sprite_3.spriteFrame = SpriteFrame.createWithImage(imageAsset);
        });

        // 方式2: 使用imageAsset后调用new来更换
        resources.load(assertUrl, ImageAsset, (err, imageAsset) => {
            if (err) {
                console.log("ImageAssert load failed");
                console.log(err);
                return;
            }
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D(); 
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            sprite_3.spriteFrame = spriteFrame;
        });


        // 方式3: 设定指定的精灵帧
        let frameUrl = "image/PurpleMonster/spriteFrame";
        resources.load(frameUrl, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log("SpriteFrame load failed");
                console.log(err);
                return;
            }
            // 通过createWithImage可以将ImageAssert创建为SpriteFrame
            sprite_3.spriteFrame = spriteFrame;
        });

        // ------------------------- 从图集中更换图片 -------------------------
        // 首先读取精灵帧图集，然后从图集中获取指定的精灵帧
        let sprite_frame = this.frameSprite;
        resources.load("image/emoji", SpriteAtlas, (err:any, atlas) => {
            if (err) {
                console.log("SpriteAtlas load failed");
                console.log(err);
                return;
            }
            const spriteFrame = atlas.getSpriteFrame("emoji3");
            sprite_frame.spriteFrame = spriteFrame;
        });
    }

    update(deltaTime: number) {
        this._range += 0.1 * deltaTime;
        if (this._range > 1) {
            this._range = 0;
        }
        this.fillSprite.fillRange = this._range;
    }

    onSingleClick() {
        console.log("点击了单色精灵");
    }
}

