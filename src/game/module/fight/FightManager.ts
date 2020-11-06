/* 战斗管理器
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 14:49:04 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-04 14:37:51
 */
class FightManager extends BaseClass {
    public static ins(): FightManager {
        return super.ins();
    }

    public constructor() {
        super();
    }

    private _mapView: MapView
    public get mapView() {
        if (this._mapView == null) {
            this._mapView = new MapView()
            this._mapView.initMap()
        }
        return this._mapView
    }

    public charMonsters: CharMonster[]


    /**播放倍率*/
    public setRate(rate) {
        this.newRate = rate
    }
    /**跳过*/
    public setBreak() {
        this.isBreak = true
    }
    private endPlay() {
        let sound = this.isWin ? 'fight_win_mp3' : 'fight_fail_mp3'
        SoundManager.ins().playEffect(sound)
        this.isBreak = false
        let view = ViewManager.ins().getView(HomeWin) as HomeWin
        view && view.show(true)
        if (Main.gamePlatform != Main.platformH5) {
            this.mapView.clearAllLayer()
            ViewManager.ins().close(FightWin)
        }
        if (Main.gamePlatform == Main.platformH5) {
            App.ins().endPlayH5(this.isWin)
        }
        else if (!this.isTest) {
            ViewManager.ins().open(BattleResultWin, { isWin: this.isWin })
        }
        this.isTest = false
        this.isPlaying = false
    }
    public rate = 1 //播放倍率
    private newRate = 1
    private isBreak = false //是否跳过
    private isWin: boolean //是否胜利
    private _currentRound: any;//当前回合
    private list
    public isTest = false
    public isPlaying = false //正在播放
    /**isTest 是否测试*/
    public async play(isTest = false) {
        this.isPlaying = true
        this.isTest = isTest
        let view = ViewManager.ins().getView(HomeWin) as HomeWin
        view && view.show(false)
        this.rate = 1
        this.newRate = 1
        ViewManager.ins().open(FightWin)
        this.isBreak = false
        this._currentRound = 0
        this.curData = null
        this.preData = null
        let roudPlay = RoundPlay.ins()
        roudPlay.start(isTest)
        this.mapView.showFightEntity()
        this.isWin = roudPlay.isWin()
        if (!isTest && Main.gamePlatform != Main.platformH5) {
            FightModel.ins().setResult(this.isWin)
        }

        for (let i = 0; i < 12; i++) {
            if (roudPlay.monsters[i] && FightManager.ins().charMonsters[i]) {
                FightManager.ins().charMonsters[i].isAD = roudPlay.monsters[i].isAD
                FightManager.ins().charMonsters[i].setHasDieSkill(roudPlay.monsters[i].computeBuff.dieBoom || roudPlay.monsters[i].computeBuff.dieContract)
            }
        }
        console.log('开始对战'/*, JSON.stringify(RoundPlay.ins().roundList)*/)
        await TimerManager.ins().deleyPromisse(400)
        this.playLoop()
    }

