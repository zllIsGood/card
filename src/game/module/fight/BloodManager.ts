/* 飘血管理器
 * @Author: zhoulanglang 
 * @Date: 2020-09-09 18:13:12 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 16:23:27
 */
class BloodManager extends BaseClass {
    public static ins(): BloodManager {
        return super.ins();
    }

    public constructor() {
        super();
    }

    /**pos位置 value伤害值*/
    public playDamege(pos: number, value: string, isHarm: boolean, rate = 1) {
        let point = FightData.points[pos]
        let valStr = value //>= 0 ? ('+' + value) : value.toString()
        let font = isHarm ? 'fnt_shanghai' : 'fight_num_green'
        let blood = BitmapNumber.ins().createNumPicWithFullName(valStr, font)
        blood.x = point.x
        blood.y = point.y

        let mapView = FightManager.ins().mapView
        mapView._bloodLayer.addChild(blood)

        blood.scaleX = 0.8
        blood.scaleY = 0.8
        blood.alpha = 1
        let tw = egret.Tween.get(blood)
        tw.to({
            y: point.y - 40,
            'scaleX': 1,
            'scaleY': 1
        }, 200 / rate).wait(200 / rate).to({
            alpha: 0,
            'scaleX': 1,
            'scaleY': 1
        }, 200 / rate).call(() => {
            BitmapNumber.ins().desstroyNumPic(blood)
        })
    }

}