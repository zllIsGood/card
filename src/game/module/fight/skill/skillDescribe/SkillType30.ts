/* 摧毁  防御无效
 * @Author: gravitycat 
 * @Date: 2020-09-19 18:08:53 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-24 16:15:18
 */
class SkillType30 extends SkillTypeBase {
    skilltype = 1030

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let ran = skill.value
        let atked = []
        let enemy = other[MathUtils.limitInteger(0, other.length - 1)]
        atked.push(enemy)
        let bool = Math.random() <= ran
        if (bool) {
            enemy.triggerBurn()
        }
        return { atker: entity, atked: atked }
    }

}
SkillTypeBase.setType(new SkillType30())