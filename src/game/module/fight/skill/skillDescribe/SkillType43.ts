/* 属性攻击
 * @Author: gravitycat 
 * @Date: 2020-09-19 12:12:05 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-12-07 14:27:19
 */
class SkillType43 extends SkillTypeBase {
    skilltype = 1043

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = entity.computeDamage
        let atked = []
        let enemy = other[0]
        atked.push(enemy)
        enemy.harmHp(num, skill.harmType, entity.pos)
        return { atker: entity, atked: atked }
    }

}
SkillTypeBase.setType(new SkillType43())