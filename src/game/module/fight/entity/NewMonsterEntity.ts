/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-18 10:58:51 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-12-07 18:31:20
 */
class NewMonsterEntity {
    active: number[] = []//主动
    passive: number[] = []//被动
    normal: number//普通攻击
    pos: number
    isAD: boolean
    id: number
    maxHp: number //最大生命上限
    level: number
    star: number

    computeHp: number //回合演算血量
    computeDamage: number
    computeBuff: ComputeBuff = {}

    public init(data: { lv, id, life, lifePro, attack, atkPro, attackID, skill1?, skill2?, skill3?}, pos) {
        this.level = data.lv
        let monsterCfg = GlobalConfig.getMonsterCfg()[data.id]
        this.star = monsterCfg.quality
        this.id = data.id
        this.pos = pos
        this.id = data.id
        this.normal = data.attackID
        let cfg = GlobalConfig.getSkillCfg(data.attackID)
        this.isAD = cfg.harmType == 1

        let damage = GlobalConfig.getMonsterAttack(data.id, data.lv) //data.attack + (data.lv - 1) * data.atkPro
        let hp = GlobalConfig.getMonsterHp(data.id, data.lv) //data.life + (data.lv - 1) * data.lifePro
        this.maxHp = hp
        this.computeDamage = damage
        this.computeHp = hp

        this.pushSkill(data.skill1)
        this.pushSkill(data.skill2)
        this.pushSkill(data.skill3)
    }
    private pushSkill(skillId) {
        if (skillId == null) {
            return
        }
        let cfg = GlobalConfig.getSkillCfg(skillId)
        if (cfg) {
            if (cfg.fightType == 1) {
                this.active.push(skillId)
            }
            if (cfg.fightType == 2) {
                this.passive.push(skillId)
                let typeBase = SkillTypeBase.getType(cfg.type)
                typeBase.addListener(this, skillId)
            }
        }
    }

    public isDie() {
        // return this.hp <= 0
        return this.computeHp <= 0
    }
    /**攻击回合结束后 buff*/
    public checkAtkEnd() {
        if (this.isDie()) {
            return false
        }
        let bool = false
        if (this.computeBuff.atkEndHarm) {
            this.harmHp(this.computeBuff.atkEndHarm, 2)
            this.computeBuff.atkEndHarm = null
            bool = true
        }
        if (this.isDie()) {
            return bool
        }
        if (this.computeBuff.fireEndHarm) {
            this.harmHp(this.computeBuff.fireEndHarm, 2)
            this.computeBuff.fireEndHarm = null
            bool = true
        }
        if (this.computeBuff.notRestore) {
            this.computeBuff.notRestore = null
            bool = true
        }
        return bool
    }
    /**毒液* 攻击回合结束后受到*点伤害*/
    public setAtkEndHarm(harm) {
        if (this.computeBuff.isDefAp) {
            this.computeData.isDefAp = true
            return
        }
        if (this.computeBuff.atkEndHarm) {
            this.computeBuff.atkEndHarm += harm
        }
        else {
            this.computeBuff.atkEndHarm = harm
        }
        this.computeData.atkEndHarm = harm
    }


    /**
     * 燃烧持续掉血debuff
     * @param  {number} harm
     */
    public setFireEndHarm(harm: number) {
        if (this.computeBuff.isDefAp) {
            this.computeData.isDefAp = true
            return
        }
        if (this.computeBuff.fireEndHarm) {
            this.computeBuff.fireEndHarm += harm
        }
        else {
            this.computeBuff.fireEndHarm = harm
        }
        this.computeData.fireEndHarm = harm
    }
    /**
     * 触发摧毁
     */
    public triggerBurn() {
        if (this.computeBuff.notBurn) {
            this.computeData.triggerBurn = 2
            this.computeData.harm = this.computeHp
            this.computeData.harmHp = 0
            this.computeData.isHarmAd = false
        }
        else {
            this.computeData.triggerBurn = 1
            this.checkComputeData()
        }
    }

