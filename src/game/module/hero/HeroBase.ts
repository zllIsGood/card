/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-29 15:53:57 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-14 11:44:07
 */
class HeroBase extends eui.ItemRenderer {
    img1: eui.Image
    img2: eui.Image

    data: { heroId: number, has: boolean }
    public constructor() {
        super();
        this.skinName = "HeroBaseSkin";
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
        if (!this.data || this.data.heroId == null) {
            return
        }
        let cfg = GlobalConfig.getMonsterCfg()[this.data.heroId]
        this.img1.source = cfg.img /*+ '_png'*/
        this.img2.source = cardFrame[cfg.cardFrame]
        if (this.data.has) {
            this.img1.filters = null
        }
        else {
            let colorFlilter = new egret.ColorMatrixFilter(ColorUtil.getMatGray())
            this.img1.filters = [colorFlilter]
        }
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

}