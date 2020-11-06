/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-18 17:40:10 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-18 17:57:07
 */
class SkillType3 extends SkillTypeBase {
    skilltype = 1003

    handle(entity: NewMonsterEntity, skillId, parms) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        entity.setAtkBack(vals)
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmeAd, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType3())