/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-18 16:19:44 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-24 15:03:41
 */
class SkillType5 extends SkillTypeBase {
    skilltype = 1005

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
        let ran = skill.value[2]
        let atked = []
        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                enemy.harmHp(hp, skill.harmType, entity ? entity.pos : -1)
                let bool = Math.random() <= ran
                bool && enemy.notApAtk()
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
SkillTypeBase.setType(new SkillType5())