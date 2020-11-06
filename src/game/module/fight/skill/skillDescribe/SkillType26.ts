/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:53:45
 */
class SkillType26 extends SkillTypeBase {
    skilltype = 1026

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        entity.updateDamage(num)
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmeAd, this.handle.bind(this), skillId)
    }

}
SkillTypeBase.setType(new SkillType26())