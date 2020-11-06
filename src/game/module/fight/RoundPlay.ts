/* 回合演算
 * @Author: gravitycat 
 * @Date: 2020-09-09 18:01:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-04 18:36:10
 */
class RoundPlay extends BaseClass {
    public constructor() {
        super()
    }

    public static ins(): RoundPlay {
        return super.ins();
    }

    public monsters: NewMonsterEntity[] = []

    /**开始演算   isTest 是否测试*/
    public start(isTest = false) {
        this.monsters = []
        let enemy: { lv, id, life, lifePro, attack, atkPro, attackID, skill1?, skill2?, skill3?}[]
        let our: { lv, id, life, lifePro, attack, atkPro, attackID, skill1?, skill2?, skill3?}[]
        if (isTest) {
            let lists = GlobalConfig.testCfg
            enemy = lists.enemy
            our = lists.our
        }
        else {
            let fightData = FightModel.ins().fightData
            enemy = [null, null, null, null, null, null, null]
            let enemyArr = fightData.matchMatrixList
            let enemyZoom2 = UserModel.ins().isZoomOK2(fightData.matchInfo.dan, fightData.matchInfo.lv)
            let enemyZoom3 = UserModel.ins().isZoomOK3(fightData.matchInfo.dan, fightData.matchInfo.lv)
            for (let i in enemyArr) {
                let item = enemyArr[i]
                let cfg = GlobalConfig.getMonsterCfg()[item.cardId]
                let data = {
                    lv: item.lv, id: item.cardId, life: cfg.life, lifePro: cfg.lifePro, attack: cfg.attack, atkPro: cfg.atkPro,
                    attackID: cfg.attackID, skill1: cfg.skill1, skill2: null, skill3: null
                }
                if (cfg.skill2 && enemyZoom2 && item.lv >= UserConst.skill2Lv) {
                    data.skill2 = cfg.skill2
                }
                if (cfg.skill3 && enemyZoom3 && item.lv >= UserConst.skill3Lv) {
                    data.skill3 = cfg.skill3
                }
                enemy[item.position - 1] = data
            }

            our = [null, null, null, null, null, null, null]
            let ourArr = fightData.userMatrixList
            let ourZoom2 = UserModel.ins().isZoomOK2(fightData.userInfo.dan, fightData.userInfo.lv)
            let ourZoom3 = UserModel.ins().isZoomOK3(fightData.userInfo.dan, fightData.userInfo.lv)
            for (let i in ourArr) {
                let item = ourArr[i]
                let cfg = GlobalConfig.getMonsterCfg()[item.cardId]
                let data = {
                    lv: item.lv, id: item.cardId, life: cfg.life, lifePro: cfg.lifePro, attack: cfg.attack, atkPro: cfg.atkPro,
                    attackID: cfg.attackID, skill1: cfg.skill1, skill2: null, skill3: null
                }
                if (cfg.skill2 && ourZoom2 && item.lv >= UserConst.skill2Lv) {
                    data.skill2 = cfg.skill2
                }
                if (cfg.skill3 && ourZoom3 && item.lv >= UserConst.skill3Lv) {
                    data.skill3 = cfg.skill3
                }
                our[item.position - 1] = data
            }
        }
        for (let i = 0; i < 6; i++) {
            if (our[i]) {
                let obj = new NewMonsterEntity()
                obj.init(our[i], i)
                this.monsters.push(obj)
            }
            else {
                this.monsters.push(null)
            }
        }
        for (let i = 0; i < 6; i++) {
            if (enemy[i]) {
                let obj = new NewMonsterEntity()
                obj.init(enemy[i], i + 6)
                this.monsters.push(obj)
            }
            else {
                this.monsters.push(null)
            }
        }

        this.roundList = []
        this.roundData = []
        this.startRound()
    }
    /**获取施法对象*/
    public getObjects(pos, obj, includeDie = false): NewMonsterEntity[] {
        let isOur = pos < 6
        let ret = []
        if (obj == 0) {
            let s = isOur ? 6 : 0
            for (let i = s; i < s + 6; i++) {
                let item = this.monsters[i]
                if (item && !item.isDie()) {
                    ret.push(item)
                }
            }
        }
        else if (obj == 1) { //己
            ret.push(this.monsters[pos])
        }
        else if (obj == 2) { //友
            let s = isOur ? 0 : 6
            for (let i = s; i < s + 6; i++) {
                let item = this.monsters[i]
                if (i != pos && item) {
                    if (includeDie) {
                        if (!item.computeBuff.canRevive && item.isDie()) {
                            ret.push(item)
                        }
                    }
                    else {
                        if (!item.isDie()) {
                            ret.push(item)
                        }
                    }
                }
            }
        }
        else if (obj == 3) { //己+友
            let s = isOur ? 0 : 6
            for (let i = s; i < s + 6; i++) {
                let item = this.monsters[i]
                if (item && !item.isDie()) {
                    ret.push(item)
                }
            }
        }
        return ret
    }

