/*
 * @Author: zhoualnglang 
 * @Date: 2020-03-31 11:27:54 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-12-07 18:39:11
 */
class GlobalConfig {

    public static init(data) {
        // console.log(data)
        this.config = data
        this.initSkill()
        this.initMonster()
        this.initQuestion()
    }

    public static initDG(data) {
        // console.log(data)
        this.dgcf = data
    }

    public static initMonster() {
        let cfg = this.config.monsterConfig
        for (let i in cfg) {
            let item = cfg[i]
            item.upgradeNum = (item.upgradeNum as string).split('_')
            item.upgradeGold = item.upgradeGold.split('_')
            let minLv = 0
            for (let k = 0; k < item.upgradeNum.length; k++) {
                if (item.upgradeNum[k] > 0) {
                    break;
                }
                minLv++
            }
            item.minLv = minLv
        }
    }

    public static initSkill() {
        let cfg = this.config.skillConfig
        for (let i in cfg) {
            let item = cfg[i]
            let stype = SkillTypeBase.getType(item.type)
            if (stype == null) {
                continue;
            }
            let ret = stype.initValue(item.value)
            if (ret != null) {
                item.value = ret
            }
        }
    }

    public static initQuestion() {
        let cfg = this.config.questionConfig
        let count = 0
        for (let i in cfg) {
            let item = cfg[i]
            count++
            if (item.trueAnswer == "B") {
                item.trueAnswer = option.B
            }
            if (item.trueAnswer == "A") {
                item.trueAnswer = option.A
            }
        }
        cfg.length = count
    }

    public static init2(data) {
        // console.log(data)
        this.testCfg = data
        for (let obj of data.our) {
            if (obj) {
                if (obj.lv < 10) {
                    obj.skill3 = null
                }
                else if (obj.lv < 5) {
                    obj.skill2 = null
                }
            }
        }
        for (let obj of data.enemy) {
            if (obj) {
                if (obj.lv < 10) {
                    obj.skill3 = null
                }
                else if (obj.lv < 5) {
                    obj.skill2 = null
                }
            }
        }
    }
    public static testCfg

    public static config: { skillConfig, monsterConfig, questionConfig }



    public static dgcf
    /**获取单个技能配置*/
    public static getSkillCfg(id: number) {
        let cfg = this.config.skillConfig
        let ret = cfg && cfg[id] ? cfg[id] : null
        return ret
    }

    public static getQuestions() {
        return this.config.questionConfig
    }
    public static getMonsterCfg() {
        return this.config.monsterConfig
    }
    /**攻击力*/
    public static getMonsterAttack(id: number, lv: number) {
        let cfg = this.config.monsterConfig[id]
        let ret = cfg.attack + (lv >= cfg.minLv ? (lv - cfg.minLv) : 0) * cfg.atkPro
        return ret
    }
    /**生命值*/
    public static getMonsterHp(id: number, lv: number) {
        let cfg = this.config.monsterConfig[id]
        let ret = cfg.life + (lv >= cfg.minLv ? (lv - cfg.minLv) : 0) * cfg.lifePro
        return ret
    }

    public static helpImgUrl = '' // './resource/assets/other/help_cover.png'
}
window["GlobalConfig"] = GlobalConfig