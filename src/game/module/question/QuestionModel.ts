/* 答题模块
 * @Author: zhoulanglang 
 * @Date: 2020-11-24 11:23:13 
 * @Last Modified by: gravitycat
 * @Last Modified time: 2020-12-01 18:07:39
 */
class QuestionModel extends BaseClass {

    public static ins(): QuestionModel {
        return super.ins();
    }

    public constructor() {
        super();
    }
    /**战斗结束清除数据*/
    public clearData() {
        TimerManager.ins().remove(this.timerAI, this)
        this.ownBar = 0
        this.enemyBar = 0
        this.ownSkill = null
        this.enemySkill = null
        this.ownBarTotal = 0
        this.enemyBarTotal = 0
        this.ownCount = 0
        this.enemyCount = 0
    }

    public ownSkill: { skillId: number, index: number, zoom: number, pos?: number }
    public getOwnSkill() {
        if (this.ownBar >= this.maxEnergy) {
            let zoom = FightModel.ins().getOwnZoom().dan
            this.ownSkill = QuestionConst.getSkillByZoom(zoom)
            return this.ownSkill.skillId
        }
        return null
    }
    public setOwnSkill(skillId: number) {
        let zoom = FightModel.ins().getOwnZoom().dan
        this.ownSkill = QuestionConst.getSkillById(zoom, skillId)
    }
    public enemySkill: { skillId: number, index: number, zoom: number, pos?: number }
    public getEnemySkill() {
        if (this.enemyBar >= this.maxEnergy) {
            let zoom = FightModel.ins().getEnemyZoom().dan
            this.enemySkill = QuestionConst.getSkillByZoom(zoom)
            return this.enemySkill.skillId
        }
        return null
    }
    public setEnemySkill(skillId: number) {
        let zoom = FightModel.ins().getEnemyZoom().dan
        this.enemySkill = QuestionConst.getSkillById(zoom, skillId)
    }

    /**开始机器人的能量值*/
    public starAI() {
        let zoom = FightModel.ins().getEnemyZoom()
        let cfg = QuestionConst.getZoomAI(zoom.dan, zoom.lv, zoom.star)
        TimerManager.ins().doTimer(cfg.second * 1000, 0, this.timerAI, this)
    }
    private timerAI() {
        let zoom = FightModel.ins().getEnemyZoom()
        let cfg = QuestionConst.getZoomAI(zoom.dan, zoom.lv, zoom.star)
        let bool = Math.random() < cfg.pro
        if (bool) {
            this.enemyBar += cfg.energy
        }
    }

    private _Subjects: Array<any> = new Array<any>()
    //private _Subjects: { content: string, selectA: string, selectB: string, correct: option }[];//题目列表
    private _cur: any
    private _renderItems: SubjectItem

    public maxEnergy = 100 //最大能量值

    /**是否正在播放主公技 */
    private _isPlaying: boolean;
    public get isPlaying(): boolean {
        return this._isPlaying;
    }
    public set isPlaying(v: boolean) {
        this._isPlaying = v;
        if (!v) {
            console.log('set false')
            this.next()
        }
        this.postBar()
    }

    /**我的能量值*/
    private _ownBar: number = 0;
    public get ownBar(): number {
        return this._ownBar;
    }
    public set ownBar(v: number) {
        let old = this._ownBar
        this._ownBar = v < 0 ? 0 : v;
        if (this._ownBar >= this.maxEnergy) {
            this.isPlaying = true
        }
        if (this._ownBar != old) {
            this.postBar()
        }
    }
    /**我的能量值累计*/
    public ownBarTotal = 0
    /**我方放答题技能次数*/
    public ownCount = 0
    /**敌方的能量值*/
    private _enemyBar: number = 0;
    public get enemyBar(): number {
        return this._enemyBar;
    }
    public set enemyBar(v: number) {
        let old = this._enemyBar
        this._enemyBar = v < 0 ? 0 : v;
        // if (this._enemyBar >= 100) {
        //     this.isPlaying = true
        // }
        if (this._enemyBar != old) {
            this.postBar()
        }
    }
    /**敌方的能量值累计*/
    public enemyBarTotal = 0
    /**敌方放答题技能次数*/
    public enemyCount = 0
    /**PVP中用于设置敌方的能量值*/
    public setEnemyEnergy(energy: number) {
        this.enemyBarTotal = energy
        this.enemyBar = this.enemyBarTotal - this.enemyCount * this.maxEnergy
    }
    /**PVP中用于发送我方的能量值*/
    public sendEnemyEnergy() {
        if (FightModel.ins().isPVP) {
            let msg = JSON.stringify({ mode: 3, energy: this.ownBarTotal })
            Socket.ins().send(BaseMsgAction.SEND_OTHER, msg)
        }
    }

    public initSubjects(renderitems: SubjectItem) {
        //测试数据
        // this._Subjects = [{
        //     content: "test1",
        //     selectA: "T1aaaaaa",
        //     selectB: "T1bbbbb",
        //     correct: option.A
        // }, {
        //     content: "test2",
        //     selectA: "T2aaaaaa",
        //     selectB: "T2aaaaaa",
        //     correct: option.B
        // }, {
        //     content: "test3",
        //     selectA: "T3aaaaaa",
        //     selectB: "T3aaaaaa",
        //     correct: option.B
        // }, {
        //     content: "test4",
        //     selectA: "T4aaaaaa",
        //     selectB: "T4aaaaaa",
        //     correct: option.B
        // }]
        //this._Subjects = MathUtils.randomArrayByCount(GlobalConfig.getQuestions(), 3)

        let getOwnZoom = FightModel.ins().getOwnZoom()
        let cfg = QuestionConst.getZoomAI(getOwnZoom.dan, getOwnZoom.lv, getOwnZoom.star)
        this.getQuestionByZoom(cfg.questionZoom)

        // if (FightManager.ins().isTest) {
        // this._Subjects.push(GlobalConfig.getQuestions()[96])
        // this._Subjects.push(GlobalConfig.getQuestions()[97])
        // }
        this._renderItems = renderitems
        this.isPlaying = false

    }

    private getQuestionByZoom(_zoom) {
        for (let i in GlobalConfig.getQuestions()) {
            if (GlobalConfig.getQuestions()[i].zoom == _zoom)
                this._Subjects.push(GlobalConfig.getQuestions()[i])
        }

    }

    private next() {
        this._cur = this._Subjects.shift()
        if (this._cur == null) {
            this._renderItems.data = { question: "已达到题目上限~", qa: -1 }
            return
        }
        this._renderItems.data = this._cur
    }

    public postBar() {

    }

    public updatePwBar(isCorrect?: boolean, _countdown?: number) {
        // console.log('isCorrect:' + isCorrect)
        //let imgfill = this._ownBar
        if (isCorrect) {
            let add = 0
            if (_countdown <= 3) {
                add = 60
            }
            else if (_countdown == 4) {
                add = 50
            }
            else if (4 < _countdown && _countdown <= 8) {
                add = 45
            }
            else if (8 < _countdown && _countdown <= 10) {
                add = 25
            }

            if (add > 0) {
                this.ownBarTotal += add
                this.sendEnemyEnergy()
            }
            this.ownBar += add
        }
        if (this.isPlaying) return
        this.next()
    }
}

enum option {
    A,
    B
}
MessageCenter.compile(QuestionModel);