    private compute(item: NewMonsterEntity) {
        if (item.active.length > 0) {
            for (let id of item.active) {
                this.computeSingle(item, id)
                if (item.isDie()) {
                    return
                }
            }
        }
        if (item.isDie()) {
            return
        }
        this.computeSingle(item, item.normal)
        let bool = item.checkAtkEnd()
        if (bool) {
            let data = { isAtkEnd: true, atker: null, atked: [] }
            data.atker = { pos: item.pos, computeData: item.computeData }
            this.roundData.push(data)
            item.clearComputeData()
            this._dieContractHandle()
        }
    }
    private computeSingle(item: NewMonsterEntity, id: number) {
        let cfg = GlobalConfig.getSkillCfg(id)
        let skillType = SkillTypeBase.getType(cfg.type)
        let notAtk = item.checkNotAtk(cfg.harmType)
        if (notAtk) {
            return;
        }

        //派发攻击时事件
        if (id === item.normal) {
            item.dispatch(MessageType.attackOther)
        }

        let obj = skillType.attack(cfg, item)
        if (obj == null) {
            return
        }

        let data = { isAtk: true, skillId: id, atker: null, atked: [] }
        let stateHarm = 0
        let atkBack = [] as { back, pos, backer: NewMonsterEntity }[]
        for (let ientity of obj.atked) {
            let obj = { pos: ientity.pos, computeData: ientity.computeData }
            data.atked.push(obj)
            if (ientity.computeData.harmHp > 0) {
                stateHarm = ientity.computeData.isHarmAd ? 1 : 2
            }

            if (ientity.computeData.atkBack != null) {
                atkBack.push({ back: ientity.computeData.atkBack, pos: ientity.pos, backer: ientity })
            }

            ientity.clearComputeData()
        }
        let isAdAtk = cfg.harmType == 1 || (cfg.harmType == 3 && obj.atker.isAD)
        if (isAdAtk) { //受到物理攻击时，使对方燃烧*****
            let atker = [obj.atker]
            for (let item of obj.atked) {
                item.dispatch(MessageType.harmeAdAndOther, atker)
            }
        }
        data.atker = { pos: obj.atker.pos, computeData: obj.atker.computeData }
        obj.atker.clearComputeData()
        this.roundData.push(data)

        if (stateHarm == 1) { //对卡牌造成物理伤害时
            let boolMsg = obj.atker.dispatch(MessageType.harmOtherAd, obj.atked)
            if (boolMsg) {
                let data = { isPassive: true, atker: null, atked: [] }
                for (let ientity of obj.atked) {
                    let obj = { pos: ientity.pos, computeData: ientity.computeData }
                    data.atked.push(obj)
                    ientity.clearComputeData()
                }
                data.atker = { pos: obj.atker.pos, computeData: obj.atker.computeData }
                this.roundData.push(data)
                obj.atker.clearComputeData()
            }
        }
        else if (stateHarm == 2) { //对卡牌造成法术伤害时
            let boolMsg = obj.atker.dispatch(MessageType.harmOtherAp, obj.atked)
            if (boolMsg) {
                let data = { isPassive: true, atker: null, atked: [] }
                for (let ientity of obj.atked) {
                    let obj = { pos: ientity.pos, computeData: ientity.computeData }
                    data.atked.push(obj)
                    ientity.clearComputeData()
                }
                data.atker = { pos: obj.atker.pos, computeData: obj.atker.computeData }
                this.roundData.push(data)
                obj.atker.clearComputeData()
            }
        }

        for (let backN of atkBack) {
            if (backN.backer.isDie()) {
                continue;
            }
            let backBool = obj.atker.setAtkBacked(backN.back, backN.pos)
            if (backBool) { //反击
                this.roundData.push({ atkBacked: true, backPos: backN.pos, atker: { pos: obj.atker.pos, computeData: obj.atker.computeData } })
                obj.atker.clearComputeData()
            }
        }
        this._dieContractHandle()
    }

