/* 成长线
 * @Author: zhoulanglang 
 * @Date: 2020-10-19 16:20:13 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-20 16:19:47
 */
class TaskWin extends BaseEuiView {

    private retBtn: BaseBtn
    grp: eui.Group
    lineGrp: eui.Group
    zoomGrp: eui.Group
    honorBar: eui.Image

    public constructor() {
        super();
        this.skinName = 'TaskSkin'
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.retBtn, this.onClick);

        this.upView()
    }

    private upView() {
        let y = 50
        for (let i = 0; i < 3; i++) {
            let obj = new TaskItem1()
            obj.x = 180
            obj.y = y
            this.grp.addChild(obj)
            y += 252 + 20
        }
        let obj = new TaskItem2()
        obj.x = 180
        obj.y = y
        this.grp.addChild(obj)

        y += 776 + 80 + 250
        this.grp.height = y
    }


    public close(...param: any[]): void {

    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.retBtn:
                ViewManager.ins().close(this)
                break;
        }
    }
}
ViewManager.ins().reg(TaskWin, LayerManager.UI_Popup);