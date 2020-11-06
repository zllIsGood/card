/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:48:00 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 19:28:18
 */
class SkillType13 extends SkillTypeBase {
    skilltype = 1013

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let hp = skill.value[1]
        let atked = []
        for (let i = 0; i < num; i++) { //恢复我方*张卡牌*点血量。
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.harmHp(-hp, skill.harmType)
            }
        }
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
SkillTypeBase.setType(new SkillType13())