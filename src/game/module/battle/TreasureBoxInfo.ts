/* 奖励
 * @Author: gravitycat 
 * @Date: 2020-10-10 17:53:19 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-20 18:40:24
 */
class TreasureBoxInfo extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "TreasureBoxSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this)

    }

    private countdown() {
        if (this.data.seconds == 0) {
            this.tex_timestamp.text = "点击打开"
            this.img_bgsource.source = boxState[3]
            this.img_boxsource.source = boxTypeOpen[this.boxType]
            this.canopen = true
            TimerManager.ins().remove(this.countdown, this)
            return
        }
        else if (this.data.boxstate == 1) {
            //未解锁
            this.tex_timestamp.text = "点击解锁"
            this.usetimeFormat = DateUtils.getFormatBySecond(this.data.seconds, DateUtils.TIME_FORMAT_9)
            return
        }
        this.tex_timestamp.text = DateUtils.getFormatBySecond(this.data.seconds--, DateUtils.TIME_FORMAT_9)
        TimerManager.ins().doTimer(1000, 0, this.countdown, this)
    }
    img_bgsource: eui.Image
    tex_timestamp: eui.Label
    img_boxsource: eui.Image
    id: number
    boxType: number
    usetimeFormat: string
    canopen: boolean = false
    private click() {
        if (this.data == null) return
        if (this.data.boxstate == 1) {
            let param = { usetime: this.usetimeFormat, boxtype: this.boxType, id: this.id, cardcount: this.data.cardNum }
            ViewManager.ins().open(UnLockBoxWin, param)
            return
        }
        if (this.data.boxstate == 2) {
            wx.showToast({ icon: 'none', title: '解锁中，请耐心等候噢~', duration: 500 })
            //TipModel.ins().show({ icon: "", title: "尚未解锁，无法打开", duration: 500 })
            return
        }
        // ViewManager.ins().open(BoxRewardWin)
        TreasureModel.ins().drawTreasureBox(this.id).then(() => {
            ViewManager.ins().open(BoxRewardWin)
        })

    }
    //data: { labelbox: string, boxsource: string, lockbgsource: string, canopen: boolean }
    //public canopen = false
    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        //this.canopen = this.data.canopen
        EffectUtiles.startFlash(this.img_boxsource, 0x00BFFF, 1000)
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
    }

    public close(...param: any[]): void {
        TimerManager.ins().remove(this.countdown, this)
        EffectUtiles.stopFlash(this.img_boxsource)
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this)
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    protected dataChanged() {
        let data = this.data
        if (data == null) {
            this.img_bgsource.source = "icon_nonebox_png"
            return
        }
        this.id = this.data.id
        this.boxType = this.data.boxsource
        this.img_bgsource.source = this.data.lockbgsource
        this.img_boxsource.source = boxType[this.boxType]
        this.countdown()
    }
}