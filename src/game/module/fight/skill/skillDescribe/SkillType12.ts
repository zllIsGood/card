/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:48:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-19 14:53:59
 */
class SkillType12 extends SkillTypeBase {
    skilltype = 1012

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let hp = skill.value[1]
        let atked = []
        let item: NewMonsterEntity = null
        for (let i in other) { //恢复我方1张损失血量最多的卡牌*点血量。
            let enemy = other[i]
            if (enemy) {
                if (item) {
                    let hp1 = item.maxHp - item.computeHp
                    let hp2 = enemy.maxHp - enemy.computeHp
                    if (hp2 > hp1) {
                        item = enemy
                    }
                }
                else {
                    item = enemy
                }

            }
        }
        atked.push(item)
        item.harmHp(-hp, skill.harmType)
        return { atker: entity, atked: atked }
    }

    initValue(str: string) {
        let arr = str.split(';')
        let ret = []
        for (let i = 0; i < arr.length; i++) {
            ret.push(Number(arr[i]))
        }
        return ret
    }
}
SkillTypeBase.setType(new SkillType12())