/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-17 17:18:04 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-18 17:57:14
 */
class SkillType1 extends SkillTypeBase {
    skilltype = 1001

    handle(entity: NewMonsterEntity, skillId, parms) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        entity.harmHp(-vals, cfg.harmType)
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAd, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType1())