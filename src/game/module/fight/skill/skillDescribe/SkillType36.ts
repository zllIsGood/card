/* 不受摧毁技能影响 
 * @Author: gravitycat 
 * @Date: 2020-09-19 16:26:09 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-23 10:36:37
 */
class SkillType36 extends SkillTypeBase {
    skilltype = 1036

    addListener(entity: NewMonsterEntity, skillId) {
        entity.setUnBurn()
    }
}
SkillTypeBase.setType(new SkillType36())