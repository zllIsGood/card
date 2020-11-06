/* 免疫法术伤害以及影响
 * @Author: gravitycat 
 * @Date: 2020-09-19 16:16:44 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-19 16:18:34
 */
class SkillType37 extends SkillTypeBase {
    skilltype = 1037


    // handle(entity: NewMonsterEntity, skillId, parms) {   
    //     entity.setDefAp();
    // }

    addListener(entity: NewMonsterEntity, skillId) {
        // entity.addListener(MessageType.harmeAp, this.handle.bind(this), skillId)
        entity.setDefAp();
    }
}
SkillTypeBase.setType(new SkillType37())