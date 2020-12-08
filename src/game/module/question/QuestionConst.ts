/*
 * @Author: zhoulanglang 
 * @Date: 2020-11-24 11:27:14 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-28 17:34:55
 */
class QuestionConst {
    /**段位-技能*/
    private static zoomSkill = [
        [53, 95, 18, 30, 43, 75, 150, 140, 190], //青铜
        [54, 96, 19, 31, 44, 76, 151, 141, 191],
        [55, 97, 20, 32, 45, 77, 152, 142, 192],
        [56, 98, 21, 33, 46, 78, 153, 143, 193],
        [57, 99, 22, 34, 47, 79, 249, 144, 251],
        [58, 100, 23, 35, 48, 80, 250, 145, 252], //王者
    ]
    private static icons: string[][] = null
    /**通过段位获取主公要释放技能*/
    public static getSkillByZoom(zoom: ZoomLevel): { skillId: number, index: number, zoom: number } {
        let skillid = this.zoomSkill[zoom - 1]
        if (!skillid) {
            return null
        }
        let i = MathUtils.limitInteger(0, skillid.length - 1)
        return { skillId: skillid[i], index: i, zoom: zoom }
    }

    public static getSkillById(zoom: ZoomLevel, id: number) {
        let skillid = this.zoomSkill[zoom - 1]
        if (!skillid) {
            return null
        }
        for (let i = 0; i < skillid.length; i++) {
            if (id == skillid[i]) {
                return { skillId: id, index: i, zoom: zoom }
            }
        }
        return null
    }

    public static getIcons(zoom: ZoomLevel) {
        if (this.icons == null) {
            this.icons = []
            for (let i = 0; i < this.zoomSkill.length; i++) {
                let skill = this.zoomSkill[i]
                let icons = []
                for (let j = 0; j < skill.length; j++) {
                    let icon = FightData.getSkillName(skill[j]) + '_png'
                    icons.push(icon)
                }
                this.icons.push(icons)
            }
        }
        return this.icons[zoom - 1]
    }
    /**机器人*/
    private static zoomAI = [ //zoom 段位   pro 机器人成功概率   second秒  energy机器人答题怒气值  questionZoom题库中题目系数
        { zoom: { dan: 1, lv: 1, star: 2 }, pro: 0.7, second: 7, energy: 45, questionZoom: 1 },
        { zoom: { dan: 2, lv: 2, star: 3 }, pro: 0.7, second: 7, energy: 45, questionZoom: 2 },
        { zoom: { dan: 3, lv: 2, star: 1 }, pro: 0.8, second: 6, energy: 45, questionZoom: 3 },
        { zoom: { dan: 3, lv: 1, star: 1 }, pro: 0.8, second: 6, energy: 45, questionZoom: 4 },
        { zoom: { dan: 4, lv: 3, star: 1 }, pro: 0.6, second: 5, energy: 45, questionZoom: 5 },
        { zoom: { dan: 4, lv: 1, star: 1 }, pro: 0.6, second: 5, energy: 45, questionZoom: 6 },
        { zoom: { dan: 5, lv: 2, star: 1 }, pro: 0.5, second: 4, energy: 45, questionZoom: 7 },
        { zoom: { dan: 5, lv: 1, star: 1 }, pro: 0.5, second: 4, energy: 50, questionZoom: 8 },
        { zoom: { dan: 5, lv: 1, star: 1 }, pro: 0.5, second: 4, energy: 50, questionZoom: 9 },
    ]
    /**通过段位获取机器人配置*/
    public static getZoomAI(dan: number, lv: number, star: number) {
        let data = this.zoomAI
        let ret = data[data.length - 1]
        for (let i = data.length - 2; i >= 0; i--) {
            let item = data[i]
            if (this.isOK(dan, lv, star, item.zoom)) {
                return data[i + 1]
            }
            else {
                ret = item
            }
        }
        return ret
    }
    private static isOK(dan: number, lv: number, star: number, obj: { dan: number, lv: number, star: number }) {
        if (dan > obj.dan) {
            return true
        }
        else if (dan == obj.dan && lv < obj.lv) {
            return true
        }
        else if (dan == obj.dan && lv == obj.lv && star > obj.star) {
            return true
        }
        return false
    }
}