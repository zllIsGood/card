/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-18 16:04:19 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-18 17:57:02
 */
class SkillType2 extends SkillTypeBase {
    skilltype = 1002

    handle(entity: NewMonsterEntity, skillId, parms) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        entity.harmHp(-vals, cfg.harmType, entity.pos)
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmOtherAp, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType2())