    private playLoop() {
        let list = RoundPlay.ins().roundList.shift()
        if (list == null) { //end
            this.endPlay()
            return
        }
        this.list = list
        this._currentRound++
        this.playLoop1()
    }
    private async  playLoop1() {
        let data = this.list.shift()
        if (!data) {
            this.playLoop()
            return
        }
        if (this.isBreak) {
            this.endPlay()
            return
        }
        if (this.newRate != this.rate) {
            this.rate = this.newRate
        }
        if (data.isAtk) {
            this.preData = data
        }
        this.curData = data
        // console.log('showPlay:' + egret.getTimer(), this._currentRound)
        await this.showPlay()
        TimerManager.ins().doTimer(0, 1, this.playLoop2, this)
    }
    private playLoop2() {
        this.playLoop1()
    }
    private async  showPlay() {
        if (this.curData.isPassive) {
            await this.playData(this.curData.atker, false)
            if (this.curData.atked && this.curData.atked.length > 0) {
                for (let item of this.curData.atked) {
                    await this.playData(item, false)
                }
            }
            return
        }
        else if (this.curData.atkBacked) {
            let pos = this.curData.backPos
            FightManager.ins().charMonsters[pos].showAction(MonsterActionType.atk_ad)
            //播放技能名字
            let skillName = FightData.skillNameIcon[1003]
            if (skillName) {
                SkillNameManager.ins().playName(skillName, pos, this.rate)
            }
            await TimerManager.ins().deleyPromisse(200)
            ParticleController.ins().playParticle("huose", this.mapView._effTopLayer, -1, pos, [this.curData.atker], this.rate)
            await TimerManager.ins().deleyPromisse(700 / this.rate)
            FightManager.ins().charMonsters[this.curData.atker.pos].showAction(MonsterActionType.attacked)
            SkillManager.ins().playSkillEff(this.curData.atker.pos, '1015', this.rate)
            let skillms = SkillTypeBase.getSkillTime(1015) - 600
            await TimerManager.ins().deleyPromisse(skillms / this.rate)
            await this.playData(this.curData.atker)
        }
        else if (this.curData.isAtk) {
            if (this.curData.atker && this.curData.atker.computeData.damageUp) {
                let pos = this.curData.atker.pos
                SkillManager.ins().playSkillEff(pos, 'atk_up', this.rate)
                FightManager.ins().charMonsters[this.curData.atker.pos].upDamage(this.curData.atker.computeData.damageUp)
                await TimerManager.ins().deleyPromisse(SkillTypeBase.getSkillTime('atk') / this.rate)
            }
            //播放技能名字
            let skillName = FightData.getSkillName(this.curData.skillId)
            if (skillName) {
                SkillNameManager.ins().playName(skillName, this.curData.atker.pos, this.rate)
            }

            FightManager.ins().charMonsters[this.curData.atker.pos].showAction(MonsterActionType.atk_ad)
            await TimerManager.ins().deleyPromisse(150)
            this.showAct()

            let cfg = GlobalConfig.getSkillCfg(this.curData.skillId)
            let hasAddHp = false
            //+hp/atk技能
            if (cfg.type == 1012 || cfg.type == 1013 || cfg.type == 1022 || cfg.type == 1023 ||
                cfg.type == 1016 || cfg.type == 1017 || cfg.type == 1018) {
                if (cfg.type == 1016 || cfg.type == 1022 || cfg.type == 1023) {
                    ParticleController.ins().playParticle("jnhs", this.mapView._effTopLayer, -1, this.curData.atker.pos, this.curData.atked, this.rate)
                    await TimerManager.ins().deleyPromisse(700 / this.rate)
                }
                else {
                    hasAddHp = true
                }
            }
            else {
                ParticleController.ins().playParticle("huose", this.mapView._effTopLayer, -1, this.curData.atker.pos, this.curData.atked, this.rate)
                await TimerManager.ins().deleyPromisse(700 / this.rate)
                let mc = SkillTypeBase.getMC(this.curData.skillId)
                for (let item of this.curData.atked) {
                    SkillManager.ins().playSkillEff(item.pos, mc, this.rate)
                }
                let skillms = SkillTypeBase.getSkillTime(mc) - 600
                await TimerManager.ins().deleyPromisse(skillms / this.rate)
            }
            let hasDamage = false
            let hasReHp = false
            let budong = false
            let isRevive = false
            if (this.curData.atked && this.curData.atked.length > 0) {
                for (let item of this.curData.atked) {
                    this.playData(item)
                    if (item.computeData.damage) {
                        hasDamage = true
                    }
                    if (item.computeData.reHp) {
                        hasReHp = true
                    }
                    if (item.computeData.triggerBurn == 2) {
                        budong = true
                    }
                    if (item.computeData.isRevive) {
                        isRevive = true
                    }
                }
            }
            this.playData(this.curData.atker, cfg.type != 1008)
            if (this.curData.atker.computeData.damage) {
                hasDamage = true
            }
            let ms = SkillTypeBase.getDeleyTime(cfg.type)
            if (hasDamage && (cfg.type == 1028)) {
                ms += SkillTypeBase.getSkillTime('atk')
            }
            if (hasAddHp) {
                ms += 700 + SkillTypeBase.getSkillTime('1001') - 600
            }
            if (hasReHp) {
                ms += SkillTypeBase.getSkillTime('1019') + 600
            }
            if (budong) {
                ms += SkillTypeBase.getSkillTime('1037') - 600
            }
            if (isRevive) {
                ms += SkillTypeBase.getSkillTime('1001') - 600
            }
            ms += this.checkDefApTime()
            await TimerManager.ins().deleyPromisse(ms / this.rate)
        }
        else if (this.curData.isDieContract) {
            //播放技能名字
            let skillName = FightData.getSkillName(this.curData.skillId)
            if (skillName) {
                SkillNameManager.ins().playName(skillName, this.curData.atker.pos, this.rate)
            }
            FightManager.ins().charMonsters[this.curData.atker.pos].showAction(MonsterActionType.atk_ad)
            await TimerManager.ins().deleyPromisse(150)
            let cfg1 = GlobalConfig.getSkillCfg(this.curData.skillId)
            let cfg = GlobalConfig.getSkillCfg(cfg1.value)
            let mc = SkillTypeBase.getMC(cfg1.value)
            ParticleController.ins().playParticle("huose", this.mapView._effTopLayer, -1, this.curData.atker.pos, this.curData.atked, this.rate)
            await TimerManager.ins().deleyPromisse(700 / this.rate)
            this.showAct()
            for (let item of this.curData.atked) {
                SkillManager.ins().playSkillEff(item.pos, mc, this.rate)
            }
            let skillms = SkillTypeBase.getSkillTime(mc) - 600
            await TimerManager.ins().deleyPromisse(skillms / this.rate)
            for (let item of this.curData.atked) {
                this.playData(item)
            }
            let ms = SkillTypeBase.getDeleyTime(cfg.type)
            ms += this.checkDefApTime()
            await TimerManager.ins().deleyPromisse(ms / this.rate)
        }
        else if (this.curData.isDieBoom) {
            //播放技能名字
            let skillName = FightData.skillNameIcon[1024]
            if (skillName) {
                SkillNameManager.ins().playName(skillName, this.curData.atker.pos, this.rate)
            }
            FightManager.ins().charMonsters[this.curData.atker.pos].showAction(MonsterActionType.die)
            await TimerManager.ins().deleyPromisse(150)
            let mc = '1024'
            let tempatkeds = []
            for (let item of this.curData.atked) {
                tempatkeds.push(item)
            }
            ParticleController.ins().playParticle("huose", this.mapView._effTopLayer, -1, this.curData.atker.pos, tempatkeds, this.rate)
            await TimerManager.ins().deleyPromisse(700 / this.rate)
            this.showAct()
            for (let prop of tempatkeds) {
                SkillManager.ins().playSkillEff(prop.pos, mc, this.rate)
            }
            let skillms = SkillTypeBase.getSkillTime(mc) - 600
            await TimerManager.ins().deleyPromisse(skillms / this.rate)
            for (let item of this.curData.atked) {
                this.playData(item)
            }
            let ms = SkillTypeBase.getDeleyTime(null)
            ms += this.checkDefApTime()
            await TimerManager.ins().deleyPromisse(ms / this.rate)
        }
        else if (this.curData.showDie != null) {
            FightManager.ins().charMonsters[this.curData.atker.pos].showAction(MonsterActionType.die)
            await TimerManager.ins().deleyPromisse(400)
        }
        else if (this.curData.isAtkEnd) {
            FightManager.ins().charMonsters[this.curData.atker.pos].removeAllBuff()
            this.playData(this.curData.atker)
            let ms = SkillTypeBase.getDeleyTime(null)
            await TimerManager.ins().deleyPromisse(ms / this.rate)
        }
    }
    /**免疫*/
    private checkDefApTime() {
        let isDefAp = false
        if (this.curData.atker && this.curData.atker.computeData && this.curData.atker.computeData.isDefAp) {
            isDefAp = true
        }
        else if (this.curData.atked) {
            for (let item of this.curData.atked) {
                if (item.computeData && item.computeData.isDefAp) {
                    isDefAp = true
                    break;
                }
            }
        }
        if (isDefAp) {
            return (SkillTypeBase.getSkillTime('1037') - 600)
        }
        return 0
    }
    private curData: {
        showDie?: number, isDieBoom?: boolean, isDieContract?: boolean, isAtkEnd?: boolean, isAtk?: boolean, isPassive?: boolean, atkBacked?: boolean,
        atker?: { pos: number, computeData: ComputeData },
        atked?: { pos: number, computeData: ComputeData }[], skillId?: number, backPos?: number
    }
    private preData: {
        showDie?: number, isDieBoom?: boolean, isDieContract?: boolean, isAtkEnd?: boolean, isAtk?: boolean, isPassive?: boolean, atkBacked?: boolean,
        atker?: { pos: number, computeData: ComputeData },
        atked?: { pos: number, computeData: ComputeData }[], skillId?: number, backPos?: number
    }
    private async playData(data: { pos: number, computeData: ComputeData }, hpParticle = true) {
        if (data == null) {
            return
        }
        let computeData = data.computeData
        let pos = data.pos

        if (computeData.notActive) {
            SkillManager.ins().playSkillEff(pos, '10061', this.rate, true)
        }
        if (computeData.notAp) {
            SkillManager.ins().playSkillEff(pos, '10051', this.rate, true)
        }
        if (computeData.atkEndHarm) {
            SkillManager.ins().playSkillEff(pos, '10091', this.rate, true)
        }
        if (computeData.notRestore) {
            SkillManager.ins().playSkillEff(pos, '10341', this.rate, true)
        }
        if (computeData.fireEndHarm) {
            SkillManager.ins().playSkillEff(pos, '1032', this.rate, true)
        }
        if (computeData.isDefAp) {
            SkillManager.ins().playSkillEff(pos, '1037', this.rate)
            //播放技能名字
            let skillName = FightData.skillNameIcon[1037]
            if (skillName) {
                SkillNameManager.ins().playName(skillName, pos, this.rate)
            }
            await TimerManager.ins().deleyPromisse((SkillTypeBase.getSkillTime('1037') - 600) / this.rate)
        }
        if (computeData.triggerBurn) {
            if (computeData.triggerBurn == 2) {
                SkillManager.ins().playSkillEff(pos, '1037', this.rate)
                //播放技能名字
                let skillName = FightData.skillNameIcon[1036]
                if (skillName) {
                    SkillNameManager.ins().playName(skillName, pos, this.rate)
                }
                await TimerManager.ins().deleyPromisse((SkillTypeBase.getSkillTime('1037') - 600) / this.rate)
            }
            let isHarm = computeData.harm > 0 ? true : false
            let num = computeData.harmHp == 0 ? (isHarm ? '-0' : '+0') : -computeData.harmHp as any
            num = num > 0 ? '+' + num : num
            BloodManager.ins().playDamege(pos, num, isHarm, this.rate)
            // console.log('time2:' + egret.getTimer())
            FightManager.ins().charMonsters[data.pos].harmHp(data.computeData.harmHp)
            await TimerManager.ins().deleyPromisse(600 / this.rate)
        }
        else if (computeData.harm && computeData.harmHp != null) {
            if (computeData.isDef) {
                SkillManager.ins().playSkillEff(pos, '1039', this.rate)
                //播放技能名字
                let skillName = FightData.skillNameIcon[computeData.isHarmAd ? 1039 : 1040]
                if (skillName) {
                    SkillNameManager.ins().playName(skillName, pos, this.rate)
                }
            }
            if (computeData.apSubHarm || computeData.maxApHarm) {
                SkillManager.ins().playSkillEff(pos, '1011', this.rate)
            }
            if (computeData.adSubHarm) {
                SkillManager.ins().playSkillEff(pos, '1010', this.rate)
            }
            if (computeData.maxAdHarm) {
                SkillManager.ins().playSkillEff(pos, '1033', this.rate)
            }
            let isHarm = computeData.harm > 0 ? true : false
            let num = computeData.harmHp == 0 ? (isHarm ? '-0' : '+0') : -computeData.harmHp as any
            num = num > 0 ? '+' + num : num
            if (computeData.harm < 0) {
                if (!computeData.isRevive && hpParticle) {
                    ParticleController.ins().playParticle("l'sjnfs", this.mapView._effTopLayer, -1, this.curData.atker.pos, this.curData.atked, this.rate)
                    await TimerManager.ins().deleyPromisse(700 / this.rate)
                }
                SkillManager.ins().playSkillEff(pos, '1001', this.rate)
                await TimerManager.ins().deleyPromisse((SkillTypeBase.getSkillTime('1001') - 600) / this.rate)
            }
            BloodManager.ins().playDamege(pos, num, isHarm, this.rate)
            FightManager.ins().charMonsters[pos].harmHp(computeData.harmHp, !computeData.reHp)
            if (computeData.isRevive) { //复活
                FightManager.ins().charMonsters[pos].revive()
            }
            await TimerManager.ins().deleyPromisse(600 / this.rate)
            if (computeData.reHp) {
                //播放技能名字
                let skillName = FightData.skillNameIcon[1019]
                if (skillName) {
                    SkillNameManager.ins().playName(skillName, pos, this.rate)
                }
                SkillManager.ins().playSkillEff(pos, '1019', this.rate)
                await TimerManager.ins().deleyPromisse(SkillTypeBase.getSkillTime('1019') / this.rate)
                BloodManager.ins().playDamege(pos, '+' + computeData.reHp, false, this.rate)
                FightManager.ins().charMonsters[pos].harmHp(-computeData.reHp)
                await TimerManager.ins().deleyPromisse(600 / this.rate)
            }
        }
        if (computeData.damage) {
            let mcstr = computeData.damage > 0 ? 'atk_up' : 'atk_down'
            SkillManager.ins().playSkillEff(pos, mcstr, this.rate)
            FightManager.ins().charMonsters[data.pos].upDamage(data.computeData.damage)
            await TimerManager.ins().deleyPromisse(SkillTypeBase.getSkillTime(mcstr) / this.rate)
        }
    }

    private async  showAct() {
        if (this.curData.isAtk) {
            let cfg = GlobalConfig.getSkillCfg(this.curData.skillId)
            if (cfg.fightType == 1 && cfg.object == 0) {
                await TimerManager.ins().deleyPromisse(700 / this.rate)
                for (let item of this.curData.atked) {
                    if (cfg.type == 1030) {
                        FightManager.ins().charMonsters[item.pos].showAction(MonsterActionType.destroy)
                    }
                    else if (item.computeData.harmHp > 0) {
                        FightManager.ins().charMonsters[item.pos].showAction(MonsterActionType.attacked)
                    }
                }
            }
        }
        else if (this.curData.isDieContract) {
            for (let item of this.curData.atked) {
                if (item.computeData.harmHp > 0) {
                    FightManager.ins().charMonsters[item.pos].showAction(MonsterActionType.attacked)
                }
            }
        }
        else if (this.curData.isDieBoom) {
            for (let item of this.curData.atked) {
                if (item.computeData.harmHp > 0) {
                    FightManager.ins().charMonsters[item.pos].showAction(MonsterActionType.attacked)
                }
            }
        }
    }
}