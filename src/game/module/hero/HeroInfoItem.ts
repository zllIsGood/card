/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-10 10:50:46 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-12 15:17:56
 */
class HeroInfoItem extends eui.ItemRenderer {
    lab0: eui.Label
    lab1: eui.Label
    lab2: eui.Label
    img: eui.Image
    img2: eui.Image
    rec: eui.Rect

    data: { skillId: number, type: number, lv: number, fight?: { zoomLv, zoomNum } }
    public constructor() {
        super();
        this.skinName = "HeroInfoItemSkin";
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
        let data = this.data

        let cfg = GlobalConfig.getSkillCfg(data.skillId)
        this.img.source = SKILLICON[cfg.skillIcon - 1]
        this.lab0.text = cfg.name
        this.lab1.text = cfg.text
        this.rec.visible = false
        this.img2.visible = false
        this.lab2.visible = false

        let zoomLv = data.fight ? data.fight.zoomLv : null
        let zoomNum = data.fight ? data.fight.zoomNum : null
        if (data.type == 1) {
            //
        }
        else if (data.type == 2) {
            if (data.lv < UserConst.skill2Lv) {
                this.lab2.visible = true
                this.lab2.text = UserConst.skill2Lv + '级解锁'
                this.rec.visible = true
                this.img2.visible = true
            }
            else if (!UserModel.ins().isZoomOK2(zoomLv, zoomNum)) {
                this.lab2.visible = true
                this.lab2.text = UserConst.skill2ZoomText()
            }
        }
        else if (data.type == 3) {
            if (data.lv < UserConst.skill3Lv) {
                this.lab2.visible = true
                this.lab2.text = UserConst.skill3Lv + '级解锁'
                this.rec.visible = true
                this.img2.visible = true
            }
            else if (!UserModel.ins().isZoomOK3(zoomLv, zoomNum)) {
                this.lab2.visible = true
                this.lab2.text = UserConst.skill3ZoomText()
            }
        }
    }


    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

}