/**
 * 游戏地图
 * @author
 */
class MapView extends eui.Group {

	/**地图背景 */
	private _mapImage: DragonBonesManage;

	///////////////////////////////对象层////////////////////////////////////
	// /**物品掉落对象层 */
	// private _dropLayer: egret.DisplayObjectContainer;
	/**实体对象层 */
	private _entityLayer: egret.DisplayObjectContainer;
	//掉落物名字层
	// private _dropNameLayer: egret.DisplayObjectContainer;
	// /**技能表现层（最底层） */
	// private _effBottomLayer: egret.DisplayObjectContainer;
	/**技能表现层（最顶层） */
	public _effTopLayer: egret.DisplayObjectContainer;
	/**飘血视图层 */
	public _bloodLayer: egret.DisplayObjectContainer;

	public constructor() {
		super();

		this.touchEnabled = true;
		this.touchChildren = true;
		this.width = 750
		this.height = 1334
		this.verticalCenter = 0
		this.horizontalCenter = 0
	}

	public initMap(): void {
		let skillStr = 'mapbg'
		let actions: string[] = [skillStr]
		if (skillStr.indexOf('_') > 0) {
			actions[0] = skillStr.split('_')[1]
			skillStr = skillStr.split('_')[0]
		}
		let mc = new DragonBonesManage()
		mc.register(DragonBonesFactory.ins().makeArmature("armature_" + skillStr, skillStr, 1), actions)
		if (mc.play(actions[0], 0)) {
			mc.armature.getClock().timeScale = 1
		}
		mc.x = 750 / 2 - 38.5
		mc.y = 1334 / 2
		this._mapImage = mc
		this.addChild(this._mapImage);

		// this._dropLayer = new egret.DisplayObjectContainer;
		// this.addChild(this._dropLayer);
		// this._effBottomLayer = new egret.DisplayObjectContainer;
		// this.addChild(this._effBottomLayer);
		this._entityLayer = new egret.DisplayObjectContainer;
		this.addChild(this._entityLayer);
		// this._dropNameLayer = new egret.DisplayObjectContainer;
		// this.addChild(this._dropNameLayer);

		this._effTopLayer = new egret.DisplayObjectContainer;
		this.addChild(this._effTopLayer);
		this._bloodLayer = new egret.DisplayObjectContainer;
		this.addChild(this._bloodLayer);

	}

	public showFightEntity() {
		if (this._mapImage) {
			this._mapImage.start()
		}

		this.clearAllLayer()
		let points = FightData.points
		FightManager.ins().charMonsters = []

		for (let i = 0; i < points.length; i++) {
			let point = points[i]
			let obj = new CharMonster()
			obj.x = point.x
			obj.y = point.y
			let ran = RoundPlay.ins().monsters[i]
			if (ran) {
				let cardcfg = GlobalConfig.getMonsterCfg()[ran.id]
				obj.monsterBase.data = {
					role: cardcfg.img,
					race: cardcfg.race,
					lv: ran.level,
					star: ran.star,
				}
				obj.data = { pos: i + 1, name: cardcfg.name, life: ran.maxHp, curlife: ran.maxHp, attack: ran.damage, id: ran.id, lv: ran.level }
				this._entityLayer.addChild(obj)
				FightManager.ins().charMonsters.push(obj)
			}
			else {
				FightManager.ins().charMonsters.push(null)
			}
		}
	}

	public clearAllLayer(): void {
		// this._effBottomLayer.removeChildren();
		this._effTopLayer.removeChildren();
		this._entityLayer.removeChildren();
	}

}
