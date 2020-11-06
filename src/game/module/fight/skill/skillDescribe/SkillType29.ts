/* 恢复多少血量  满血
 * @Author: gravitycat 
 * @Date: 2020-09-19 18:18:18 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-24 16:14:13
 */
class SkillType29 extends SkillTypeBase {
    skilltype = 1029

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object, true)
        if (other.length == 0) {
            return null
        }
        let ran = skill.value
        let atked = []
        let single = other[MathUtils.limitInteger(0, other.length - 1)]
        atked.push(single)
        let bool = Math.random() <= ran
        if (bool) single.resumeHp(0, true)
        return { atker: entity, atked: atked }
    }

    addListener(entity: NewMonsterEntity, skillId) {
        entity.setCanRevive()
    }
}
SkillTypeBase.setType(new SkillType29())