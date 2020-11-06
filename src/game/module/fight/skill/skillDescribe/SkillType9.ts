/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-19 14:20:06 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 19:27:58
 */
class SkillType9 extends SkillTypeBase {
    skilltype = 1009

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let hp = skill.value[1]
        let hp2 = skill.value[2]
        let atked = []
        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.harmHp(hp, skill.harmType, entity.pos)
                enemy.setAtkEndHarm(hp2)
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
SkillTypeBase.setType(new SkillType9())