    /**
     * 判断触发死契 & 自爆
     */
    private _dieContractHandle() {
        let bool = false
        for (let single of this.monsters) {
            if (single == null || !single.isDie() || !(single.computeData.dieContract || single.computeData.dieBoom)) {
                continue;
            }
            let computeData = single.computeData
            let showDie = 1
            if (computeData.dieContract > 0) {
                let cfg1 = GlobalConfig.getSkillCfg(computeData.dieContract)
                let cfg = GlobalConfig.getSkillCfg(cfg1.value)
                let backSkillType = SkillTypeBase.getType(cfg.type)
                let obj = backSkillType.attack(cfg, single)
                if (obj) {
                    let data = { isDieContract: true, skillId: computeData.dieContract, atker: null, atked: [] }
                    for (let ientity of obj.atked) {
                        let obj = { pos: ientity.pos, computeData: ientity.computeData }
                        data.atked.push(obj)
                        ientity.clearComputeData()
                    }
                    data.atker = { pos: obj.atker.pos, computeData: obj.atker.computeData }
                    this.roundData.push(data)
                    single.clearComputeData(1)
                    bool = true
                    showDie = 2
                }
                else {
                    single.clearComputeData(1)
                }
            }
            if (this.delDieBoom(single)) {
                bool = true
                showDie = 3
            }
            if (showDie == 1 || showDie == 2 /*|| showDie == 3*/) {
                let data = { showDie: showDie, atker: null, atked: [] }
                data.atker = { pos: single.pos }
                this.roundData.push(data)
            }
            if (bool) {
                break;
            }
        }
        bool && this._dieContractHandle()
    }
    /**自爆*/
    private delDieBoom(item: NewMonsterEntity) {
        let computeData = item.computeData
        if (!computeData.dieBoom) {
            return false
        }
        if (computeData.dieBoom.pos >= 0) {
            let boomed = this.monsters[computeData.dieBoom.pos]
            if (!boomed.isDie()) {
                boomed.harmHp(computeData.dieBoom.harm, 2)
                let data = { isDieBoom: true, atker: null, atked: [] }
                data.atker = { pos: item.pos, computeData: item.computeData }
                data.atked.push({ pos: boomed.pos, computeData: boomed.computeData })
                this.roundData.push(data)
                boomed.clearComputeData()
                item.clearComputeData(2)
                return true
            }
            item.clearComputeData(2)
            return false
        }
        else if (computeData.dieBoom.pos == -1) {
            let boomeds = this.getObjects(item.pos, 0)
            if (boomeds.length > 0) {
                let data = { isDieBoom: true, atker: null, atked: [] }
                data.atker = { pos: item.pos, computeData: item.computeData }
                for (let boomed of boomeds) {
                    if (!boomed.isDie()) {
                        boomed.harmHp(computeData.dieBoom.harm, 2)
                        data.atked.push({ pos: boomed.pos, computeData: boomed.computeData })

                        boomed.clearComputeData()
                    }
                }
                this.roundData.push(data)
                item.clearComputeData(2)
                return true
            }
            item.clearComputeData(2)
            return false
        }
        else if (computeData.dieBoom.pos == -2) {
            item.clearComputeData(2)
            return false
        }
        item.clearComputeData(2)
        return false
    }

    roundList = []
    roundData = []
    private startRound() {
        for (let i = 0; i < 6; i++) {
            let isEnd = this.isEnd()
            if (isEnd) {
                break;
            }
            let item = this.monsters[i]
            if (item && !item.isDie()) {
                this.compute(item)
            }

            isEnd = this.isEnd()
            if (isEnd) {
                break;
            }
            let enemy = this.monsters[i + 6]
            if (enemy && !enemy.isDie()) {
                this.compute(enemy)
            }
        }
        this.roundList.push(this.roundData)
        this.roundData = []

        let isEnd = this.isEnd()
        if (!isEnd) {
            this.startRound()
        }
    }

    /**是否结束 即某一方是否全部死亡*/
    private isEnd() {
        let enemyDie = true
        let ourDie = true
        for (let i = 0; i < 6; i++) {
            let item = this.monsters[i]
            if (item && !item.isDie()) {
                ourDie = false
            }
        }
        for (let i = 6; i < 12; i++) {
            let item = this.monsters[i]
            if (item && !item.isDie()) {
                enemyDie = false
            }
        }
        let bool = enemyDie || ourDie
        return bool
    }

    public isWin() {
        let ourDie = true
        for (let i = 0; i < 6; i++) {
            let item = this.monsters[i]
            if (item && !item.isDie()) {
                ourDie = false
            }
        }
        let bool = !ourDie
        return bool
    }
}