/**
 * 入口Main文件
 */

class Main extends eui.UILayer {
	public static isLogin: boolean = false;
	public static isDebug: boolean = false;
	// public static host: string = "https://zmg.zmfamily.cn";
	public static host: string = "http://192.168.0.224:9900";
	public static cdnUrl: string = "https://cdnzmg.zmfamily.cn/";

	// 平台相关配置
	public static version: string = "10000";
	public static platformWX: string = "1";
	public static platformQQ: string = "2";
	public static platformTT: string = "3";
	public static platformApp: string = "4";
	public static platformH5: string = "5";
	public static platformIOS: string = "7";
	public static gamePlatform: string = Main.platformApp;
	public static adId: string = '6';
	// 关卡配置
	public static userData: { upGradeVo, energy, houseId, personId, id, refreshTime, stageNum, stageFinNum }; // 用户数据，例如体力，关卡数，
	// 程序参数
	public static reqTimeout = 10000;
	public static systemInfo: any;
	public static pixelRatio: number;
	public static scaleRatio: number;
	// 体力值相关配置项
	public static energyConfig: any;
	// 公共分享配置
	public static shareConfig: any = {
		common: {
			imageUrl: GlobalConfig.helpImgUrl,
			title: "我发现了一款好玩的拼单词游戏，快来跟我一起玩吧！"
		},
	};

	// 头条相关配置
	// 分享配置
	public static ttShareId: string = "3n0in21pdk97bn868a"; //"17i7lf08lh9d12uuke";
	// public static ttShareDrawId: string = "1m43c92p7jkf4fw6ik";
	// 录屏配置
	public static recorder: any;
	public static recording: boolean = false;
	public static recordStartTime: number = 0;
	public static recordTime: number = 5000;
	// 广告配置
	public static videoAd: any;
	/**bgm*/
	public static bgm = 'https://cdnzmg.zmfamily.cn/word/bgm.mp3'
	// public static res_url = 'https://cdnzmg.zmfamily.cn/word/res_url_cfg.json'  //'./word_res/res_url_cfg.json' //


	protected createChildren(): void {
		super.createChildren();
		// App.ins().playOpenAd()

		egret.Logger.logLevel = egret.Logger.ALL;
		// 设置跨域访问资源
		egret.ImageLoader.crossOrigin = "anonymous";

		// 注入自定义的素材解析器
		this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
		this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		RES.setMaxLoadingThread(4);
		//适配方式
		StageUtils.ins().resetMode()
		egret.lifecycle.onPause = () => {
			// egret.ticker.pause();
			SoundManager.ins().setBgOn(false)
		}
		egret.lifecycle.onResume = () => {
			// egret.ticker.resume();
			SoundManager.ins().setBgOn(true)
		}

		this.runGame().catch(e => {
			console.log(e);
		})
	}

	private onGetComplete(e: egret.Event) {
		console.log(e);
	}

	private async runGame() {
		await this.loadResource();
		SceneManager.ins().runScene(MainScene);
		// await App.ins().reqAd()
		// App.ins().splash()
		// console.log('main->runGame')
		// await App.ins().login() //登录
		LoadingUI.setLoadingState(0.05)
		// // 注册器
		await this.mainRegister();
		await this.loadConfig();
		// if (Main.gamePlatform != Main.platformH5) {
		await this.loadConfig2();
		// }
		await this.loadDragonBonesConfig()
		LoadingUI.setLoadingState(0.1)
		LoadingUI.setLoadingState(0.15)

		TimerManager.ins();
		// 初始化分享
		this.initShare();
		// StageUtils.ins().initBgm()
		// SoundManager.ins().playBg()
		LoadingUI.start()
	}

	private async loadResource() {
		try {
			// await RES.loadConfig("resource/default.res.json", "resource/");
			await RES.loadConfig("default.res.json", App.ins().getResRoot() + 'resource/');
			await this.loadTheme();
			if (Main.gamePlatform != Main.platformH5) {
				await RES.loadGroup('loading')
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	private loadConfig() {
		return new Promise((resolve, reject) => {
			// RES.getResAsync('config_json', (data) => {
			RES.getResByUrl(App.ins().getResRoot() + 'resource/config/config.json', (data) => {
				GlobalConfig.init(data)
				resolve()
			}, this)
		})
	}

	private loadConfig2() {
		return new Promise((resolve, reject) => {
			// RES.getResAsync('config_json', (data) => {
			RES.getResByUrl(App.ins().getResRoot() + 'resource/config/testCfg.json', (data) => {
				GlobalConfig.init2(data)
				resolve()
			}, this)
		})
	}

	private loadDragonBonesConfig() {
		return new Promise((resolve, reject) => {
			// RES.getResAsync('config_json', (data) => {
			RES.getResByUrl(App.ins().getResRoot() + 'resource/config/dgCfg.json', (data) => {
				GlobalConfig.initDG(data)
				resolve()
			}, this)
		})
	}

	private loadTheme() {
		return new Promise((resolve, reject) => {
			//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
			let theme = new eui.Theme("resource/default.thm.json", this.stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, () => {
				resolve();
			}, this);

		})
	}

	/**
     * 初始化分享配置
     */
	private initShare() {
		if (!window['wx'] || Main.gamePlatform != Main.platformTT || !wx.showShareMenu) {
			return
		}
		wx.showShareMenu({
			withShareTicket: false
		});
		if (Main.gamePlatform === Main.platformTT) {
			wx.onShareAppMessage(() => {
				return { templateId: Main.ttShareId };
			});
		} else {
			wx.onShareAppMessage(() => {
				return Main.shareConfig.common;
			});
		}
	}

	/**视屏注册 仅Main.platformTT可用*/
	private async mainRegister() {
		if (!window['wx'] || Main.gamePlatform != Main.platformTT || !wx.onMemoryWarning) {
			return
		}
		wx.onMemoryWarning(function () {
			// todo: 提交日志
			console.error("onMemoryWarning");
		});
		// 初始化视频广告
		AdService.initVideoAd();
		// 初始化录屏
		try {
			Main.recorder = wx.getGameRecorderManager();
		} catch (error) {
			console.error("init recorder error:", error);
		}
		Main.systemInfo = await wxapi.getSystemInfo()
	}

	public static async startGame() {
		console.log('->startGame')
		// 登录
		/*if (!Main.isLogin) {
			console.log('->startGame1')
			await App.ins().login() //	Main.isLogin = await  WxService.login();
			if (!Main.isLogin) {
				console.error('main->登录请求失败')
				return;
			}
		}*/
		// await TimerManager.ins().deleyPromisse(500)
		SkillManager.ins().initDgFactory()

		ViewManager.ins().close(LoadingUI)
		if (Main.gamePlatform == Main.platformH5) {
			H5Service.H5Ready()
		}
		else {
			ViewManager.ins().open(HomeWin)
		}
		// if (Main.gamePlatform == Main.platformTT) {
		// 	ViewManager.ins().open(NavigationWin)
		// }
	}

}
window["Main"] = Main