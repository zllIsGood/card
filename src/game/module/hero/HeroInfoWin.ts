/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-30 15:07:03 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-14 12:25:16
 */
class HeroInfoWin extends BaseEuiView {
    closeBtn: BaseBtn
    retBtn: BaseBtn
    infoBase: HeroInfoBase
    barGrp: eui.Group
    bar: eui.ProgressBar
    barLab: eui.Label
    nameLab: eui.Label
    protoLab0: eui.Label
    protoLab1: eui.Label
    protoLab2: eui.Label
    upgradeGrp: eui.Group
    goldLab: eui.Label
    list: eui.List
    hasImg: eui.Image
    starImg: eui.Image
    //fight-战斗中展示的
    data: { id: number, has: boolean, level?: number, count?: number, fight?: { zoomLv, zoomNum } }
    public constructor() {
        super();
        this.skinName = 'HeroInfoSkin'
        this.list.itemRenderer = HeroInfoItem
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.retBtn, this.onClick);
        this.addTouchEvent(this.upgradeGrp, this.onClick);

        this.data = param[0]
        this.upView()
    }

    private upView() {
        let data = this.data
        this.infoBase.data = data
        let cfg = GlobalConfig.getMonsterCfg()[data.id]
        let star = cfg.quality
        this.starImg.source = `star${star}_png`

        let level = data.level
        if (data.has) {
            this.hasImg.visible = false
            this.barLab.visible = false
            this.bar.labelDisplay.visible = true
            this.bar.value = data.count
            let maxcount = cfg.upgradeNum[data.level - 1 + 1]
            if (data.level >= UserConst.maxLevel) {
                this.bar.maximum = data.count
                this.bar.labelDisplay.visible = false
            }
            else {
                this.bar.maximum = maxcount
            }
        }
        else {
            this.hasImg.visible = true
            level = cfg.minLv//1
            this.barLab.visible = true
            this.bar.labelDisplay.visible = false
            this.bar.slideDuration = 0
            this.bar.value = 0
            this.bar.maximum = 100
        }
        this.nameLab.text = cfg.name
        this.protoLab0.text = GlobalConfig.getMonsterHp(data.id, level)
        this.protoLab1.text = GlobalConfig.getMonsterAttack(data.id, level)
        this.protoLab2.text = cfg.raceName

        let goldCount = cfg.upgradeGold[level - 1 + 1]
        if (level >= UserConst.maxLevel) {
            this.upgradeGrp.visible = false
            this.barGrp.visible = false
        }
        else {
            this.upgradeGrp.visible = true
            this.barGrp.visible = true
            this.goldLab.text = String(goldCount)
        }

        if (data.fight) {
            this.upgradeGrp.visible = false
            this.barGrp.visible = false
        }

        let skills = []
        if (cfg.skill1 != null) {
            skills.push({ skillId: cfg.skill1, type: 1, lv: level, fight: data.fight })
        }
        if (cfg.skill2 != null) {
            skills.push({ skillId: cfg.skill2, type: 2, lv: level, fight: data.fight })
        }
        if (cfg.skill3 != null) {
            skills.push({ skillId: cfg.skill3, type: 3, lv: level, fight: data.fight })
        }
        this.list.dataProvider = new eui.ArrayCollection(skills)
    }


    public close(...param: any[]): void {
        // App.ins().destoryBanner()
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.retBtn:
            case this.closeBtn:
                ViewManager.ins().close(this)
                break;
            case this.upgradeGrp://升级
                if (!this.data.has) {
                    return wx.showToast({ icon: 'none', title: '未拥有' })
                }
                else { //
                    let data = this.data
                    let cfg = GlobalConfig.getMonsterCfg()[data.id]
                    if (data.level >= UserConst.maxLevel) {
                        return wx.showToast({ icon: 'none', title: '已达最大等级' })
                    }
                    let maxcount = cfg.upgradeNum[data.level - 1 + 1]
                    if (data.count < maxcount) {
                        return wx.showToast({ icon: 'none', title: '卡牌数量不足' })
                    }
                    let goldCount = cfg.upgradeGold[data.level - 1 + 1]
                    if (UserModel.ins().gold < goldCount) {
                        return wx.showToast({ icon: 'none', title: '金币不足' })
                    }
                    //去升级!!!
                }
                break;
        }
    }

}
ViewManager.ins().reg(HeroInfoWin, LayerManager.UI_Popup);