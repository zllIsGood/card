/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-17 17:34:53 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 19:28:50
 */
class SkillType4 extends SkillTypeBase {
    skilltype = 1004

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
        if (other.length == 0) {
            return null
        }
        let num = skill.value[0]
        let ran = skill.value[1]
        let atked = []
        for (let i = 0; i < num; i++) {
            let enemy = other[i]
            if (enemy) {
                atked.push(enemy)
                let bool = Math.random() <= ran
                bool && enemy.notAtk()
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
SkillTypeBase.setType(new SkillType4())