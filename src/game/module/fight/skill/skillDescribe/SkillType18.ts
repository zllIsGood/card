/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 16:10:48 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 16:18:44
 */
class SkillType18 extends SkillTypeBase {
    skilltype = 1018

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let hp = skill.value
        let atked = []
        entity.harmHp(-hp, skill.harmType)
        return { atker: entity, atked: atked }
    }

}
SkillTypeBase.setType(new SkillType18())