    /**
     * 无法回血debuff
     */
    public setNotRestore() {
        if (this.computeBuff.isDefAp) {
            this.computeData.isDefAp = true
            return
        }
        this.computeBuff.notRestore = true
        this.computeData.notRestore = true
    }
    /**
     * 是否不受摧毁技能影响
     */
    public setUnBurn() {
        this.computeBuff.notBurn = true;
    }
    /**带复活技能*/
    public setCanRevive() {
        this.computeBuff.canRevive = true;
    }
    public setDieContract() {
        this.computeBuff.dieContract = true;
    }
    public setDieBoom() {
        this.computeBuff.dieBoom = true;
    }

    /**是否不能攻击*/
    public checkNotAtk(harmType, isAtkEnd = false) {
        if (this.computeBuff.notActive) {
            if (isAtkEnd) {
                this.computeBuff.notActive = false
                this.computeBuff.notAp = false
            }
            return true
        }
        if (harmType == 2 && this.computeBuff.notAp) {
            if (isAtkEnd) {
                this.computeBuff.notAp = false
            }
            return true
        }
        else if (harmType == 3) {
            if (!this.isAD && this.computeBuff.notAp) {
                if (isAtkEnd) {
                    this.computeBuff.notAp = false
                }
                return true
            }
        }
        return false
    }
    /**无法进行下一回合的法术攻击*/
    public notApAtk() {
        if (this.computeBuff.isDefAp) {
            this.computeData.isDefAp = true
            return
        }
        this.computeBuff.notAp = true
        this.computeData.notAp = true
    }
    /**无法进行下一回合的行动*/
    public notAtk() {
        if (this.computeBuff.isDefAp) {
            this.computeData.isDefAp = true
            return
        }
        this.computeBuff.notActive = true
        this.computeData.notActive = true
    }
    /**转生后恢复{30%}的血量*/
    public resumeHp(n, isRevive = false) {
        if (isRevive) { //复活
            this.computeHp = this.maxHp
            this.computeData.harm = - this.computeHp
            this.computeData.harmHp = - this.computeHp
            this.computeData.isRevive = true
            return
        }
        let num = this.maxHp * n >> 0
        this.computeData.reHp = num
        this.computeHp += num //更新hp
        // console.log('转生:' + this.pos)
        // this.harmHp(-num, 4)
    }

    public harmHp(num: number, harmType: number, atkerPos = -1) {
        this.computeData.harm = num >> 0
        if (num > 0) {
            let isAD = false
            if (harmType == 3) {
                isAD = this.isAD
            }
            else {
                isAD = harmType == 1
            }
            let msg = isAD ? MessageType.harmeAd : MessageType.harmeAp
            this.computeData.isHarmAd = isAD

            this.dispatch(msg, null)
            this.checkComputeData(atkerPos)
        }
        else {
            this.checkComputeData(atkerPos)
        }
    }


    /**设置反击值*/
    setAtkBack(num: number) {
        this.computeData.atkBack = num
    }
    /**设置被反击值*/
    setAtkBacked(num: number, backerPos: number) {
        if (this.isDie()) {
            return false
        }
        this.harmHp(num, 2, backerPos)
        return true
    }

    /**
     * 闪避伤害
     */
    setDef() {
        this.computeData.isDef = true;
    }

    /**
     * 更新攻击力
     * @param  {number} val
     * @param  {boolean=false} per
     */
    updateDamage(val: number, per: boolean = false) {
        if (ObjectUtil.isNull(val)) return;
        if (per) {
            let up = Math.floor(this.computeDamage * val)
            this.computeDamage += up
            this.computeData.damageUp = up
            if (this.computeDamage < 0) {
                this.computeData.damageUp = - up + this.computeDamage
                this.computeDamage = 0
            }
        }
        else {
            this.computeDamage += val
            this.computeData.damage = val
            if (this.computeDamage < 0) {
                this.computeData.damage = - val + this.computeDamage
                this.computeDamage = 0
            }
        }
    }

    /**受到物理攻击时减少*点伤害。*/
    setAdSubHarm(harm: number) {
        this.computeBuff.adSubHarm = harm
    }
    /**
     * *受到法术攻击时减少*点伤害
     */
    setApSubHarm(harm: number) {
        this.computeBuff.apSubHarm = harm
    }

    setDefAp() {
        this.computeBuff.isDefAp = true
    }

