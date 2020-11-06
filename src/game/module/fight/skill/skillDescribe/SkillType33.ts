/* 所受物理伤害限制
 * @Author: gravitycat 
 * @Date: 2020-09-19 17:21:23 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 20:14:59
 */
class SkillType33 extends SkillTypeBase {
    skilltype = 1033

    // handle(entity: NewMonsterEntity, skillId, parms) {  
    //     let cfg = GlobalConfig.getSkillCfg(skillId)
    //     let vals = cfg.value
    //     entity.setMaxAdHarm(vals)
    // }

    addListener(entity: NewMonsterEntity, skillId) {
        // entity.addListener(MessageType.harmeAd, this.handle.bind(this), skillId)
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        entity.setMaxAdHarm(vals)
    }
}
SkillTypeBase.setType(new SkillType33())