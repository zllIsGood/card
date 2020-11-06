/* 
 * @Author: gravitycat 
 * @Date: 2020-09-19 17:50:59 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 11:18:32
 */
class SkillType31 extends SkillTypeBase {
    skilltype = 1031

    handle(entity: NewMonsterEntity, skillId, parms: NewMonsterEntity[]) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        parms[0].setFireEndHarm(vals)
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmeAdAndOther, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType31())