    setMaxApHarm(value: number) {
        this.computeBuff.maxApHarm = value
    }

    setMaxAdHarm(value: number) {
        this.computeBuff.maxAdHarm = value
    }


    computeData: ComputeData = {}
    private checkComputeData(atkerPos = -1) {
        if (this.computeData == null) {
            return
        }
        let data = this.computeData
        if (data.triggerBurn == 1) {
            data.harm = this.computeHp
            data.harmHp = this.computeHp
            data.isHarmAd = false
            this.computeHp = 0
            this.dispatch(MessageType.dieing) //死亡时 可能转生
            this.computeHp <= 0 && this.dispatch(MessageType.die, atkerPos)
            return
        }
        if (data.harm > 0) {
            if (data.isDef) {
                data.harmHp = 0
            }
            else if (this.computeBuff.isDefAp && !data.isHarmAd) {
                data.harmHp = 0
                data.isDefAp = true
            }
            else {
                if (this.computeHp <= data.harm) {
                    let harm = this.checkHarm(data.harm)

                    if (harm >= this.computeHp) {
                        data.harmHp = this.computeHp
                        this.computeHp = 0
                        this.dispatch(MessageType.dieing) //死亡时 可能转生
                        this.computeHp <= 0 && this.dispatch(MessageType.die, atkerPos)
                    }
                    else {
                        data.harmHp = harm
                        this.computeHp -= data.harmHp //更新hp
                    }
                }
                else {
                    let harm = data.harm
                    data.harmHp = this.checkHarm(harm)
                    this.computeHp -= data.harmHp //更新hp
                }
            }
        }
        else if (data.harm < 0) {
            let hp = this.maxHp - this.computeHp + data.harm > 0 ? (-data.harm) : this.maxHp - this.computeHp
            data.harmHp = -hp
            this.computeHp += hp //更新hp
        }
        else {
            data.harmHp = 0
        }
    }
    /**最大承受**伤害 **伤害减少  后的伤害*/
    private checkHarm(num: number) {
        let data = this.computeData
        let harm = num
        if (this.computeBuff.adSubHarm && data.isHarmAd) {
            harm = harm > this.computeBuff.adSubHarm ? (harm - this.computeBuff.adSubHarm) : 0
            this.computeData.adSubHarm = data.harm - harm
        }
        if (this.computeBuff.apSubHarm && !data.isHarmAd) {
            harm = harm > this.computeBuff.apSubHarm ? (harm - this.computeBuff.apSubHarm) : 0
            this.computeData.apSubHarm = data.harm - harm
        }
        if (this.computeBuff.maxAdHarm && data.isHarmAd) {
            if (harm > this.computeBuff.maxAdHarm) {
                harm = this.computeBuff.maxAdHarm
                this.computeData.maxAdHarm = this.computeBuff.maxAdHarm
            }
        }
        if (this.computeBuff.maxApHarm && !data.isHarmAd) {
            if (harm > this.computeBuff.maxApHarm) {
                harm = this.computeBuff.maxApHarm
                this.computeData.maxApHarm = this.computeBuff.maxApHarm
            }
        }
        return harm
    }
    /** 
     * mode 0  1死契  2自爆
     */
    clearComputeData(mode = 0) {
        let obj = {} as any
        if ((mode == 0 || mode != 1) && this.computeData.dieContract > 0) {
            obj.dieContract = this.computeData.dieContract
        }
        if ((mode == 0 || mode != 2) && this.computeData.dieBoom) {
            obj.dieBoom = this.computeData.dieBoom
        }
        this.computeData = obj
    }

    message
    dispatch(type: MessageType, parms = null) {
        if (this.message == null) {
            return false
        }
        if (this.message[type] == null) {
            return false
        }
        for (let obj of this.message[type]) {
            obj.fun(this, obj.skillId, parms)
        }
        return true
    }
    addListener(type: MessageType, fun: Function, skillId) {
        if (this.message == null) {
            this.message = {}
        }
        if (this.message[type] == null) {
            this.message[type] = []
        }
        this.message[type].push({ fun: fun, skillId: skillId })
    }
    removeAllListener() {
        this.message = {}
    }
}