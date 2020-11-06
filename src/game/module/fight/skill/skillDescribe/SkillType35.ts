/* 所受法术伤害限制
 * @Author: gravitycat 
 * @Date: 2020-09-19 16:32:22 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 20:15:19
 */
class SkillType35 extends SkillTypeBase {
    skilltype = 1035

    // handle(entity: NewMonsterEntity, skillId, parms) {  
    //     let cfg = GlobalConfig.getSkillCfg(skillId) 
    //     entity.setMaxApHarm(cfg.value)
    // }

    addListener(entity: NewMonsterEntity, skillId) {
        // entity.addListener(MessageType.harmeAp, this.handle.bind(this), skillId)
        let cfg = GlobalConfig.getSkillCfg(skillId)
        entity.setMaxApHarm(cfg.value)
    }
}
SkillTypeBase.setType(new SkillType35())