/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:55:31
 */
class SkillType27 extends SkillTypeBase {
    skilltype = 1027

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        for (let i in parms) {
            let item = parms[i]
            item.harmHp(num, cfg.harmType, entity.pos)
            item.updateDamage(-num)
        }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAd, this.handle.bind(this), skillId)
    }

}
SkillTypeBase.setType(new SkillType27())