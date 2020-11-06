/* 卡面
 * @Author: zhoulanglang 
 * @Date: 2020-09-10 10:26:14 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-14 12:29:12
 */
class MonsterBase extends eui.ItemRenderer {
    img1: eui.Image
    img2: eui.Image
    img3: eui.Image
    atkLab: eui.BitmapLabel
    hpLab: eui.BitmapLabel
    lvLab: eui.BitmapLabel
    starImg: eui.Image

    data: { role: string, race: number, lv: number, star: number }
    imgs = ['lv_iocn_lq1_png', 'lv_icon_hhq2_png', 'lv_icon_ld3_png', 'lv_icon_hq4_png']
    public constructor() {
        super();
        this.skinName = "MonsterBaseSkin";
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
        this.img1.source = this.data.role
        this.img2.source = cardFrameNew[this.data.race]
        this.img3.source = this.imgs[this.data.race - 1]
        this.lvLab.text = this.data.lv.toString()

        let star = this.data.star
        this.starImg.source = `star${star}_png`
    }

    public upHp(num: number) {
        this.hpLab.text = num.toString()
    }

    public upDamage(num: number) {
        this.atkLab.text = num.toString()
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

}