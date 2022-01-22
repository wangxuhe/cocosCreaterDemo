
import { _decorator, Component, Node, Label, Button, LabelOutline, LabelShadow } from 'cc';
const { ccclass, property, help} = _decorator;

// 文本内容的拓展相关， 可修改文本的锚点即可
 
@ccclass('uiScene_text')
@help("https://docs.cocos.com/creator/3.3/manual/zh/ui-system/components/editor/label.html")
export class uiScene_text extends Component {
    
    start () {
        // 获取所有节点
        // 子节点的数目仅限于根节点下的子节点， 不包含子节点内的子节点相关
        let children = this.node.children;
        let childCount = children.length;
        console.log("children Count:", childCount);

        // 获取标题文本
        let prefabRoot = this.node.getChildByName("root");
        let titleText = prefabRoot.getComponentInChildren(Label);
        titleText.string = "文本Demo"

        /*
        文本属性的获取
        1. 获取根节点下指定的子节点Node
        2. 根据子节点获取节点内的组件相关
        */

        // 通过名称获取子节点node
        let labelNode_1 = this.node.getChildByName('Label_1');
        // 通过node节点获取指定的文本组件
        let label_1 = labelNode_1.getComponent(Label);
        label_1.string = "通过getChildByName获取第一行文本Node";

        // 获取路径获取子节点node
        let labelNode_2 = this.node.getChildByPath("Label_2");
        let label_2 = labelNode_2.getComponent(Label);
        label_2.string = "通过getChildByPath获取第二行文本Node， 然后node调用getComponet(Label)获取文本组件"
    
        // 通过uuid获取文本相关
        let labelNode_3 = this.node.getChildByUuid("977Sa+Q5hDyrQ1bl7Ve5m5");
        let label_3 = labelNode_3.getComponent(Label);
        label_3.string = "通过getChildByUuid获取第三行文本";

        // 描边和阴影文本相关
        let labelNode_4 = this.node.getChildByName("Label_4");
        // 设置描边属性
        let outLineComp = labelNode_4.getComponent(LabelOutline);
        outLineComp.enabled = true;
        // 设置阴影属性
        let shadowComp = labelNode_4.getComponent(LabelShadow);
        shadowComp.enabled = false;
    }
}

