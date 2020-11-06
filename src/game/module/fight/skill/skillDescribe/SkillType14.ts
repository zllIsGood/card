/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:48:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 15:56:02
 */
class SkillType14 extends SkillTypeBase {
    skilltype = 1014

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value
        let atked = []
        let item: NewMonsterEntity = null
        for (let i in other) { //给予敌方当前拥有最少体力卡牌*点伤害。
            let enemy = other[i]
            if (enemy) {
                if (item) {
                    let hp1 = item.computeHp
                    let hp2 = enemy.computeHp
                    if (hp2 < hp1) {
                        item = enemy
                    }
                }
                else {
                    item = enemy
                }

            }
        }
        atked.push(item)
        item.harmHp(num, skill.harmType, entity.pos)
        return { atker: entity, atked: atked }
    }

}
SkillTypeBase.setType(new SkillType14())