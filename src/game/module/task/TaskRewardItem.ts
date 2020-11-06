/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-19 17:49:59 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 17:56:49
 */
class TaskRewardItem extends eui.ItemRenderer {
    img1: eui.Image
    img2: eui.Image
    lab1: eui.Label
    lab2: eui.Label

    data: {}
    public constructor() {
        super();
        this.skinName = "TaskRewardItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
    }

    protected dataChanged() {
        if (!this.data) {
            return
        }

    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

}