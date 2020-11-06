/*
 * @Author: gravitycat 
 * @Date: 2020-09-19 17:46:08 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-23 10:51:00
 */
class SkillType32 extends SkillTypeBase {
    skilltype = 1032

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value
        let atked = []
        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.setFireEndHarm(num)
            }
        }
        return { atker: entity, atked: atked }
    }
}
SkillTypeBase.setType(new SkillType32())