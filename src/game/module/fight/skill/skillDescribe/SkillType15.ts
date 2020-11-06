/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:48:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-24 16:33:12
 */
class SkillType15 extends SkillTypeBase {
    skilltype = 1015

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let other1 = [], other2 = []
        let dp = entity.pos < 6 ? 0 : 6
        for (let i of other) {
            if ((i.pos - 6) < 3) {
                other1.push(i)
            }
            else {
                other2.push(i)
            }
        }
        other = other1.length > 0 ? other1 : other2 //使用普通攻击对一排卡牌进行伤害
        let num = entity.computeDamage
        let atked = []
        let harmType = entity.isAD ? 1 : 2
        for (let i = 0; i < other.length; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.harmHp(num, harmType, entity.pos)
            }
        }
        return { atker: entity, atked: atked }
    }

}
SkillTypeBase.setType(new SkillType15())