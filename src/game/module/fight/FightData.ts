/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 14:51:40 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 17:15:04
 */
class FightData {

    /**站位坐标*/
    public static points = [
        { x: 159, y: 806 }, //1
        { x: 375, y: 806 },
        { x: 591, y: 806 },
        { x: 159, y: 1074 },
        { x: 375, y: 1074 },
        { x: 591, y: 1074 },
        { x: 159, y: 162 }, //7
        { x: 375, y: 162 },
        { x: 591, y: 162 },
        { x: 159, y: 430 },
        { x: 375, y: 430 },
        { x: 591, y: 430 },
    ]

    public static skillNameIcon = {
        '1004': 'skill_xainjin',
        '1005': 'skill_luol',
        '1006': 'skill_bd',
        '1007': 'skill_huoqiu',
        '1008': 'skill_xuelian', //血炼
        '1009': 'skill_duye',
        '1012': 'skill_zhiliao',
        '1013': 'skill_ganling',
        '1014': 'skill_juji',
        '1015': 'skill_hensao',
        '1016': 'skill_benyzl',
        '1017': 'skill_benyuansh',
        '1018': 'skill_huichun',
        '1022': 'skill_qtxr',
        '1023': 'skill_qungongtisheng',
        '1028': 'skill_wenyi',
        '1029': 'skill_fh',
        '1030': 'skill_cuih',
        '1032': 'skill_lieyanfengsh',
        "1042": 'skill_putonggj',// 普通物理攻击
        "1043": 'skill_putonggj',

        '1003': 'skill_wlfj',//物理反击
        '1019': 'skill_zhuansheg',//转生
        '1024': 'skill_zibao',//自爆 
        '1036': 'skill_budong',//不动
        '1037': 'skill_mianyi',//免疫
        '1039': 'skill_wlsb',//物理闪避
        '1040': 'skill_fssb',//法术闪避
    }

    public static getSkillName(skillId) {
        if (skillId >= 41 && skillId <= 48) { //霜冻
            return 'skill_sd'
        }
        else if (skillId >= 53 && skillId <= 60) { //火墙
            return 'skill_huoqiang'
        }
        else if (skillId >= 73 && skillId <= 80) { //毒雾
            return 'skill_dw'
        }
        else if (skillId >= 146 && skillId <= 149) { //攻击提升
            return 'skill_gjtsheng'
        }
        else if (skillId >= 205 && skillId <= 231) { //死契
            if (skillId <= 208) {
                return 'skill_siqhq'
            }
            else if (skillId <= 212) {
                return 'skill_sqlhsd'
            }
            else if (skillId <= 216) {
                return 'skill_sqsd'
            }
            else if (skillId <= 220) {
                return 'skill_sqdw'
            }
            else if (skillId <= 224) {
                return 'skill_siwgl'
            }
            else if (skillId <= 228) {
                return 'skill_siqixj'
            }
            else if (skillId <= 231) {
                return 'skill_siqhq'
            }
        }
        let cfg = GlobalConfig.getSkillCfg(skillId)
        return this.skillNameIcon[cfg.type]
    }
}