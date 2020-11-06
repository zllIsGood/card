/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 18:32:30
 */
class SkillType124 extends SkillTypeBase {
    skilltype = 1124

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        entity.computeData.dieBoom = { harm: num, pos: -1 }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.die, this.handle.bind(this), skillId)
        entity.setDieBoom()
    }

}
SkillTypeBase.setType(new SkillType124())