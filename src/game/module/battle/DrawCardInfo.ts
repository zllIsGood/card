/* 奖励卡牌信息
 * @Author: gravitycat 
 * @Date: 2020-10-20 14:45:54 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-21 14:07:50
 */
class DrawCardInfo extends eui.ItemRenderer {
    public constructor() {
        super();
        this.skinName = "DrawCardSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.img_card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this)
    }
    img_card: eui.Image
    lab_count: eui.Label
    hero: HeroInfoBase
    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
    }

    public close(...param: any[]): void {
        this.img_card.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this)
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    private click(e: egret.TouchEvent) {
        egret.Tween.get(this.img_card).to({ scaleX: 0 }, 300, egret.Ease.sineOut).call(() => {
            this.img_card.visible = false
            this.hero.visible = true

        })
            .to({ scaleX: 1 }, 300, egret.Ease.sineIn);
    }
    protected dataChanged() {
        this.lab_count.text = "x" + this.data.count
        this.hero.data = { id: this.data.id, has: true, count: this.data.count, level: 1 }
    }
}