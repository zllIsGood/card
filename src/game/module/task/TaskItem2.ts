/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-20 12:00:27 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-20 14:23:50
 */
class TaskItem2 extends eui.ItemRenderer {
    img1: eui.Image
    img2: eui.Image
    lab1: eui.Label
    lab2: eui.Label
    list: eui.List
    grp: eui.Group
    btn: BaseBtn
    starGrp: eui.Group

    data: {}
    public constructor() {
        super();
        this.skinName = "TaskItem2Skin";
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

        let star = 1
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