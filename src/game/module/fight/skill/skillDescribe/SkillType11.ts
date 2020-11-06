/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:37:09 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-19 17:40:32
 */
class SkillType11 extends SkillTypeBase {
    skilltype = 1011

    // handle(entity: NewMonsterEntity, skillId, parms) {
    //     let cfg = GlobalConfig.getSkillCfg(skillId)
    //     let vals = cfg.value
    //     entity.setApSubHarm(vals)
    // }

    addListener(entity: NewMonsterEntity, skillId) {
        // entity.addListener(MessageType.harmeAd, this.handle.bind(this), skillId)
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        entity.setApSubHarm(vals)
    }
}
SkillTypeBase.setType(new SkillType11())