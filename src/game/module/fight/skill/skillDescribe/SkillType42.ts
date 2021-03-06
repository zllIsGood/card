/* 物理攻击
 * @Author: gravitycat 
 * @Date: 2020-09-19 12:25:04 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-12-07 14:28:59
 */
class SkillType42 extends SkillTypeBase {
    skilltype = 1042

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
SkillTypeBase.setType(new SkillType42())