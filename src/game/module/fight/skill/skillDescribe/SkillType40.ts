/* 被法术攻击一定概率不受攻击
 * @Author: gravitycat 
 * @Date: 2020-09-19 15:29:14 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-19 15:32:05
 */
class SkillType40 extends SkillTypeBase{
    skilltype = 1040

    handle(entity: NewMonsterEntity, skillId, parms) {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        let vals = cfg.value
        let bool = Math.random()<=vals
        if(bool){
            entity.setDef()
        }
      
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.addListener(MessageType.harmeAp, this.handle.bind(this), skillId)
    }
}
SkillTypeBase.setType(new SkillType40())