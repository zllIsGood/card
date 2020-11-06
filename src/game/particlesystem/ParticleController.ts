/* 粒子系统控制器
 * @Author: zhoulanglang 
 * @Date: 2020-10-29 12:19:19 
 * @Last Modified by:   zhoulanglang 
 * @Last Modified time: 2020-10-29 12:19:19 
 */
class ParticleController extends BaseClass {

	private particleList;

	constructor() {
		super();
		this.particleList = [];
	}

	public static ins(): ParticleController {
		return super.ins();
	}


	/*
		用于创建新粒子系统
		particleName：粒子名称(对应resource/res/particle/中的资源名字)
		parent: 父节点
		time： 粒子持续时间，单位毫秒
	 */
	public playParticle(particleName: string, parent: egret.DisplayObjectContainer, time: number = -1, atker?: any, atkeds?: any, rate = 1) {
		if (!parent) return;

		let img: any;
		let json: any;
		let par;
		let self = this;
		let createFunc = function () {
			if (!img || !json) return;
			par = new particle.GravityParticleSystem(img, json);
			self.setParticleProp(par, parent, rate, time)
			if (atker == null && atkeds == null) {
				atker = 0//{ pos: 0 }
				atkeds = [{ pos: 7 }, { pos: 8 }, { pos: 9 }]
			}
			let atkpoints = FightData.points[atker]
			par.emitterX = atkpoints.x, par.emitterY = atkpoints.y
			if (atkeds == null || atkeds.length == 0) atkeds = [{ pos: atker }]//处理给自己回血
			for (let i = 0; i < atkeds.length; i++) {
				if (i > 0) {
					par = new particle.GravityParticleSystem(img, json);

					self.setParticleProp(par, parent, rate, time)
					par.emitterX = atkpoints.x, par.emitterY = atkpoints.y
				}
				self.tweenplay(par, FightData.points[atkeds[i].pos], rate)
			}

		}

		img = RES.getRes(particleName + '_png')
		json = RES.getRes(particleName + '_json')
		if (img && json) {
			createFunc()
			return
		}

		let path: string = App.ins().getResRoot() + 'resource/res/particle/' + particleName;
		RES.getResByUrl(path + ".json", (data, url) => {
			if (path + ".json" != url || !data)
				return;
			json = data;
			createFunc();
			if (par)
				return par;
		}, this, RES.ResourceItem.TYPE_JSON);

		RES.getResByUrl(path + ".png", (data, url) => {
			if (path + ".png" != url || !data)
				return;
			img = data;
			createFunc();
			if (par)
				return par;
		}, this, RES.ResourceItem.TYPE_IMAGE);
	}

	private setParticleProp(par, parent, rate, time) {
		parent.addChild(par);
		par.start(time);
		//this.particleList.push(par);
		par.speed = 120 * rate
		par.maxParticles = 250
		par.startSize = 60 * rate
		par.lifespan = 500 / rate
		par.startAlpha = 0.2
		par.startAlphaVariance = 0.2
		par.emitAngle = MathUtils.limitInteger(10, 360)
	}

	public tweenplay(par, end, rate) {
		egret.Tween.get(par).to({ emitterX: end.x, emitterY: end.y }, 650 / rate).wait(200 / rate).call(() => {
			//this.removeParticle(par);
			par.stop()
			DisplayUtils.removeFromParent(par);
		})
	}

	public removeParticle(parNode: particle.GravityParticleSystem) {
		for (var i = 0; i < this.particleList.length; i++) {
			if (this.particleList[i] == parNode) {
				this.particleList[i].stop();
				DisplayUtils.removeFromParent(this.particleList[i]);
				this.particleList.splice(i, 1);
				break;
			}
		}
	}

	public clearAllParticle() {
		for (var i = 0; i < this.particleList.length; i++) {
			if (this.particleList[i] != null) {
				this.particleList[i].stop();
				DisplayUtils.removeFromParent(this.particleList[i]);
			}
		}
		this.particleList = [];
	}
}
