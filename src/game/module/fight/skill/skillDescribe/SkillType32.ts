/*
 * @Author: gravitycat 
 * @Date: 2020-09-19 17:46:08 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-24 15:23:12
 */
class SkillType32 extends SkillTypeBase {
    skilltype = 1032

    attack(skill, entity: NewMonsterEntity, specialPos: -1 | -2): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let pos: number
        if (entity) {
            pos = entity.pos
        }
        else {
            pos = specialPos == -1 ? 0 : 6
        }
        let other = RoundPlay.ins().getObjects(pos, skill.object)
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