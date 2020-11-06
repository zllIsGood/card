/*
 * @Author: zhoualnglang 
 * @Date: 2020-04-29 14:24:14 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-05-08 15:14:08
 */
class UserProtoDetialWin extends BaseEuiView {

    public lab: eui.Label;
    public title: eui.Label;
    public scrol: eui.Scroller;
    public closeBtn: BaseBtn;
    public type: UserProtoDetialWinOpen

    public constructor() {
        super();
        this.skinName = "UserProtoDetialSkin";
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.closeBtn, this.onTap)
        this.type = param[0]
        this.upView()
    }

    onTap() {
        ViewManager.ins().close(this)
    }

    public content = {
        private: {
            title: '隐私政策',
            content: `本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。

1. 适用范围
(a)在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；

(b)在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；

(c)本应用通过合法途径从商业伙伴处取得的用户个人数据。

您了解并同意，以下信息不适用本隐私权政策：

(a)您在使用本应用平台提供的搜索服务时输入的关键字信息；

(b)本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；

(c)违反法律规定或违反本应用规则行为及本应用已对您采取的措施

2. 信息使用
(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。

(b)本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。

(c)为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。

3. 信息披露
在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：

(a)经您事先同意，向第三方披露；

(b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；

(c)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；

(d)如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；

(e)如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；

(f)在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。

(g)其它本应用根据法律、法规或者网站政策认为合适的披露。

4. 信息存储和交换
本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。

5. Cookie的使用
(a)在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。

(b)您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。

(c)通过本应用所设cookies所取得的有关信息，将适用本政策。

6. 信息安全
(a)本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。

(b)在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对

7.本隐私政策的更改
(a))如果决定更改隐私政策，我们会在本政策中、本人网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。

(b)本人保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本人会通过网站通知的形式告知。

方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。

8.与我们联系
当您有其他的投诉、建议、未成年人个人信息相关问题时，请与我们的官方微信号: ttpyapp联系。您也可以将您的问题发到以下邮箱：zmth@zmfamily.cn或寄到如下地址：

广东省广州市番禺区大学城青蓝街28号创智大厦603 逐梦网络科技有限公司（收）

邮编：511400

我们将尽快审核所涉问题，并在验证您的用户身份后的十五天内予以回复。

海南逐梦网络科技有限公司`
        },
        user: {
            title: `《海南逐梦网络用户服务协议》\n<font size=24>生效日期：2019 年 11 月 27 日 星期三</font>`,
            content: `在您下载、安装或使用海南逐梦网络科技有限公司的产品及任何随附的文档（如有），包括提供给您的更新或升级版本（依据本协议之外的其他协议提供给您的更新或升级版本除外）之前，请您务必仔细阅读本协议中约定的下述条款。

除非您与海南逐梦网络科技有限公司（以下简称“公司”）就我司应用的使用另外签署了其他协议，否则您对我司应用的使用受本《我司应用用户服务协议》（以下简称“本协议”）中各项条款的约束。

请您仔细阅读以下条款，在您同意并接受本协议全部条款的前提下，公司将我司应用的合法使用授权授予您。如果您是未成年人，则请您在法定监护人陪同下审阅和判断是否同意本协议，未成年人使用我司应用的行为视为已获得了法定监护人的认可。如果您不同意接受本协议的全部条款，则您无权注册、登录或使用本协议所涉及服务，您下载、安装、使用我司应用等行为，则意味着您将自愿遵守本协议及我司应用的其他有关规则，并完全服从于我司应用的统一管理。

我司应用有权根据业务需要对本协议不定时进行调整，并将调整后的协议公布于公司官网或者我司应用APP中，如果您不同意调整后的本协议的，您应当停止使用我司应用，否则，如果在公司调整本协议并公布后，您继续使用我司应用提供的服务的，则视为您同意遵守调整后的协议。

一、用户的权利与义务
1.用户须通过合法渠道（包括但不限于各大应用市场、我司应用官网）下载、安装并使用我司应用，这是您获得我司应用使用授权的前提。

2.用户一经注册或登录使用我司应用，即视为用户同意公司的客服人员与其进行电话联系。

3.用户在我司应用内享有的服务内容由公司根据实际提供，并有权不时进行增加、删除、修改、或调整，包括但不限于：

（1）拍照（修改头像、发布状态）：用户通过拍照（语音、文字）修改自己的用户头像或者发布个人状态。

（2）问答解题：用户通过照片、语音、文字内容向其他用户提问，其他用户自愿给出解答内容，我司应用不对解答内容承担任何责任。

（3）直播课学习：用户可选择我司应用产品内相关课程学习，老师进行音视频即时教学，所产生费用由用户自行承担；用户购买课程后产生的课程回放，用户可在规定时间内随时观看复习，所产生的流量费用、上网费用由用户自行承担。

（4）老师答疑辅导：用户可通过答疑入口约定老师进行AI纠音或者人工纠音。

（5）在线练习：用户可通过我司应用进行同步题目练习。

（6）单词查询：用户可通过单词形式在单词查询中进行单词检索。

（7）录音：用户要通过录音为自己配音作品配音，前提是用户自主点击录音功能才会触发录音功能。

4. 使用我司应用时产生的通讯流量费用由用户自行承担。

5.用户应妥善保管自己的账号、密码，不得转让、出借、出租、出售或分享予他人使用。否则我司应用有权根据实际情况暂时封停或永久查封此账号，当用户的账号或密码遭到未经授权的使用时，用户应当立即通知我司应用，否则未经授权的使用行为均视为用户本人行为。

6.公司有权随时对我司应用提供的服务内容等进行调整，包括但不限于增加、删除、修改我司应用服务内容，一旦我司应用的服务内容发生增加、删除、修改，我司应用将在相关页面上进行提示；如果用户不同意相关变更和修改，可以取消已经获取的服务并停止使用；如果用户继续使用我司应用提供的服务，则视为用户已经接受全部变更、修改。除非另有明确约定，否则用户使用我司应用内新增的服务内容将同样受本协议各项条款的约束。

7.我司应用内提供的服务分为免费服务和收费服务。对于现阶段免费提供的服务内容，公司有权随时根据公司政策的调整将其变更为收费服务，如果发生该等变更的，公司将提前告知用户，如果用户不同意的，可以停止使用该服务。对于收费的服务内容，公司有权自行确定该等服务的价格并不时调整，调整后的价格将在我司应用平台中进行公示，如果用户不同意调整后的价格的，则用户可以在其原购买的收费服务到期后停止付费购买收费服务。如果用户在公司调整价格并公示后，仍继续购买收费服务的，则视为用户同意该调整后的价格。

8.用户如对付费购买的服务不满意的，有权终止服务。用户需在规定时间内，在客户端自行申请或拨打客服电话（020-84503561），申请终止服务及退款，退款金额按照客户端公示的退款规则计算，公司有权根据业务发展不时调整退款规则并在端内公示；如果客户端公示的退款规则跟本协议约定不一致的，以客户端公示的为准。其中，购买直播课的用户，仅有权对未开始直播的课程提出退款申请，已经消费的直播课程无法申请退款；购买1对1辅导的用户，需在套餐有效期内对未使用的时长提出退款申请；购买其他付费服务的退款按照平台内公示的规则执行。如果用户在购买付费服务时使用了本协议第一条第8、9款约定的优惠券或折扣等其他优惠方式的，则用户按照本款约定申请退款时，用户无权就该等优惠券或折扣申请退款或补偿。公司有权保留已终止服务的用户的所有使用信息，对用户在使用付费服务期间发生的违反本协议及相关规定的行为，公司仍有权行使本协议规定的权利并追究用户的法律责任。

9.公司不时将对付费服务提供优惠政策或开展优惠活动，该等优惠政策或优惠活动以我司应用平台上的实时信息为准，用户知悉并认可，公司作有权自行决定是否提供优惠政策或开展优惠互动，以及优惠政策或优惠活动的内容、条件和有效期，并不时进行调整或终止。

10.如果用户通过合法方式获得了相关付费服务的优惠券或折扣等其他优惠方式的，则用户知悉并认可，该等优惠券或折扣必须满足一定条件才能使用，以优惠券上的信息提示和优惠券使用说明、或我司应用公示的折扣使用说明为准。优惠券或折扣不兑现（即不直接兑换现金）、不找零（即订单金额不足抵用券金额的，抵用券剩余金额无效）、过期作废；优惠券或折扣仅限同一用户账号使用，严禁出售、转让或共享，如经公司发现存在出售、转让或共享优惠券或折扣等其他优惠方式的，该优惠券或折扣将予以作废处理，且公司有权视情节严重程度予以封号处理，并保留追究相关责任人法律责任的权利。

11.公司禁止以任何形式倒卖、贩售、出租、出借、转让用户账号、优惠券或折扣等其他优惠方式及使用第三方渠道（即非我司应用官方渠道）代充学币的行为，一经查明，公司将采取包括但不限于封号、封禁IP、追究相关责任人法律责任的处理措施。

二、平台管理
（1）在我司应用产品使用期间，公司有权删除不符合法律法规、部门规章、公序良俗的问答、评论、帖子等，以及公司认为跟我司应用产品和服务不相关或者认为不适当、不合理的用户内容，包括但不限于，含有色情、暴力、恐怖内容，具有广告性质，含有反动内容，含有人身攻击内容，含有违背伦理道德内容，具有恶意、无聊和灌水性质，涉及违法犯罪的内容，以及其他违反法律及我司应用平台管理制度的内容。

1.作弊行为与处罚方法

（1）作弊的行为包括但不限于通过非公平不正当途径获取积分、利用系统漏洞获取优惠或做异常使用、违规贩卖优惠券、使用第三方渠道（即非我司应用官方渠道）代充学币等。对于作弊行为的判断，公司保留最终解释权。特别注意：任何形式的自问自答，刷分，转分，送分等都属于作弊行为。

（2）作弊的处罚指向所有通过非正当行为获得的积分、优惠、购买的课程等，作弊所得将被全部扣除。涉嫌作弊行为一经初步确认，涉及该涉嫌作弊行为的所有相关用户的登录账号将被酌情扣分、有限期封禁，情节严重者会被永久封禁，甚至进行刑事追诉。涉嫌作弊内容的发布者在我司应用平台上发布的内容（不论作弊与否）均将被严肃处理，情节严重者将被删除在我司应用平台上发布的全部提问内容。

2.问答、评论、文档、知识删除原则与处罚方法

（1）在天天配音产品使用期间，公司有权删除不符合法律法规、部门规章、公序良俗的问答、评论、帖子等，以及公司认为跟天天配音产品和服务不相关或者认为不适当、不合理的用户内容，包括但不限于，含有色情、暴力、恐怖内容，具有广告性质，含有反动内容，含有人身攻击内容，含有违背伦理道德内容，具有恶意、无聊和灌水性质，涉及违法犯罪的内容，以及其他违反法律及天天配音平台管理制度的内容。

（2）相应处罚方法

用户发布不良信息，账号会做封号处理。

用户在应用内有严重干扰其他用户行为的，账号做封号处理

帖子被删除后，发帖者的积分将被酌情扣除0到5分。

由于问题/原帖被删除而导致的回复、评论删除不单独扣分。

情节严重者，将酌情对其进行加倍扣分、有限期封禁和永久封禁等处罚。

3.对账号的管理原则
（1）您应保证您注册、登录并使用的账号符合中国相关法律法规的规定，符合《互联网用户账号名称管理规定》，符合本协议的各项规定。公司有权对您注册、登录并使用的账号名称、头像和简介等注册信息进行审核，您确保您登录本软件使用的用户账号名称、头像和简介等信息中不得出现违法和不良信息，不存在以虚假信息骗取账号名称注册的情形；您应确保您登录我司应用使用的用户账号名称不得为您冒用关联机构或社会名人注册的账号名称。

（2）如果您以虚假信息骗取账号名称注册，或您的账号头像、简介等注册信息存在违法和不良信息的，公司有权采取通知限期改正、暂停使用、注销登记等措施；如果您冒用关联机构或社会名人注册账号名称的，公司有权注销您的账号，并向互联网信息内容主管部门报告。

（3）凡用户存在作弊行为，发布广告，发布黄色、反动内容，发布不文明内容，抄袭，模仿管理人员ID，用以假冒管理人员或破坏管理人员形象，模仿或盗用他人ID 个人签名，发布的内容包含有严重影响网友浏览的内容或格式，或者存在其他扰乱我司应用秩序的，或影响我司应用一课正常经营行为的，公司有权删除其相应账号，情节严重者，将酌情封禁对应IP。

（4）我司应用提供账号注销功能，可以在“我司应用”-“我的”-设置-注销我司应用账号中实现。注销账号之后此账号内的数据无法恢复，包括但不限于账户内的资产信息如学币、帮帮币、优惠券等；账号信息内容也将全部清除，包含但不限于该账号发布过的文章、评论等。注销行为操作后无法撤销，请用户谨慎申请。

4.投诉、举报制度

如果您认为我司应用中的提问、回答、帖子、发言或其他信息、资料、内容等存在违反法律法规及我司应用平台相关管理规定的，涉嫌侮辱或者诽谤他人，或者侵犯您或第三方的商标权、著作权或其他合法权利情形的，您可以通过我司应用APP内“我要吐槽”渠道进行举报、投诉，或者向我司应用官方邮箱zmth@zmfamily.cn发送权利通知书，公司将在收到您的投诉后将依据中国法律法规和政府规范性文件及我司应用平台管理规定采取措施进行处理，包括但不限于移除相关内容或屏蔽相关链接，以及其他公司认为适当的处理方式，情节严重者，公司有权向政府相关部门进行举报。

三、广告及推广
1.公司有权根据其现行有效的政策自行决定，使用我司应用为公司或任何第三方的产品或服务提供广告、推广或任何增值服务，且因该等广告、推广或增值服务而获取的任何收益（如有）均由公司单独享有。

2.公司有权，无需事先向您通知，自行决定更改利用我司应用展示、发布广告或进行推广的形式、模式和范围；您应意识到我司应用上展示给您的内容，包括但不限于我司应用中的广告及推广服务中展示的内容，可能受知识产权的保护。您不得修改、租赁、出租、出借、出售、分发该内容（无论全部还是部分）或根据该内容创作衍生作品，除非公司或内容权利人在相关协议、相关业务规则中特别告知您可以为之。

3.您于天天配音或经由天天配音与广告商进行通讯或商业往来，或参与促销活动，包含相关商品或服务之付款及交付，以及前述交易其他任何相关条款、条件、保证或声明，完全为您与前述广告商之间的行为，公司不承担对广告及广告商进行审查、甄别之义务； 以及公司不对您或广告商，基于天天配音发生的前述通讯、商业往来或交易可能遭受的任何性质的损失或损害承担任何责任。

四、知识产权
1.公司拥有我司应用的所有权，包括其中的知识产权。我司应用受中华人民共和国著作权法的保护，用户不得删除或以其他方式改变我司应用上附带的版权、商标或其他所有权声明或标识。用户不得对我司应用进行反向工程、反向编译或反汇编，不得试图进行任何获得我司应用源代码的访问或行为，不得发行、出租、信息网络传播、翻译我司应用软件。

2.我司应用的用户不能侵犯包括他人的著作权在内的知识产权以及其他权利。一旦由于用户的提问、回答、发言发生法律纠纷，其责任在于用户本人，与我司应用及公司无关。

3.对于用户发表到我司应用上的任何内容，用户同意我司应用在全世界范围内具有免费的、永久性的、不可撤销的、非独家的和完全再许可的权利和许可，以使用、复制、修改、改编、出版、翻译、据以创作衍生作品、传播、表演和展示此等内容（整体或部分），和/或将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中。并且，用户许可我司应用公司有权利就任何主体侵权而单独采取法律行动（包括但不限于诉讼、举报、律师函等形式）。

4.我司应用用户的言论侵犯了第三方的著作权或其他权利，第三方提出异议的时候，我司应用有权删除相关的内容，提出异议者和用户之间以和解、调解、仲裁、诉讼等方式解决了争议后，以此为依据，我司应用在得到有关申请后可以恢复被删除的内容。

5.用户从我司应用的服务中获得的信息在没有得到事先许可的情况下，自行或提供给第三方利用复制，发送，传播等手段用于盈利目的时，将追究相关当事人的法律责任。

6.未经本公司事先许可，禁止使用任何机器人、爬虫程序、其他自动设备，或手动程序等来监视或复制我司应用网页或其所包含的任何内容。否则，我司应用有权依法追究法律责任。

7.如果第三方要使用我司应用上的提问、回答或评论的，则需要事先获得相关用户同意后方能使用。

五、不允诺担保、责任有限及免责
1.不允诺担保：我司应用用户提问、回答、发言仅代表用户个人观点，与公司无关，且我司应用不对用户发表的回答或评论的正确性、准确性、真实性进行保证。我司应用为按现状提供，包含瑕疵及缺陷，公司不提供任何其他担保。公司不允诺其他无论是明示的还是默示的保证和担保，包括但不限于对特定目的的适销性和适应性，不侵权，以及任何出自交易过程或商业惯例的保证和条件。从公司或他处获取的任何建议或信息，不论是口头的还是书面的，都不会对公司产生本协议明确约定之外的其他保证和担保。

2.责任有限：适用法律所允许的最大范围内，不论出于何种原因，公司对您的全部责任为您为使用我司应用的产品和服务而向公司支付的费用总额。如果公司免费向您提供了我司应用服务，则公司无义务对您承担任何赔偿责任。任何情况下，公司不对出自本协议或与本协议有关的或与我司应用的运行有关的任何特殊的、偶然的、惩罚性或间接的损害（包括但不限于数据损失、利润损失或营业损失）或采购替代产品承担责任，不论该等责任是基于合同，担保，侵权（包括过失），严格责任或其他，也不论公司是否被事先告知了损失或损害发生的可能性。即使本协议约定的有限补救措施未能实现其根本目的，前述的责任限制依然适用。

3.免责：如因下所列任何原因而造成的用户资料泄露、丢失、被盗用或被篡改等，公司均有权获得免责：

（1）任何因政府管制而造成的暂时性关闭等影响网络正常浏览的不可抗力原因；

（2）任何计算机系统问题、黑客攻击、计算机病毒侵入或发作的原因；

（3）任何因网络安全问题导致的账户或银行卡信息泄露，该风险可能会给用户造成经济损失，用户承诺自行承担向侵权方追究责任及追究责任不能的后果；

（4）任何因用户个人原因导致的用户资料泄露、丢失、被盗用或被篡改等；

（5）其他不能归责于公司的原因。

六、用户隐私声明
1.公司仅出于向用户提供更优质、更个性化服务的目的收集用户的信息，且，公司重视未成年人的个人信息保护，如您为未成年人，请务必由您的监护人仔细阅读本隐私条款，并在征得监护人同意的前提下使用我司应用或向我司应用提供相关用户信息。

2.在用户使用我司应用的过程中，公司将遵循合法、正当、必要的原则，收集用户使用我司应用的相关信息，包括但不限于：

（1）用户注册或登录的账户信息，例如用户注册账户使用的电话号码、姓名或昵称，用户自行填写的班级、学校等；

（2）用户上传的信息，例如用户的发帖、评论、分享、用户主动填写的信息或用户与我司应用客服联系时提供的相关信息等；

（3）用户使用我司应用过程中产生的信息。公司会根据用户授予的权限，接收并记录用户所使用的设备相关信息，例如设备属性信息、设备位置信息、设备连接信息等；

（4）我司应用根据用户授权通过合法方式收集的其他用户信息。

4. 公司非常重视用户的信息安全，并尽最大合理努力采取各种合理的物理、电子和管理方面的安全措施来保护用户信息，确保用户信息不会被泄漏、篡改、毁损或丢失，包括但不限于SSL、信息加密存储、数据中心的访问控制、信息访问权限控制等。且，公司不会非法出售、非法向他人提供用户信息；公司不会将用户的该等信息提供给任何第三方，也不会用于任何其他目的和用途，但是以下情形除外，1）经用户事先同意，向第三方披露； 2）根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；3）公司与第三方合作向用户提供我司应用平台的相关服务或其他网络服务，且该等第三方同意承担与公司同等的保护用户隐私的责任；4）其他根据法律、法规或者政策应进行的披露。

七、其他
1.如果我司应用平台上某一子服务附有单独的使用协议的，则该子服务的使用将受该单独使用协议的约束。

2.本协议的签订、生效、履行、争议的解决均适用中华人民共和国法律。

3.有关本协议的争议应通过友好协商解决，如果协商不成，该争议将提交公司所在地有管辖权的法院诉讼解决。

4.用户对我司应用平台的意见及建议可通过客服邮箱zmth@zmfamily.cn与公司进行联系。`
        },
    }

    upView() {
        if (this.type == UserProtoDetialWinOpen.user) {
            this.title.textFlow = new egret.HtmlTextParser().parser(this.content.user.title)
            this.lab.text = this.content.user.content
            this.scrol.top = this.title.y + 60 + 20
        }
        else if (this.type == UserProtoDetialWinOpen.private) {
            this.title.textFlow = new egret.HtmlTextParser().parser(this.content.private.title)
            this.lab.text = this.content.private.content
            this.scrol.top = this.title.y + 30 + 20
        }
    }

    public close(...param: any[]): void {

    }

}
ViewManager.ins().reg(UserProtoDetialWin, LayerManager.UI_LOADING);

const enum UserProtoDetialWinOpen {
    user = 0,
    private
}
window["UserProtoDetialWin"] = UserProtoDetialWin;