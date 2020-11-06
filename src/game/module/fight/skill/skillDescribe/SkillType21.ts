/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:36:33
 */
class SkillType21 extends SkillTypeBase {
    skilltype = 1021

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        for (let i in parms) {
            let item = parms[i]
            item.updateDamage(-num)
        }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAp, this.handle.bind(this), skillId)
    }

}
SkillTypeBase.setType(new SkillType21())