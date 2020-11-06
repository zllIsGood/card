/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:35:36
 */
class SkillType20 extends SkillTypeBase {
    skilltype = 1020

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        for (let i in parms) {
            let item = parms[i]
            item.updateDamage(-num)
        }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAd, this.handle.bind(this), skillId)
    }

}
SkillTypeBase.setType(new SkillType20())