/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:37:09 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 14:42:18
 */
class SkillType10 extends SkillTypeBase {
    skilltype = 1010

    // handle(entity: NewMonsterEntity, skillId, parms) {
    //     let cfg = GlobalConfig.getSkillCfg(skillId)
    //     let vals = cfg.value
    //     entity.setAdSubHarm(vals)
    // }

    addListener(entity: NewMonsterEntity, skillId) {
        // entity.addListener(MessageType.harmeAd, this.handle.bind(this), skillId)
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        entity.setAdSubHarm(vals)
    }
}
SkillTypeBase.setType(new SkillType10())