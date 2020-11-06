/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-30 14:56:47 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-14 12:25:00
 */
class HeroInfoBase extends eui.ItemRenderer {
    img1: eui.Image
    img2: eui.Image
    atkLab: eui.BitmapLabel
    hpLab: eui.BitmapLabel
    lvLab: eui.BitmapLabel

    data: { id: number, has: boolean, level?: number, count?: number }
    public constructor() {
        super();
        this.skinName = "HeroInfoBaseSkin";
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
        let cfg = GlobalConfig.getMonsterCfg()[this.data.id]
        this.img1.source = cfg.img /*+ '_png'*/
        this.img2.source = cardFrameMini[cfg.cardFrame]

        let level = this.data.level
        if (!this.data.has) {
            level = cfg.minLv// 1
        }
        this.hpLab.text = GlobalConfig.getMonsterHp(this.data.id, level)
        this.atkLab.text = GlobalConfig.getMonsterAttack(this.data.id, level)
        this.lvLab.text = String(level)
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

}