/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-18 16:19:44 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-09-21 19:26:40
 */
class SkillType5 extends SkillTypeBase {
    skilltype = 1005

    attack(skill, entity: NewMonsterEntity): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        let other = RoundPlay.ins().getObjects(entity.pos, skill.object)
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
                enemy.harmHp(hp, skill.harmType, entity.pos)
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