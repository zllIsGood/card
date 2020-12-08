/* 怪物实体
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 15:34:36 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 18:29:53
 */
class CharMonster extends eui.ItemRenderer {

    private lab: eui.Label;
    private card: eui.Group
    private dieImg: eui.Image
    public monsterBase: MonsterBase
    data: { pos: number, name: string, life: number, curlife: number, attack: number, id: number, lv: number }
    private hasDieSkill: boolean = false
    isAD: boolean //物理or法术
    isBottom = true
    buffEff = {} as any
    public constructor() {
        super();
        this.skinName = "CharMonsterSkin";

        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.anchorOffsetX = 50
        this.anchorOffsetY = 100
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }


    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
    }

    protected dataChanged() {
        this.isBottom = this.data.pos <= 6
        this.monsterBase.upHp(this.data.curlife)
        this.monsterBase.upDamage(this.data.attack)
    }

    public setHasDieSkill(bool: boolean) {
        this.hasDieSkill = bool
    }

    public async harmHp(harm: number, canDie = true) {
        this.data.curlife -= harm
        this.monsterBase.upHp(this.data.curlife)
        if (canDie && this.data.curlife <= 0 && !this.hasDieSkill) {
            await TimerManager.ins().deleyPromisse(200)
            this.showAction(MonsterActionType.die)
        }
    }
    /**请在战斗结束后用 是否死亡*/
    public isDie() {
        return this.data.curlife <= 0
    }

    public upDamage(num: number) {
        this.data.attack += num
        this.monsterBase.upDamage(this.data.attack)
    }

    public showAction(type: MonsterActionType) {
        this.retCard()
        let tw = egret.Tween.get(this.card)
        if (type == MonsterActionType.atk_ad || type == MonsterActionType.atk_ap) {
            if (this.isAD) {
                if (this.isBottom) {
                    this.card.rotation = 0
                    tw.to({ rotation: -30 }, 200).to({ rotation: 30 }, 100).to({ rotation: 0 }, 50)
                }
                else {
                    this.card.anchorOffsetX = 0
                    this.card.anchorOffsetY = 0
                    this.card.x = 0
                    this.card.y = 25
                    tw.to({ rotation: -20 }, 200).to({ rotation: 30 }, 100).to({ rotation: 0 }, 50)
                }
            }
            else {
                if (this.isBottom) {
                    this.card.anchorOffsetY = 150
                    this.card.y = 175
                    tw.to({ scaleX: 0.8, scaleY: 0.8 }, 200).to({ scaleX: 1, scaleY: 1 }, 50)
                }
                else {
                    this.card.anchorOffsetY = 0
                    this.card.y = 25
                    tw.to({ scaleX: 0.8, scaleY: 0.8 }, 200).to({ scaleX: 1, scaleY: 1 }, 50)
                }
            }
        }
        else if (type == MonsterActionType.attacked) { //被攻击
            if (this.isBottom) {
                // tw.to({ y: 100 + 20 }, 50).wait(50).to({ y: 100 }, 50)
                tw.to({ y: 100 + 20 }, 40).to({ y: 100 - 20 }, 80).to({ y: 100 + 10 }, 60).to({ y: 100 - 10 }, 40).to({ y: 100 + 5 }, 30).to({ y: 100 }, 15)
            }
            else {
                // tw.to({ y: 100 - 20 }, 50).wait(50).to({ y: 100 }, 50)
                tw.to({ y: 100 - 20 }, 40).to({ y: 100 + 20 }, 80).to({ y: 100 - 10 }, 60).to({ y: 100 + 10 }, 40).to({ y: 100 - 5 }, 30).to({ y: 100 }, 15)
            }
        }
        else if (type == MonsterActionType.dodge) { //闪避
            if (this.isBottom) {
                tw.to({ y: 100 + 50 }, 50).wait(300).to({ y: 100 }, 50)
            }
            else {
                tw.to({ y: 100 - 50 }, 50).wait(300).to({ y: 100 }, 50)
            }
        }
        else if (type == MonsterActionType.def) {
            return
        }
        else if (type == MonsterActionType.die) {
            tw.to({ scaleY: 1.3 }, 200).to({ alpha: 0 }, 200).wait(1).call(this.dieFun, this)
        }
        else if (type == MonsterActionType.move) {
            tw.to({ scaleX: 1.2, scaleY: 1.2 }, 200).wait(50).to({ scaleX: 1, scaleY: 1 }, 200)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 200).wait(50).to({ scaleX: 1, scaleY: 1 }, 200)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 200).wait(50).to({ scaleX: 1, scaleY: 1 }, 200)
        }
        else if (type == MonsterActionType.destroy) {
            tw.to({ y: 100 - 10, x: 50 - 20 }, 50).to({ y: 100 - 10, x: 50 + 20 }, 100)
                .to({ y: 100 - 10, x: 50 - 20 }, 100).to({ y: 100 - 10, x: 50 + 20 }, 100)
                .to({ y: 100, x: 50 }, 50)
        }
    }

    public hasBuff(skillStr: string) {
        return !!this.buffEff[skillStr]
    }
    public addBuff(skillStr: string, obj: DragonBonesManage) {
        if (!this.buffEff[skillStr]) {
            this.buffEff[skillStr] = obj
        }
    }

    public removeAllBuff() {
        for (let i in this.buffEff) {
            let item = this.buffEff[i]
            if (item instanceof MovieClip) {
                item.destroy()
            }
            else if (item instanceof DragonBonesManage) {

                item.remove()
            }
        }
        this.buffEff = {}
    }

    private retCard() {
        this.card.rotation = 0
        this.card.anchorOffsetX = 50
        this.card.anchorOffsetY = 75
        this.card.x = 50
        this.card.y = 100
        this.card.scaleX = 1
        this.card.scaleY = 1
        this.card.alpha = 1
        this.card.filters = null
    }

    private dieFun() {
        this.removeAllBuff()
        SoundManager.ins().playEffect("die_mp3", 1)
        ParticleController.ins().playParticle("newParticle", FightManager.ins().mapView._effTopLayer, 500, this.data.pos - 1)
        this.dieImg.visible = true
        this.card.visible = false
        this.retCard()
    }

    /**复活*/
    public revive() {
        this.dieImg.visible = false
        this.card.visible = true
        this.monsterBase.upHp(this.data.curlife)
    }

    public onClick() {
        let data = { id: this.data.id, level: this.data.lv, has: true, count: 0, fight: null }
        let fightData = FightModel.ins().fightData
        if (!FightManager.ins().isTest && fightData) {
            if (this.data.pos > 6) {
                data.fight = { zoomLv: fightData.matchInfo.userInfo.dan, zoomNum: fightData.matchInfo.userInfo.lv }
            }
            else {
                data.fight = { zoomLv: fightData.userInfo.userInfo.dan, zoomNum: fightData.userInfo.userInfo.lv }
            }
        }
        else { //test
            if (this.data.pos > 6) {
                data.fight = { zoomLv: ZoomLevel.Gold, zoomNum: 1 }
            }
            else {
                data.fight = { zoomLv: UserModel.ins().zoomLevel, zoomNum: UserModel.ins().zoomNum }
            }
        }
        ViewManager.ins().open(HeroInfoWin, data)
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

}