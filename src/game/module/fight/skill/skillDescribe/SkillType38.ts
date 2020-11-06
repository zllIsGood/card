/* 暂定 死契
 * @Author: gravitycat 
 * @Date: 2020-09-19 15:51:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 14:49:56
 */
class SkillType38 extends SkillTypeBase {
    skilltype = 1038

    handle(entity: NewMonsterEntity, skillId, parms) {
        // let cfg = GlobalConfig.getSkillCfg(skillId)
        // let vals = cfg.value
        entity.computeData.dieContract = skillId
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.die, this.handle.bind(this), skillId)
        entity.setDieContract()
    }
}
SkillTypeBase.setType(new SkillType38())