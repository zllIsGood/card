/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-28 15:54:54 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-15 11:19:02
 */
class HeroItem extends eui.ItemRenderer {
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
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

    private callFun: Function
    public setCallBack(callFun: Function) {
        this.callFun = callFun
    }

    public onClick(e: egret.TouchEvent) {
        if (!this.data.has) {
            let data = { id: this.data.heroId, level: this.data.level, has: this.data.has, count: this.data.count }
            ViewManager.ins().open(HeroInfoWin, data)
            return
        }
        let tar = e.target as egret.DisplayObject
        if (tar == this.infoBtn) {
            let data = { id: this.data.heroId, level: this.data.level, has: this.data.has, count: this.data.count }
            ViewManager.ins().open(HeroInfoWin, data)
            return
        }
        if (tar == this.removeBtn) {
            if (UserModel.ins().listMat && UserModel.ins().listMat.length == 1) {
                return wx.showToast({ icon: 'none', title: `至少要有1个上阵` })
            }
            this.currentState = 'normal'
            UserModel.ins().matRemove(this.data.fightPos)
            return
        }
        if (tar == this.useBtn) {
            this.currentState = 'normal'
            UserModel.ins().matUse(this.data.heroId)
            return
        }
        let state = this.currentState
        if (state == 'normal') {
            this.currentState = this.data.fightPos != null ? 'remove' : 'use'
            if (this.callFun) {
                this.data.fightPos != null ?
                    this.callFun({ isTap: true, pos: this.data.fightPos }) :
                    this.callFun({ isTap: true, item: this })
            }
        }
        else {
            this.currentState = 'normal'
            if (this.callFun) {
                this.data.fightPos != null ?
                    this.callFun({ isTap: false, pos: this.data.fightPos }) :
                    this.callFun({ isTap: false })
            }
        }
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.callFun = null
    }

}