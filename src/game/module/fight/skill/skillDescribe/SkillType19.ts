/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 16:36:32
 */
class SkillType19 extends SkillTypeBase {
    skilltype = 1019

    handle(entity: NewMonsterEntity, skillId, parms) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value[0]
        let hp = cfg.value[1]
        let bool = Math.random() <= num
        if (bool) {
            entity.resumeHp(hp)
        }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.dieing, this.handle.bind(this), skillId)
    }

    initValue(str: string) {
        let arr = str.split(';')
        let ret = []
        for (let i = 0; i < arr.length; i++) {
            ret.push(Number(arr[i]))
        }
        return ret
    }
}
SkillTypeBase.setType(new SkillType19())