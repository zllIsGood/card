/*
 * @Author: zhoulanglang 
 * @Date: 2020-10-12 14:24:37 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-10-19 16:53:34
 */
/**段位*/
const enum ZoomLevel {
    Bronze = 1, //青铜 lv  1,2
    Silver = 2, //白银 lv 1,2
    Gold = 3, //黄金 lv 1,2
    Platinum = 4, //铂金 lv 1,2,3
    Diamond = 5, //钻石 lv 1,2,3
    Master = 6, //王者 lv 1
}

class UserConst {
    static zoomLevelName = ['青铜', '白银', '黄金', '铂金', '钻石', '王者']
    static zoomName = '段'

    /**5级解锁*/
    public static skill2Lv = 5
    /**10级解锁*/
    public static skill3Lv = 10
    /**最大等级*/
    public static maxLevel = 10

    public static skill2ZoomLv = ZoomLevel.Bronze //青铜一段 可释放
    public static skill2ZoomNum = 1 //青铜一段 可释放
    public static skill3ZoomLv = ZoomLevel.Silver //白银一段 可释放
    public static skill3ZoomNum = 1 //白银一段 可释放

    public static skill2ZoomText() {
        let ret = UserConst.zoomLevelName[this.skill2ZoomLv - 1] + StringUtils.NumberToChinese(this.skill2ZoomNum) + UserConst.zoomName + '可释放'
        return ret
    }
    public static skill3ZoomText() {
        let ret = UserConst.zoomLevelName[this.skill3ZoomLv - 1] + StringUtils.NumberToChinese(this.skill2ZoomNum) + UserConst.zoomName + '可释放'
        return ret
    }

    private static zoomIcon = [
        [{ icon: 'bronze_1_icon_png', lab: 'bronze_1_lab_png' }, { icon: 'bronze_2_icon_png', lab: 'bronze_2_lab_png' }],
        [{ icon: 'silver_1_icon_png', lab: 'silver_1_lab_png' }, { icon: 'silver_2_icon_png', lab: 'silver_2_lab_png' }],
        [{ icon: 'gold_1_icon_png', lab: 'gold_1_lab_png' }, { icon: 'gold_2_icon_png', lab: 'gold_2_lab_png' }],
        [{ icon: 'platinum_1_icon_png', lab: 'platinum_1_lab_png' }, { icon: 'platinum_2_icon_png', lab: 'platinum_2_lab_png' }, { icon: 'platinum_3_icon_png', lab: 'platinum_3_lab_png' }],
        [{ icon: 'diamond_1_icon_png', lab: 'diamond_1_lab_png' }, { icon: 'diamond_2_icon_png', lab: 'diamond_2_lab_png' }, { icon: 'diamond_3_icon_png', lab: 'diamond_3_lab_png' }],
        [{ icon: 'master_icon_png', lab: 'master_lab_png' }],
    ]
    /**段位图*/
    public static getZoomIcon(zoomLevel: number, zoomNum: number): string {
        let temp = this.zoomIcon[zoomLevel - 1]
        if (temp) {
            let obj = temp[zoomNum - 1]
            if (obj) {
                return obj.icon
            }
        }
        return ''
    }
    /**段位文本图*/
    public static getZoomLabImg(zoomLevel: number, zoomNum: number): string {
        let temp = this.zoomIcon[zoomLevel - 1]
        if (temp) {
            let obj = temp[zoomNum - 1]
            if (obj) {
                return obj.lab
            }
        }
        return ''
    }
}