/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:50:05
 */
class SkillType25 extends SkillTypeBase {
    skilltype = 1025

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        entity.updateDamage(num)
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAd, this.handle.bind(this), skillId)
        entity.addListener(MessageType.harmOtherAp, this.handle.bind(this), skillId)
    }

}
SkillTypeBase.setType(new SkillType25())