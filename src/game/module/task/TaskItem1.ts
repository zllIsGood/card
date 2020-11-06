/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-20 12:00:27 
 * @Last Modified by: zll
 * @Last Modified time: 2020-10-21 16:40:16
 */
class TaskItem1 extends eui.ItemRenderer {
    img1: eui.Image
    img2: eui.Image
    starGrp: eui.Group
    btn: BaseBtn

    data: {}
    public constructor() {
        super();
        this.skinName = "TaskItem1Skin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
    }

    protected dataChanged() {
        if (!this.data) {
            return
        }

        let star = 4
        for (let i = 1; i < this.starGrp.numChildren; i++) {
            let obj = this.starGrp.getChildAt(i) as eui.Image
            if (obj) {
                obj.source = star >= i ? 'task_star1_png' : 'task_star2_png'
            }
        }
    }

    public onClick(e: egret.TouchEvent) {

    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

}