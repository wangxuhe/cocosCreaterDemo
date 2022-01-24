
import { _decorator, Component, Node, PageView, Button, Label, Prefab, instantiate, Vec3, Color, Sprite } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('uiScene_pageView')
export class uiScene_pageView extends Component {    
    @property(PageView)
    public pageView: PageView = null;          // pageView组件
    @property(Prefab)
    public pageTmp: Prefab = null;              // page模版
    @property(Label)
    public indexLabel: Label = null;            // 索引文本

    private _curPageIndex: number = 0;          // 当前页面索引
    private _totalNum: number = 0;              // 最大页面数目
    onLoad() {
        // 设置当前页面索引
        this.pageView.setCurrentPageIndex(0);

        // 获取页面最大数目
        this._totalNum = this.pageView.getPages().length;
        console.log("pageView totalNum:", this._totalNum);
    }

    update() {
        // 更新页面索引
        let curIndex = this.pageView.getCurrentPageIndex() + 1;
        let totalNum = this.pageView.getPages().length;
        this.indexLabel.string = `第${curIndex}/${totalNum}页`
    }

    private _createPage() {
        const page = instantiate(this.pageTmp) as Node;
        page.name = `page_${this._curPageIndex + 1}`
        page.setPosition(new Vec3());
        const color = new Color();
        color.r = Math.floor(Math.random() * 255);
        color.g = Math.floor(Math.random() * 255);
        color.b = Math.floor(Math.random() * 255);
        const comp = page.getComponent(Sprite);
        comp.color = color;

        return page;
    }

    // pageView事件(UI编译器中设定)
    pageEvent(event: Event, eventType:string) {
        console.log("pageView eventType:", eventType);
    }

    // 滚动指定位置(UI编译器中设定)
    clickReturnEvent(event: Event, customEvetData: string) {
        /*
        滚动到指定的页面,参数有：
        idx： 页面索引
        timeInSecond: 滚动的秒数， 默认为空
        */
        this.pageView.scrollToPage(0);
        this._curPageIndex = this.pageView.getCurrentPageIndex();
        console.log("当前页面索引:", this._curPageIndex);
    }

    // 末尾插入页面事件(UI编译器中设定)
    clickAddEvent(event: Event, customEvetData: string) {
        let newPage = this._createPage();
        // 在当前页面视图的尾部加入一个新的page
        this.pageView.addPage(newPage);
    }

    // 插入指定索引页面(UI编译器中设定)
    clickInsertEvent(event: Event, customEvetData: string) {
        let curIndex = this.pageView.getCurrentPageIndex();
        let newPage = this._createPage();
        // 将page插入到指定位置的页面
        this.pageView.insertPage(newPage, curIndex);
    }

    // 删除最后页面(UI编译器中设定)
    clickReduceEvent(event: Event, customEvetData: string) {
        let pages = this.pageView.getPages();
        // 获取最后一个page
        let lastPage = pages[pages.length - 1];
        // 移除指定的page
        this.pageView.removePage(lastPage);
    }

    //删除指定页面(UI编译器中设定)
    clickDeleteEvent(event: Event, customEvetData: string) {
        let curIndex = this.pageView.getCurrentPageIndex();
        // 移除指定页面的page
        this.pageView.removePageAtIndex(curIndex);
    }

    //清空所有(UI编译器中设定)
    clickClearEvent(event: Event, customEvetData: string) {
        this.pageView.removeAllPages();
    }
}

