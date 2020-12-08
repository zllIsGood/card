/* 题目
 * @Author: gravitycat 
 * @Date: 2020-11-27 17:50:39 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-12-01 17:23:39
 */
class SubjectItem extends eui.ItemRenderer {
    btnA: BaseBtn;
    btnB: BaseBtn;
    lbTitle: eui.Label;
    lbCountDown: eui.BitmapLabel;
    imgLogo: eui.Image
    private _countdown = 9;
    groupLabel: eui.Group
    groupImg: eui.Group
    imgA: BaseBtn
    imgB: BaseBtn

    data: any
    public constructor() {
        super();
        this.skinName = "SubJectItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    private countdown() {
        if (this._countdown < 0) {
            this.lbCountDown.text = "9"
            TimerManager.ins().remove(this.countdown, this)
            QuestionModel.ins().updatePwBar()
            return
        }
        this.lbCountDown.text = (this._countdown--).toString()
    }
    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
    }

    private onclick(e: egret.TouchEvent) {
        TimerManager.ins().remove(this.countdown, this)
        let correct
        switch (e.target) {
            case this.btnA:
            case this.imgA:
                console.log('a click')
                correct = this.data.trueAnswer == option.A
                break;
            case this.btnB:
            case this.imgB:
                console.log('b click')
                correct = this.data.trueAnswer == option.B
                break;
        }

        let newpos = this.globalToLocal(e.stageX, e.stageY)
        this.imgLogo.x = Math.abs(newpos.x)
        this.imgLogo.y = Math.abs(newpos.y)
        this.imgLogo.scaleX = this.imgLogo.scaleY = 0.7
        if (correct) {
            this.imgLogo.source = "duihao_png"
        } else {
            this.imgLogo.source = "cuohao_png"
        }
        this.imgLogo.visible = true

        TimerManager.ins().setTimeOut(800, () => {
            QuestionModel.ins().updatePwBar(correct, 9 - this._countdown)
        }, this)

    }

    protected dataChanged() {
        if (this.data.qa == -1) {
            this.removeAllListener()
            this.groupLabel.visible = false
            this.groupImg.visible = false
            this.lbTitle.text = this.data.question
            this.imgLogo.visible = false
            this.lbCountDown.visible = false
            return
        }
        else if (this.data.qa == null && this.data.qb == null) {
            this.groupImg.visible = true
            this.groupLabel.visible = false
            this.imgA.icon = "aws" + this.data.qaimg + "_png"
            this.imgB.icon = "aws" + this.data.qbimg + "_png"
            this.imgA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
            this.imgB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
        }
        else {
            this.groupImg.visible = false
            this.groupLabel.visible = true
        }
        this.imgLogo.visible = false
        this._countdown = 9
        TimerManager.ins().doTimer(1000, 11, this.countdown, this)
        this.lbTitle.text = this.data.question

        this.retBtn()
        this.btnA.label = this.data.qa
        this.btnB.label = this.data.qb
    }
    private retBtn() {
        this.groupLabel.removeChildren()
        if (this.btnA) {
            this.btnA.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
            this.btnA = null
        }
        if (this.btnB) {
            this.btnB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
            this.btnB = null
        }

        this.btnA = new BaseBtn()
        this.btnA.icon = 'selectbtn_png'
        this.btnA.labelColor = '0xb7542d'
        this.btnA.skinName = 'BaseBtn5Skin'
        this.groupLabel.addChild(this.btnA)
        this.btnA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)

        this.btnB = new BaseBtn()
        this.btnB.icon = 'selectbtn_png'
        this.btnB.labelColor = '0xb7542d'
        this.btnB.skinName = 'BaseBtn5Skin'
        this.groupLabel.addChild(this.btnB)
        this.btnB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
    }

    private removeAllListener() {
        this.imgA.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
        this.imgB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.btnA.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
        this.btnB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this)
        TimerManager.ins().remove(this.countdown, this)
    }

    public close(...param: any[]): void {
        this.removeAllListener()
    }
}