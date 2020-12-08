/*
 * @Author: zhoulanglang 
 * @Date: 2020-11-04 14:22:14 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-11-04 18:34:55
 */
/**开始战斗*/
function H5StartFight(data: string) {
    if (!H5Service.isReady) {
        console.log('还未就绪不能调用战斗！')
        return
    }
    if (FightManager.ins().isPlaying) {
        console.log('重复调用战斗了')
        return
    }
    // console.log('开始战斗:', data)
    data = StringUtils.deleteChangeLine(data)
    // data.replace('\\', '\\\\')
    // console.log(data)
    let obj = JSON.parse(data)
    FightModel.ins().setFightData(obj)
    UserModel.ins().isVip = !!obj.isVip
    App.ins().playH5()
}

class H5Service {
    public static isReady = false
    /**已就绪*/
    public static H5Ready() {
        if (window['AndroidJs'] && AndroidJs.H5Ready) {
            console.log('已就绪')
            this.isReady = true
            AndroidJs.H5Ready()
        }
    }
    /**战斗结果*/
    public static H5Result(isWin: boolean) {
        if (window['AndroidJs'] && AndroidJs.H5Result) {
            console.log('战斗结果', isWin)
            AndroidJs.H5Result(isWin)
        }
    }
}