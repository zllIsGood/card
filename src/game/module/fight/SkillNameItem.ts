/*
 * @Author: zhoulanglang 
 * @Date: 2020-11-28 11:25:16 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-11-28 15:32:14
 */
class SkillNameItem extends eui.ItemRenderer {
    img: eui.Image
    grp: eui.Group
    sgrp: eui.Group
    data: { skillId: number, index: number, zoom: number, pos?: number }
    public constructor() {
        super();
        this.skinName = "SkillNameItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.grp.mask = new egret.Rectangle(0, 0 - 65, 186, 184)
    }

    protected dataChanged() {
        if (!this.data) {
            return
        }
        this.img.source = this.data.pos == -1 ? 'question_tx_chouqujineng_png' : 'question_tx_chouqujineng2_png'
        let icons = QuestionConst.getIcons(this.data.zoom)
        this.grp.removeChildren()
        let maxH = 65 * (icons.length - 1)
        for (let i = 0; i < icons.length; i++) {
            let img = new eui.Image()
            img.source = icons[i]
            let y = 65 * i
            y = y >= maxH ? y - maxH : y
            img.y = y
            img.horizontalCenter = 0
            this.grp.addChild(img)
        }
    }

    private twn = 0
    private isTw = false
    private temp: { r: number, icons: string[], h: number, nh }
    public playTw() {
        this.sgrp.alpha = 1
        this.twn = 0
        let icons = QuestionConst.getIcons(this.data.zoom)
        let r = MathUtils.limitInteger(4, 5)
        let h = 65 * (icons.length)
        let nh = 65 * (this.data.index)
        this.temp = { r: r, icons: icons, h: h, nh: nh }
        let tw = egret.Tween.get(this, { loop: false, onChange: this.onChange, onChangeObj: this })
        this.isTw = true
        tw.to({ twn: 1 }, 2500).call(() => {
            TimerManager.ins().doTimer(500, 1, this.tw2, this)
        }, this)
    }

    tw2() {
        let child = this.grp.getChildAt(this.data.index) as eui.Image
        if (!child) {
            return
        }
        let hor = child.x + child.width / 2 + this.grp.x - this.width / 2
        let ver = child.y + child.height / 2 + this.grp.y - this.height / 2
        this.addChild(child)
        child.horizontalCenter = hor
        child.verticalCenter = ver
        let tw = egret.Tween.get(this.sgrp)
        tw.to({ alpha: 0 }, 500).call(() => {
            let tw2 = egret.Tween.get(child)
            tw2.to({ scaleX: 2, scaleY: 2 }, 500).call(this.clearTw, this)
        }, this)

    }
    private clearTw() {
        this.isTw = false
        DisplayUtils.removeFromParent(this)
    }

    private onChange() {
        if (!this.isTw) {
            return
        }
        let temp = this.temp
        let n = temp.r + 1
        let dy: number
        let dindex = 1 / (temp.r * temp.icons.length + this.data.index)
        let ddd = this.twn - temp.r * temp.icons.length * dindex
        if (ddd > 0) {
            let dn = this.data.index == 0 ? 0 : ddd / (temp.icons.length * dindex)
            dy = temp.h * dn
        }
        else {
            let i = 0
            let bool = true
            while (bool) {
                let ddd = this.twn - i * temp.icons.length * dindex
                if (ddd >= 0) {
                    i++
                }
                else {
                    i--
                    bool = false
                }
            }
            let dn = this.twn - i * temp.icons.length * dindex
            dn = dn == 0 ? 0 : dn / (temp.icons.length * dindex)
            dy = temp.h * dn
        }
        for (let i = 0; i < temp.icons.length; i++) {
            let child = this.grp.getChildAt(i) as eui.Image
            let y = Math.floor(-dy + (i == temp.icons.length - 1 ? -1 : i) * 65)
            y = y < -65 * 2 ? (y + temp.h) : y
            child.y = y
        }
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.grp.mask = null
        this.grp.removeChildren()
        egret.Tween.removeTweens(this)
        egret.Tween.removeTweens(this.sgrp)
    }

}