/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 17:43:07
 */
class SkillType24 extends SkillTypeBase {
    skilltype = 1024

    handle(entity: NewMonsterEntity, skillId, atkPos: number) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let num = cfg.value
        if (atkPos != null) {
            let pos = atkPos != -1 ? atkPos : -2
            entity.computeData.dieBoom = { harm: num, pos: pos }
        }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.die, this.handle.bind(this), skillId)
        entity.setDieBoom()
    }

}
SkillTypeBase.setType(new SkillType24())