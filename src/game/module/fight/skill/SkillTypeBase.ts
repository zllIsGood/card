/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-17 17:18:11 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-24 12:22:44
 */
class SkillTypeBase {
    public skilltype: number

    /**攻击*/
    public attack(skill, entity: NewMonsterEntity, pos: number = null): { atker: NewMonsterEntity, atked: NewMonsterEntity[] } {
        return null
    }

    public addListener(entity: NewMonsterEntity, skillId) {

    }

    public initValue(str) {
        return null
    }

    public static allType = {}
    public static setType(classobject: SkillTypeBase) {
        let type = classobject.skilltype
        this.allType[type] = classobject
    }
    public static getType(type): SkillTypeBase {
        return this.allType[type]
    }

    /**获取延时ms*/
    public static getDeleyTime(type: number): number {
        if (type == 1008) {
            return this.skillTime[1001]
        }
        // else if (type == 1012 || type == 1013) {
        //     return (600 * 2)
        // }
        else if (type == 1022 || type == 1023 || type == 1016) {
            return this.skillTime[this.skillStr[type]]
        }
        else {
            return 600
        }
    }
    /**获取特效*/
    public static getMC(skillId: number): string {
        let cfg = GlobalConfig.getSkillCfg(skillId)
        if (cfg.type == 1043) {
            if (skillId == 245) {
                return '10432'//雷电
            }
            if (skillId == 246) {
                return '1007'//火球
            }
            if (skillId == 247) {
                return '10434' //   冰球攻击
            }
            if (skillId == 248) {
                return "bloodatk"//  血滴攻击
            }
        }
        let str = this.skillStr[cfg.type]
        if (str) {
            return str
        }
        return '1007'
    }

    public static SkillSound = {
        '1016': 'atk_up',
        '1041': 'atk_up',
        '1006': '1006',
        '10434': '1006',
        '1033': '1030',
        '1030': '1030',
        '1009': '10091',
        '1035': '1010',
        '1011': '1010',
        '1029': 'atk_up',
        '1007': '1007',
        '1028': '1028',
        '1027': '1028',
        '10051': '1005',
        '10061': '1006',
        '10091': '10091',
        '10341': '10341',
        '1037': '1010',
        '1005': '1005',
        'ptgj': 'ptgj',
        '10432': '1005',
        '1031': '1031',
        '1032': '1031',
        '1039': '1039',
        '1040': '1039',
        '1025': '1025',
        '1010': '1010',
        '1004': '1004',
        '1008': '1030',
        '1012': 'atk_up',
        '1001': 'atk_up',
        '1017': 'atk_up',
        '1018': 'atk_up',
        '1019': 'atk_up',
        '1014': '1014',
        'atk_down': 'atk_down',
        '1042': 'ptgj',
        '1015': 'ptgj',
        'atk_up': 'atk_up',
        'bloodatk': "ptgj"
    }

    private static skillStr = {
        '1004': '1004',
        '1005': '1005',
        '1006': '10434', //'1006',
        '1007': '1007',
        '1008': '1008',
        '1009': '1009',
        '1012': '1001', //
        '1013': '1001', //
        '1014': '1014',
        '1015': '1015',
        '1016': "atk_up",//'1016',
        '1017': '1001', //
        '1018': '1001', //
        '1022': 'atk_down', //
        '1023': 'atk_up', //
        '1028': '1028', //
        '1029': '1029',
        '1030': '1030',
        '1032': '1031',
        '1042': '1042',// 物理攻击
        // '1043': null,
    }
    private static skillTime = {
        '1001': 1125,
        '1004': 666,
        '1005': 1166,
        '10051': 250,
        '1006': 1625,
        '1007': 666,
        '1008': 792,
        '1009': 833,
        '10091': 1000,
        '1010': 708,
        '1011': 792,
        '1014': 750,
        '1015': 708,
        '1016': 875,
        '1019': 958,
        '1021': 1083,
        '1024': 666,
        '1028': 958,
        '1029': 625,
        '1030': 1250,
        '1031': 1250,
        '1033': 833,
        '10341': 563,
        '1037': 2000,
        '1039': 750,
        '1042': 938,
        '10432': 1188,
        '10434': 792,
        'bloodatk': 467,
        'atk': 1000,
        'atk_up': 1000,
        'atk_down': 1000
    }
    /**
     * @param  {} str 
     */
    public static getSkillTime(str): number {
        let ret = this.skillTime[str]
        ret = ret ? ret : 0
        return ret
    }
}