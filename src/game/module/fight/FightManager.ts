/* 战斗管理器
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 14:49:04 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-12-07 16:45:48
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
    private _parGroup: eui.Group
    public get parGroup() {
        if (this._parGroup == null) {
            this._parGroup = new eui.Group()
            this._parGroup.touchThrough = true
            this._parGroup.width = 750
            this._parGroup.height = 1334
            this._parGroup.verticalCenter = 0
            this._parGroup.horizontalCenter = 0
        }
        return this._parGroup
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
        if (FightModel.ins().isPVP()) {
            this.isWin = this.getPVPWin()
        }
        else {
            this.isWin = RoundPlay.ins().isWin()
        }
        console.log('战斗是否胜利：', this.isWin)
        if (!this.isTest && Main.gamePlatform != Main.platformH5) {
            // FightModel.ins().setResult(this.isWin) //!!!
        }
        let sound = this.isWin ? 'fight_win_mp3' : 'fight_fail_mp3'
        SoundManager.ins().playEffect(sound)
        this.isBreak = false
        let view = ViewManager.ins().getView(HomeWin) as HomeWin
        view && view.show(true)
        let viewTest = ViewManager.ins().getView(HomeTsetWin) as HomeTsetWin //
        viewTest && viewTest.setVisible(true) //
        if (Main.gamePlatform != Main.platformH5) {
            this.mapView.clearAllLayer()
            ViewManager.ins().close(FightWin)
        }
        if (Main.gamePlatform == Main.platformH5) {
            App.ins().endPlayH5(this.isWin)
        }
        else if (!this.isTest) {
            // ViewManager.ins().open(BattleResultWin, { isWin: this.isWin }) //!!!
        }
        this.isPlaying = false
        QuestionModel.ins().clearData()
        if (FightModel.ins().isPVP()) {
            this.removeWSListener()
            Socket.ins().close()
            this.lastMsg = null
        }
        this.isTest = false
        this.isPlayRound = false
    }
    public rate = 1 //播放倍率
    private newRate = 1
    private isBreak = false //是否跳过
    private isWin: boolean //是否胜利
    private _currentRound: any;//当前回合
    private list: any[]
    public isTest = false //是否测试
    public isPlaying = false //正在播放
    private isPlayRound = false //pvp 是否正在播放小回合
    private roundNum = 0 //pvp 播放小回合数
    private lastMsg: string //pvp socket msg
    private outLineID: number = null //pvp 掉线剔出id
    /**isTest 是否测试*/
    public async play(isTest = false) {
        QuestionModel.ins().clearData()
        this.isPlayRound = false
        this.roundNum = 0
        this.outLineID = null
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

        for (let i = 0; i < 12; i++) {
            if (roudPlay.monsters[i] && FightManager.ins().charMonsters[i]) {
                FightManager.ins().charMonsters[i].isAD = roudPlay.monsters[i].isAD
                FightManager.ins().charMonsters[i].setHasDieSkill(roudPlay.monsters[i].computeBuff.dieBoom || roudPlay.monsters[i].computeBuff.dieContract)
            }
        }
        console.log('开始对战'/*, JSON.stringify(RoundPlay.ins().roundList)*/)
        await TimerManager.ins().deleyPromisse(400)
        if (FightModel.ins().isPVP()) { //PVP
            this.startPVP()
        }
        else {
            this.playLoop()
            QuestionModel.ins().starAI()
        }
    }

    private startPVP() {
        App.ins().connectWS()
        MessageCenter.ins().addListener(SocketConst.SOCKET_RECONNECT, this.onReconect, this)
        MessageCenter.ins().addListener(SocketConst.SOCKET_CONNECT, this.onConect, this)
        MessageCenter.ins().addListener(SocketConst.SOCKET_DATA, this.onData, this)
        MessageCenter.ins().addListener(SocketConst.SOCKET_CLOSE, this.onNoconect, this)
        MessageCenter.ins().addListener(SocketConst.SOCKET_NOCONNECT, this.onNoconect, this)
    }
    private removeWSListener() {
        MessageCenter.ins().removeListener(SocketConst.SOCKET_RECONNECT, this.onReconect, this)
        MessageCenter.ins().removeListener(SocketConst.SOCKET_CONNECT, this.onConect, this)
        MessageCenter.ins().removeListener(SocketConst.SOCKET_DATA, this.onData, this)
        MessageCenter.ins().removeListener(SocketConst.SOCKET_CLOSE, this.onNoconect, this)
        MessageCenter.ins().removeListener(SocketConst.SOCKET_NOCONNECT, this.onNoconect, this)
    }
    private onConect() {
        let id = FightModel.ins().getID()
        let msg = JSON.stringify(id)
        Socket.ins().send(BaseMsgAction.LOGIN, msg)
    }
    private onReconect() {
        let id = FightModel.ins().getID()
        let msg = JSON.stringify(id)
        Socket.ins().send(BaseMsgAction.RELOGIN, msg)
    }
    private onNoconect() {
        if (this.isPlayRound) {
            TimerManager.ins().doTimer(500, 1, this.onNoconect, this)
        }
        else {
            let ids = FightModel.ins().getID()
            this.outLineID = ids.own
            this.endPlay()
        }
    }
    private onData(msg) {
        // console.log(msg)
        let obj = JSON.parse(msg) as Message
        if (obj.action == BaseMsgAction.LOGINED) {
            if (FightModel.ins().isFirst) {
                this.playLoop()
            }
        }
        else if (obj.action == BaseMsgAction.SEND_OTHER) {
            let data = JSON.parse(obj.msg)
            if (data.mode == 0) {
                this.roundNum++
                this.endPlay()
            }
            else if (data.mode == 1) {
                this.roundNum++
                this.list = data.round
                this.getChangeRound(this.list)
                this.playLoop1()
            }
            else if (data.mode == 2) {
                if (data.roundNum == this.roundNum) {
                    if (this.isPlayRound) {
                        console.log('还未播放完!')
                        TimerManager.ins().doTimer(500, 1, this.checkPVPLoop, this)
                    }
                    else {
                        this.playLoop()
                    }
                }
                else {
                    Socket.ins().send(BaseMsgAction.SEND_OTHER, this.lastMsg)
                }
            }
            else if (data.mode == 3) {
                QuestionModel.ins().setEnemyEnergy(data.energy)
            }
        }
        else if (obj.action == BaseMsgAction.RECONECT) {
            console.log('BaseMsgAction.RECONECT', obj)
            if (!this.isPlayRound) {
                if (!FightModel.ins().isFirst) {
                    let msg = JSON.stringify({ mode: 2, roundNum: this.roundNum })
                    Socket.ins().send(BaseMsgAction.SEND_OTHER, msg)
                    return
                }
            }
        }
        else if (obj.action == BaseMsgAction.TIMEOUT) {
            console.log('BaseMsgAction.TIMEOUT', obj)
            Socket.ins().close()
            let id = parseInt(obj.msg)
            if (isNaN(id)) {
                let ids = FightModel.ins().getID()
                this.outLineID = ids.own
            }
            else {
                this.outLineID = id
            }
            this.onNoconect()
        }
    }
    private checkPVPLoop() {
        if (this.isPlayRound) {
            TimerManager.ins().doTimer(500, 1, this.checkPVPLoop, this)
        }
        else {
            this.playLoop()
        }
    }
    /**翻转己方敌方战斗数据*/
    private getChangeRound(list: any[]) {
        if (list && list.length > 0) {
            for (let round of list) {
                if (round.backPos != null) {
                    round.backPos = this.getChangePos(round.backPos)
                }
                if (round.atker && round.atker.pos != null) {
                    round.atker.pos = this.getChangePos(round.atker.pos)
                }
                if (round.atked) {
                    for (let atked of round.atked) {
                        atked.pos = this.getChangePos(atked.pos)
                    }
                }
            }
        }
    }
    private getChangePos(pos) {
        if (pos == -1) {
            return -2
        }
        else if (pos == -2) {
            return -1
        }
        return pos >= 6 ? (pos - 6) : (pos + 6)
    }
    private getPVPWin() {
        if (this.outLineID != null) {
            if (!this.ownAllDie() && !this.enemyAllDie()) {
                let ids = FightModel.ins().getID()
                return this.outLineID != ids.own
            }
        }
        if (FightModel.ins().isFirst) {
            return !this.ownAllDie()
        }
        else {
            return this.enemyAllDie()
        }
    }
    private ownAllDie() {
        for (let i = 0; i < 6; i++) {
            let item = this.charMonsters[i]
            if (item && !item.isDie()) {
                return false
            }
        }
        return true
    }
    private enemyAllDie() {
        for (let i = 6; i < 12; i++) {
            let item = this.charMonsters[i]
            if (item && !item.isDie()) {
                return false
            }
        }
        return true
    }

    private playLoop() {
        let list
        let num = QuestionModel.ins().getOwnSkill()
        if (num != null) {
            list = RoundPlay.ins().computeSpecial(-1, num)
        }
        else {
            let enemy = QuestionModel.ins().getEnemySkill()
            if (enemy != null) {
                list = RoundPlay.ins().computeSpecial(-2, enemy)
            }
            // if (num!=null) {
            //     // list = RoundPlay.ins().computeSpecial(-1, 23) //!!!
            //     list = RoundPlay.ins().computeSpecial(-1, 34) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 53) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 96) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 44) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 76) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 151) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 140) //!!!
            //     // list = RoundPlay.ins().computeSpecial(-1, 192) //!!!
            // }
            else {
                list = RoundPlay.ins().rounding()
            }
        }
        if (list == null || list.length == 0) { //end
            if (FightModel.ins().isPVP()) { //PVP
                if (FightModel.ins().isFirst) {
                    this.roundNum++
                    let msg = JSON.stringify({ mode: 0 })
                    Socket.ins().send(BaseMsgAction.SEND_OTHER, msg)
                    this.lastMsg = msg
                }
            }
            this.endPlay()
            return
        }
        if (FightModel.ins().isPVP()) { //PVP
            if (FightModel.ins().isFirst) {
                this.roundNum++
                let msg = JSON.stringify({ round: list, mode: 1 })
                Socket.ins().send(BaseMsgAction.SEND_OTHER, msg)
                this.lastMsg = msg
            }
        }
        this.list = list
        this._currentRound = RoundPlay.ins().roundNum
        console.log('回合:' + this._currentRound + ';攻击者:' + RoundPlay.ins().roundIndex)
        this.playLoop1()
    }
    private async playLoop1() {
        let data = this.list ? this.list.shift() : null
        if (!data) {
            this.isPlayRound = false
            if (FightModel.ins().isPVP()) { //PVP
                if (!FightModel.ins().isFirst) {
                    let msg = JSON.stringify({ mode: 2, roundNum: this.roundNum })
                    Socket.ins().send(BaseMsgAction.SEND_OTHER, msg)
                    return
                }
                return
            }
            this.playLoop()
            return
        }
        if (this.isBreak) {
            this.isPlayRound = false
            this.endPlay()
            return
        }
        this.isPlayRound = true
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
    private async showPlay() {
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
        else if (this.curData.isQuestion) { //答题技能
            if (FightModel.ins().isPVP && !FightModel.ins().isFirst) {
                this.curData.atker.pos == -1 ?
                    QuestionModel.ins().setOwnSkill(this.curData.skillId) : QuestionModel.ins().setEnemySkill(this.curData.skillId)
            }
            //播放技能名字
            SkillNameManager.ins().playSpecialName(this.curData.atker.pos, this.rate)
            await TimerManager.ins().deleyPromisse(4000)
            let boolOwn = this.curData.atker.pos == -1
            if (boolOwn) {
                QuestionModel.ins().ownBar -= QuestionModel.ins().maxEnergy
                QuestionModel.ins().ownCount++
            }
            else {
                QuestionModel.ins().enemyBar -= QuestionModel.ins().maxEnergy
                QuestionModel.ins().enemyCount++
            }

            this.showAct()

            let cfg = GlobalConfig.getSkillCfg(this.curData.skillId)
            let hasAddHp = false
            //+hp/atk技能
            if (cfg.type == 1012 || cfg.type == 1013 || cfg.type == 1022 || cfg.type == 1023 ||
                cfg.type == 1016 || cfg.type == 1017 || cfg.type == 1018) {
                if (cfg.type == 1016 || cfg.type == 1022 || cfg.type == 1023) {
                    ParticleController.ins().playParticle("jnhs", this.parGroup, -1, this.curData.atker.pos, this.curData.atked, this.rate)
                    await TimerManager.ins().deleyPromisse(700 / this.rate)
                }
                else {
                    hasAddHp = true
                }
            }
            else {
                ParticleController.ins().playParticle("huose", this.parGroup, -1, this.curData.atker.pos, this.curData.atked, this.rate)
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
            if (boolOwn)
                QuestionModel.ins().isPlaying = false
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
        showDie?: number, isDieBoom?: boolean, isDieContract?: boolean, isAtkEnd?: boolean, isAtk?: boolean, isPassive?: boolean, atkBacked?: boolean, isQuestion?: boolean,
        atker?: { pos: number, computeData: ComputeData },
        atked?: { pos: number, computeData: ComputeData }[], skillId?: number, backPos?: number
    }
    private preData: {
        showDie?: number, isDieBoom?: boolean, isDieContract?: boolean, isAtkEnd?: boolean, isAtk?: boolean, isPassive?: boolean, atkBacked?: boolean, isQuestion?: boolean,
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
                    ParticleController.ins().playParticle("l'sjnfs", this.parGroup, -1, this.curData.atker.pos, this.curData.atked, this.rate)
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

    private async showAct() {
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
        else if (this.curData.isQuestion) {
            let cfg = GlobalConfig.getSkillCfg(this.curData.skillId)
            if (cfg.object == 0) {
                await TimerManager.ins().deleyPromisse(700 / this.rate)
                for (let item of this.curData.atked) {
                    if (item.computeData.harmHp > 0) {
                        FightManager.ins().charMonsters[item.pos].showAction(MonsterActionType.attacked)
                    }
                }
            }
        }
    }
}