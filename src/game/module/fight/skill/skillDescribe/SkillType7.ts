/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 12:12:24 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 19:03:19
 */
class SkillType7 extends SkillTypeBase {
    skilltype = 1007

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let rans = skill.value[1]
        let atked = []

        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                let hp = MathUtils.limitInteger(rans[0], rans[1])
                enemy.harmHp(hp, skill.harmType, entity.pos)
            }
        }
        return { atker: entity, atked: atked }
    }

    initValue(str: string) {
        let arr = str.split(';')
        let ret = []
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
                ret.push(Number(arr[i]))
            }
            else if (i == 1) {
                let arr2 = arr[i].split(',')
                let ret2 = []
                for (let num of arr2) {
                    ret2.push(Number(num))
                }
                ret.push(ret2)
            }
        }
        return ret
    }
}
SkillTypeBase.setType(new SkillType7())