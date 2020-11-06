/* 匹配成功ui
 * @Author: gravitycat 
 * @Date: 2020-10-14 14:11:45 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-10-21 11:15:20
 */
class MatchShowWin extends BaseEuiView {
    public constructor() {
        super();
        this.skinName = 'MatchShowSkin'
        //this.imghead.mask = this.rectbg
    }
    rectbg: eui.Rect
    imghead: eui.Image
    data: any
    matchinfo: BattleInfo
    userinfo: BattleInfo
    public open(...param: any[]): void {
        this.data = FightModel.ins().fightData
        this.upView()
        TimerManager.ins().setTimeOut(2000, this.closemyself, this)
    }

    private closemyself() {
        ViewManager.ins().close(this)
        FightManager.ins().play()
    }

    private upView() {
        let matchinfo = this.data.matchInfo
        let user = this.data.userInfo
        this.matchinfo.data = { source: matchinfo.userInfo.avatar, name: matchinfo.userInfo.nickname, honor: matchinfo.honor, winrate: matchinfo.cbTotal == 0 ? 0 : Math.ceil(matchinfo.cbWin / matchinfo.cbTotal) * 100 + "%" }
        this.userinfo.data = { source: user.userInfo.avatar, name: user.userInfo.nickname, honor: user.honor, winrate: Math.ceil(user.cbWin / user.cbTotal) * 100 + "%" }

    }

    public close(...param: any[]): void {
        TimerManager.ins().remove(this.closemyself, this)
    }
}
ViewManager.ins().reg(MatchShowWin, LayerManager.UI_Popup);