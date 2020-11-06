/*
 * @Author: gravitycat 
 * @Date: 2020-09-19 18:59:41 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-23 10:47:36
 */
class SkillType28 extends SkillTypeBase {
    skilltype = 1028

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object, true)
        if (other.length == 0) {
            return null
        }
        let value = skill.value
        let atked = []
        for (let i = 0; i < other.length; i++) {
            let single = other[i]
            if (single) {
                atked.push(single)
                single.harmHp(value, skill.harmType, entity.pos)
                single.updateDamage(-value)
            }
        }
        return { atker: entity, atked: atked }
    }
}
SkillTypeBase.setType(new SkillType28())