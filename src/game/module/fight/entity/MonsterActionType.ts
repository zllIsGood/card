/* 动作类型
 * @Author: zhoulanglang 
 * @Date: 2020-09-15 10:38:59 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-22 17:24:22
 */
const enum MonsterActionType {
    /**物理攻击*/
    atk_ad = 1,
    /**法术攻击*/
    atk_ap,
    /**被攻击*/
    attacked,
    /**闪避*/
    dodge,
    /**防御*/
    def,
    /**死亡*/
    die,
    /**移动*/
    move,
    /**摧毁*/
    destroy,
}