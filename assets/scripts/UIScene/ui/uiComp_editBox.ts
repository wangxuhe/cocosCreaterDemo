
import { _decorator, Component, Node, EditBox } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('uiComp_editBox')
export class uiComp_editBox extends Component {

    onLoad() {
        this.node.on(EditBox.EventType.EDITING_DID_BEGAN, this.onBeganEvent, this);
        this.node.on(EditBox.EventType.TEXT_CHANGED, this.onChangeEvent, this);
        this.node.on(EditBox.EventType.EDITING_RETURN, this.onReturnEvent, this);
        this.node.on(EditBox.EventType.EDITING_DID_ENDED, this.onEndEvent, this);

        
        this._initEditBox();
    }

    private _initEditBox() {
        let editBox = this.node.getComponent(EditBox);
        // 设置占位符文本
        editBox.placeholder = "Please Input content..."
        /*
        设置输入标识，共有如下几种：
        PASSWORD                        // 密码
        SENSITIVE                       // 敏感性数据
        INITIAL_CAPS_WORD               // 每一个单词的首字母大写
        INITIAL_CAPS_SENTENCE           // 每个句子的首字母大写
        INITIAL_CAPS_ALL_CHARACTERS     // 所有字符大写
        DEFAULT                         // 默认
        */
        editBox.inputFlag = EditBox.InputFlag.DEFAULT;
        /*
        设置输入模式
        ANY                             // 任意文本
        EMAIL_ADDR                      // 邮件地址
        NUMERIC                         // 数字
        PHONE_NUMBER                    // 电话号码
        URL                             // url地址
        DECIMAL                         // 实数
        SINGLE_LINE                     // 除了换行符以外，用户可以输入任何文本
        */
        editBox.inputMode = EditBox.InputMode.ANY;
        // 设置输入字符的最大个数(单个汉字或字符均为1)
        editBox.maxLength = 10;
        /*
        设置移动设备上回车按钮的样式
        DEFAULT                         // 默认
        DONE                            // 完成
        SEND                            // 发送
        SEARCH                          // 搜索
        GO                              // 前往
        NEXT                            // 下一个
        */
        editBox.returnType = EditBox.KeyboardReturnType.DEFAULT;

    }

    onBeganEvent(editBox: EditBox) {
        console.log("Edit Box began...");
    }

    onChangeEvent(editBox: EditBox) {
        console.log("Edit Box change...");
    }

    onReturnEvent(editBox: EditBox) {
        console.log("Edit Box return...");
    }

    onEndEvent(editBox: EditBox) {
        console.log("Edit Box end...");
    }
}
