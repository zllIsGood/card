/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:48:00 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-24 15:05:17
 */
class SkillType13 extends SkillTypeBase {
    skilltype = 1013

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