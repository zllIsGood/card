/*
 * @Author: zhoulanglang 
 * @Date: 2020-11-02 11:53:25 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-02 14:57:23
 */
class SkillNameManager extends BaseClass {
    public static ins(): SkillNameManager {
        return super.ins();
    }

    public constructor() {
        super();
    }

    /**pos位置 */
    public async playName(icon: string, pos: number, rate: number) {
        let img = new eui.Image()
        img.source = icon + '_png'
        img.alpha = 0

        let mapView = FightManager.ins().mapView
        mapView._bloodLayer.addChild(img)

        await TimerManager.ins().deleyPromisse(10)
        let point = FightData.points[pos]
        img.x = point.x - img.width / 2
        img.y = point.y - img.height / 2

        let tw = egret.Tween.get(img)
        tw.to({
            alpha: 1,
        }, 150 / rate).wait(300 / rate).to({
            alpha: 0,
        }, 150 / rate).call(() => {
            DisplayUtils.removeFromParent(img)
        })
    }

}