
import { _decorator, Component, Node, ScrollView, Label, Button, Vec3, Vec2, UITransform, instantiate, error, CCInteger, director } from "cc";

// ccclass 主要用来修饰Component组件
// executeInEditMode 允许当前组件再编译器模式下运行，默认为false
// requireComponent 用于指定当前组件的依赖组件，默认为null
// executionOrder 用来指定脚本生命周期回调的执行优先级， 小于0的优先执行，大于0的最后执行
// disallowMultiple 同一个节点上只允许添加一个同类型(含子类的组件)， 默认为false 
// menu 会将当前组件添加到组件菜单中，方便用户查找
// help 当前组件的帮助文档的url， 设置完成后属性检查器会出现一个帮助的图标
const { ccclass, property, menu, help} = _decorator;

const _temp_vec3 = new Vec3();

@ccclass('Main')
@menu("scripts/main")
@help("https://docs.cocos.com/creator/3.3/manual/zh/scripting/decorator.html")
export class Main extends Component {
    @property({type: ScrollView, tooltip: "滚动容器节点"})
    public scrollView: ScrollView  = null!;
    @property(Button)
    public btnExit: Button  = null!

    onLoad() {
        this.btnExit.node.on(Button.EventType.CLICK, this.onExitEvent, this);

        this.scrollView.node.on(ScrollView.EventType.SCROLL_TO_BOTTOM, this.scrollToBottomEvent, this);
        this.scrollView.node.on(ScrollView.EventType.SCROLL_TO_TOP, this.scrollToTopEvent, this);
        this.scrollView.node.on(ScrollView.EventType.BOUNCE_BOTTOM, this.scrollBottomEvent, this);
        this.scrollView.node.on(ScrollView.EventType.BOUNCE_TOP, this.scrollBounceEvent, this);
    }

    start() {
        // 
    }

    clickItemEvent(event: Button, index:any) 
    {
        if(index == 0) {
            director.loadScene("UI/UIScene");
        }
        else{
            console.log("您点击的索引是:", index);
        }
    }


    scrollToBottomEvent() {
        console.log("scrollToBottomEvent....")
    }

    scrollToTopEvent() {
        console.log("scrollToTopEvent....")
    }

    scrollBottomEvent() {
        console.log("scrollBottomEvent....")
    }

    scrollBounceEvent() {
        console.log("scrollBounceEvent....")
    }
    
    onExitEvent() {
        console.log("您点击了退出按钮")
        director.end();
    }
}
