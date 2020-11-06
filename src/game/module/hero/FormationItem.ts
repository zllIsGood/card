/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-15 11:02:06 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-15 11:23:18
 */
class FormationItem extends eui.ItemRenderer {
    lvLab: eui.Label
    bar: eui.ProgressBar
    barGrp: eui.Group
    heroBase: HeroBase
    rectBg: eui.Rect
    starImg: eui.Image
    infoBtn: BaseBtn
    removeBtn: BaseBtn
    useBtn: BaseBtn
    //fightPos 是布阵中的序号 1-6
    data: { heroId: number, has: boolean, level?: number, count?: number, fightPos?: number }
    public constructor() {
        super();
        this.skinName = "HeroItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this)
    }

    protected dataChanged() {
        if (!this.data || this.data.heroId == null) {
            return
        }
        let data = this.data
        this.currentState = 'normal'

        this.heroBase.data = { heroId: data.heroId, has: data.has }
        let cfg = GlobalConfig.getMonsterCfg()[data.heroId]
        let star = cfg.quality
        this.starImg.source = `star${star}_png`

        if (!data.has) {
            this.lvLab.visible = false
            this.barGrp.visible = false
            this.rectBg.visible = false
            return
        }
        this.lvLab.visible = true
        this.barGrp.visible = true
        this.rectBg.visible = true

        this.lvLab.text = data.level + '级'

        let str = cfg.upgradeNum
        if (str[data.level]) {
            let needCount = Number(str[data.level])
            this.bar.maximum = needCount
            this.bar.value = data.count
            this.barGrp.visible = true
            this.rectBg.visible = true
        }
        else {
            this.barGrp.visible = false
            this.rectBg.visible = false
        }

    }

    private _touchStatus = false
    private touchXY: { x, y }
    private mouseDown(evt: egret.TouchEvent) {
        // console.log("Mouse Down.")
        this._touchStatus = true
        this.touchXY = { x: evt.stageX, y: evt.stageY }
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this)
        let parent = this.parent
        if (parent) {
            parent.addChildAt(this, parent.numChildren)
        }
    }

    private mouseMove(evt: egret.TouchEvent) {
        if (this._touchStatus) {
            // console.log("moving now ! Mouse: [X:" + evt.stageX + ",Y:" + evt.stageY + "]")
            this.x += evt.stageX - this.touchXY.x
            this.y += evt.stageY - this.touchXY.y
            this.touchXY = { x: evt.stageX, y: evt.stageY }
        }
    }

    private mouseUp(evt: egret.TouchEvent) {
        // console.log("Mouse Up.")
        this._touchStatus = false;
        this.touchXY = null
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this)
        if (this.callFun) {
            this.callFun({ x: this.x, y: this.y, pos: this.data.fightPos })
        }
    }

    private callFun: Function
    public setCallBack(callFun: Function) {
        this.callFun = callFun
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this)
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this)
        this.callFun = null
    }

}