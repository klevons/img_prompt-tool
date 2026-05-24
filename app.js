const STORAGE_KEY = "promptWorkbenchState.v3";
const USER_PRESETS_KEY = "promptWorkbenchUserPresets.v3";
const CUSTOM_ELEMENTS_KEY = "promptWorkbenchCustomElements.v1";

const categories = [
    "全部",
    "小程序广告",
    "电商促销",
    "本地生活",
    "游戏宣传",
    "旅游宣传",
    "短视频开屏",
    "科技产品",
    "影视感广告",
    "我的预设",
];
const videoLengths = ["5s", "6s", "7s", "8s", "9s", "10s", "11s", "12s", "13s", "14s", "15s"];
const cameraMotions = ["轻微推进", "横向微移", "缓慢拉远", "固定镜头", "环绕主体"];
const motionStrengths = ["稳定", "轻微动态", "中等动态"];

const defaultVideoRule =
    "画面稳定，主体不变形，文字不漂移，不跳切，不闪烁，不出现多余肢体，不出现乱码，不改变商品和广告信息。";
const defaultFontRule =
    "标语字体要有设计感，使用高识别度促销标题字，粗体圆角黑体或立体描边字，主标题可用渐变色、白色描边、轻微投影，按钮字要清晰有点击感，适合小程序横版Banner、开屏横版素材。";

const builtInPresets = [
    {
        id: "mini-banner",
        name: "横版小程序福利 Banner",
        category: "小程序广告",
        ratio: "16:9",
        usage: "小程序横版Banner、开屏横版素材、活动页头图",
        subject: "年轻用户、福利券卡片、手机小程序入口",
        scene: "明亮城市生活场景、浅色建筑、绿植点缀",
        action: "用户看向镜头，手持手机，展示优惠券",
        outfit: "休闲穿搭，春季浅色服装",
        props: "优惠券卡片、手机界面、领取按钮",
        composition: "横版大景，右侧放主体元素，左侧预留标题区",
        camera: "中景，居中构图，轻微广角",
        color: "橙色、浅绿色、奶白色，高明度促销色彩",
        lighting: "柔和日光，明亮通透",
        style: "商业插画结合轻写实广告，互联网小程序活动Banner",
        quality: "高清、干净、边缘清晰、广告可读性强",
        mainTitle: "新人领6折券",
        subTitle: "最高抵扣15元",
        offerText: "限时福利",
        buttonText: "立即领取",
        slogan: "新人领6折券 最高抵扣15元；立即领取",
        sloganRule: defaultFontRule,
        negative: "不生成低清晰度、过度拥挤、脏乱背景、错误透视",
        textNegative: "不要乱码，不要错别字，不要多余文字，不要文字漂移",
        privacyNegative: "不生成品牌Logo、不生成水印、不生成二维码、不生成个人信息",
        videoLength: "8s",
        cameraMotion: "轻微推进",
        motionStrength: "稳定",
        videoRule: defaultVideoRule,
        tags: ["Banner", "开屏", "商业广告"],
    },
    {
        id: "ecommerce-coupon",
        name: "电商大促优惠券海报",
        category: "电商促销",
        ratio: "16:9",
        usage: "电商促销横版Banner、店铺活动页、商品权益图",
        subject: "大号优惠券卡片、商品礼盒、金币、权益图标",
        scene: "明亮促销空间，浅色渐变背景，电商货架元素",
        action: "商品向前突出，金币轻微漂浮，优惠券居中展示",
        outfit: "无人物，主视觉以商品和卡片为主",
        props: "红包卡、优惠券、金币、按钮、礼盒",
        composition: "中心卡片构图，左右商品陪衬，底部按钮区清晰",
        camera: "正面镜头，近景，商业海报构图",
        color: "红橙促销色，高亮金色点缀，白色留白",
        lighting: "高对比商业光，影棚布光",
        style: "电商促销，3D卡片，强转化广告视觉",
        quality: "质感高级、阴影柔和、按钮有点击感",
        mainTitle: "限时领券",
        subTitle: "最高立减15元",
        offerText: "新人专享",
        buttonText: "马上抢",
        slogan: "限时领券 最高立减15元；马上抢",
        sloganRule: defaultFontRule,
        negative: "不生成真实人民币、不生成复杂票据、不生成杂乱商品",
        textNegative: "不要乱码，不要错字，不要价格错误，不要无关文字",
        privacyNegative: "不生成品牌Logo、不生成水印、不生成二维码",
        videoLength: "8s",
        cameraMotion: "固定镜头",
        motionStrength: "轻微动态",
        videoRule: defaultVideoRule,
        tags: ["促销", "优惠券", "Banner"],
    },
    {
        id: "local-life",
        name: "本地生活门店福利",
        category: "本地生活",
        ratio: "4:5",
        usage: "门店团购、到店消费、小程序活动海报",
        subject: "白领用户、门店招牌、福利券、手机团购页面",
        scene: "商场门口，本地生活街区，门店灯箱和橱窗",
        action: "用户手持手机，点击按钮，展示优惠券",
        outfit: "商务外套，日常通勤穿搭",
        props: "手机、优惠券、门店招牌、商品套餐卡",
        composition: "人物在右侧，门店和优惠信息在左侧，按钮位于下方",
        camera: "中景，轻微低角度，空间有纵深",
        color: "暖橙、米白、深咖，生活感强",
        lighting: "柔和日光，门店暖光补充",
        style: "轻写实商业广告，本地生活运营海报",
        quality: "真实可信，干净高级，信息层级清楚",
        mainTitle: "附近好店福利",
        subTitle: "新人最高省15元",
        offerText: "到店可用",
        buttonText: "立即查看",
        slogan: "附近好店福利 新人最高省15元；立即查看",
        sloganRule: defaultFontRule,
        negative: "不生成脏乱街道、不生成拥挤人群、不生成过暗画面",
        textNegative: "不要乱码，不要错字，不要多余招牌字",
        privacyNegative: "不生成真实门店Logo、不生成真实地址、不生成二维码",
        videoLength: "8s",
        cameraMotion: "横向微移",
        motionStrength: "轻微动态",
        videoRule: defaultVideoRule,
        tags: ["本地生活", "门店", "商业广告"],
    },
    {
        id: "game-launch",
        name: "游戏新品预约宣传",
        category: "游戏宣传",
        ratio: "16:9",
        usage: "游戏预约Banner、信息流头图、活动首屏",
        subject: "游戏角色、能量武器、预约奖励卡片、发光按钮",
        scene: "幻想游戏世界，城堡废墟，能量光效背景",
        action: "角色看向镜头，持武器站立，披风轻微飘动",
        outfit: "游戏角色服装，金属护甲，发光配饰",
        props: "武器、奖励宝箱、预约券、能量粒子",
        composition: "主角居中偏右，左侧预留标题，底部奖励和按钮",
        camera: "低角度，电影感镜头，中近景",
        color: "蓝紫能量色、金色高光、暗部高级灰",
        lighting: "高对比商业光，边缘轮廓光",
        style: "电影海报，游戏宣传视觉，史诗感",
        quality: "高细节、角色清晰、光效克制、广告信息醒目",
        mainTitle: "新服预约开启",
        subTitle: "登录领限定奖励",
        offerText: "预约礼包",
        buttonText: "立即预约",
        slogan: "新服预约开启 登录领限定奖励；立即预约",
        sloganRule: defaultFontRule,
        negative: "不生成低质量角色、不生成肢体错乱、不生成廉价特效",
        textNegative: "不要乱码，不要错别字，不要文字遮挡角色",
        privacyNegative: "不生成未授权Logo、不生成水印、不生成二维码",
        videoLength: "8s",
        cameraMotion: "环绕主体",
        motionStrength: "中等动态",
        videoRule: defaultVideoRule,
        tags: ["游戏", "开屏", "视频"],
    },
    {
        id: "travel-spring",
        name: "春季旅游目的地海报",
        category: "旅游宣传",
        ratio: "16:9",
        usage: "旅游小程序Banner、目的地专题、开屏横版素材",
        subject: "旅行者、行李箱、目的地风景、优惠权益卡",
        scene: "旅游风景区，山水湖泊，春季花海，蓝天白云",
        action: "旅行者向前走，回头微笑，展示手机行程",
        outfit: "旅行穿搭，浅色外套，舒适背包",
        props: "行李箱、手机、门票卡片、旅行地图",
        composition: "横版大景，远处风景开阔，人物在前景，标题在左上",
        camera: "广角，中远景，空气透视",
        color: "天空蓝、草木绿、暖橙点缀，清新春日",
        lighting: "清晨阳光，明亮通透",
        style: "清新春日商业插画，轻写实旅游广告",
        quality: "通透、高级、风景层次清楚、人物不抢画面",
        mainTitle: "春日出游福利",
        subTitle: "热门目的地限时优惠",
        offerText: "最高省15元",
        buttonText: "去看看",
        slogan: "春日出游福利 热门目的地限时优惠；去看看",
        sloganRule: defaultFontRule,
        negative: "不生成阴雨天气、不生成脏乱游客、不生成低清晰度风景",
        textNegative: "不要乱码，不要错误地名，不要多余文字",
        privacyNegative: "不生成真实旅行社Logo、不生成二维码、不生成水印",
        videoLength: "8s",
        cameraMotion: "缓慢拉远",
        motionStrength: "轻微动态",
        videoRule: defaultVideoRule,
        tags: ["旅游", "Banner", "清新"],
    },
    {
        id: "short-video-splash",
        name: "短视频 App 开屏活动",
        category: "短视频开屏",
        ratio: "9:16",
        usage: "短视频开屏、竖版活动页、信息流首帧",
        subject: "年轻创作者、手机短视频界面、活动奖励卡",
        scene: "霓虹城市夜景，直播间光效，动感背景",
        action: "创作者看向镜头，手持手机，点击按钮",
        outfit: "潮流休闲穿搭，亮色配饰",
        props: "手机、播放按钮、奖励卡片、点赞图标",
        composition: "竖版中心人物，上方标题，下方按钮和权益说明",
        camera: "近景，居中构图，轻微低角度",
        color: "蓝紫霓虹、橙色按钮、高饱和但不刺眼",
        lighting: "霓虹灯光，高级灰光影",
        style: "短视频开屏广告，年轻化动态海报",
        quality: "清晰、潮流、强视觉冲击、文字区稳定",
        mainTitle: "新人创作福利",
        subTitle: "开通即领活动权益",
        offerText: "限时奖励",
        buttonText: "立即参与",
        slogan: "新人创作福利 开通即领活动权益；立即参与",
        sloganRule: defaultFontRule,
        negative: "不生成杂乱图标、不生成低俗元素、不生成画面噪点",
        textNegative: "不要乱码，不要文字漂移，不要过多弹幕字",
        privacyNegative: "不生成真实平台Logo、不生成水印、不生成二维码",
        videoLength: "8s",
        cameraMotion: "轻微推进",
        motionStrength: "中等动态",
        videoRule: defaultVideoRule,
        tags: ["开屏", "视频", "潮流"],
    },
    {
        id: "tech-product",
        name: "科技产品发布 Banner",
        category: "科技产品",
        ratio: "16:9",
        usage: "科技产品发布页、官网Banner、小程序新品首屏",
        subject: "智能硬件产品、透明玻璃卡片、功能卖点模块",
        scene: "科技展厅，蓝光空间，几何背景",
        action: "产品悬浮展示，功能模块环绕产品",
        outfit: "无人物，产品为主体",
        props: "产品渲染、发光线条、功能图标、按钮",
        composition: "产品居中偏右，左侧标题和卖点，底部按钮",
        camera: "近景，长焦压缩，产品广告镜头",
        color: "深蓝、冰蓝、银白，高级科技感",
        lighting: "科技蓝光，边缘轮廓光，影棚布光",
        style: "科技产品广告，未来感，干净高级",
        quality: "高精度产品细节、金属质感、玻璃拟态、无噪点",
        mainTitle: "新品体验升级",
        subTitle: "智能功能限时开放",
        offerText: "预约享权益",
        buttonText: "立即预约",
        slogan: "新品体验升级 智能功能限时开放；立即预约",
        sloganRule: defaultFontRule,
        negative: "不生成廉价塑料质感、不生成变形产品、不生成杂乱线条",
        textNegative: "不要乱码，不要错误参数，不要文字挤压",
        privacyNegative: "不生成真实品牌Logo、不生成水印、不生成二维码",
        videoLength: "8s",
        cameraMotion: "环绕主体",
        motionStrength: "轻微动态",
        videoRule: defaultVideoRule,
        tags: ["科技", "Banner", "商业广告"],
    },
    {
        id: "cinematic-ad",
        name: "影视感品牌广告",
        category: "影视感广告",
        ratio: "21:9",
        usage: "品牌广告横版主视觉、开屏横版素材、宣传短片首帧",
        subject: "真实商业模特、品牌权益卡、城市道路或高级室内空间",
        scene: "电影感城市夜景，高级室内光影，空间有纵深",
        action: "模特轻微转身，看向镜头，手持手机展示权益",
        outfit: "商务外套，高级灰穿搭，质感配饰",
        props: "手机、权益卡片、柔和光斑、按钮区域",
        composition: "宽银幕构图，人物在三分线，标题区留白充足",
        camera: "电影感镜头，长焦压缩，中近景",
        color: "高级灰、暖金高光、深色背景、克制橙色按钮",
        lighting: "高级灰光影，侧逆光，轮廓光",
        style: "电影海报，轻写实广告，高端品牌质感",
        quality: "肤色自然、质感高级、背景虚化、广告文案清晰",
        mainTitle: "专属权益已开启",
        subTitle: "限时领取新人福利",
        offerText: "最高抵扣15元",
        buttonText: "立即领取",
        slogan: "专属权益已开启 限时领取新人福利；立即领取",
        sloganRule: defaultFontRule,
        negative: "不生成廉价棚拍感、不生成过曝、不生成杂乱背景",
        textNegative: "不要乱码，不要错字，不要文字贴脸",
        privacyNegative: "不生成真实品牌Logo、不生成水印、不生成个人信息",
        videoLength: "8s",
        cameraMotion: "轻微推进",
        motionStrength: "稳定",
        videoRule: defaultVideoRule,
        tags: ["影视感", "品牌", "视频"],
    },
];

const sections = [
    {
        title: "基础设定",
        fields: [
            { key: "name", label: "画面类型 / 预设名称", type: "input" },
            { key: "ratio", label: "画面比例", type: "select", options: ["16:9", "9:16", "1:1", "4:5", "3:4", "21:9"] },
        ],
    },
    {
        title: "画面内容",
        fields: [
            { key: "subject", label: "主体", type: "textarea" },
            { key: "scene", label: "场景", type: "textarea" },
            { key: "action", label: "动作 / 姿态", type: "textarea" },
            { key: "outfit", label: "服装", type: "textarea" },
            { key: "props", label: "道具", type: "textarea" },
            { key: "composition", label: "构图", type: "textarea" },
            { key: "camera", label: "镜头", type: "textarea", wide: true },
        ],
    },
    {
        title: "视觉风格",
        fields: [
            { key: "style", label: "视觉风格", type: "textarea" },
            { key: "color", label: "光线 / 色彩", type: "textarea" },
            { key: "lighting", label: "光线细节", type: "textarea" },
            { key: "quality", label: "画质细节", type: "textarea" },
            { key: "sloganRule", label: "字体 / 标语规则", type: "textarea", wide: true },
        ],
    },
    {
        title: "广告文案",
        fields: [
            { key: "mainTitle", label: "主标题", type: "input" },
            { key: "subTitle", label: "副标题", type: "input" },
            { key: "offerText", label: "价格 / 优惠信息", type: "input" },
            { key: "buttonText", label: "按钮文案", type: "input" },
            { key: "slogan", label: "完整标语", type: "textarea", wide: true },
        ],
    },
    {
        title: "文生视频专属设置",
        videoOnly: true,
        fields: [
            { key: "videoLength", label: "视频长度", type: "select", options: videoLengths },
            { key: "cameraMotion", label: "镜头运动", type: "select", options: cameraMotions },
            { key: "motionStrength", label: "动态强度", type: "select", options: motionStrengths },
            { key: "videoRule", label: "视频限制规则", type: "textarea", wide: true },
        ],
    },
];

const elementGroups = [
    {
        title: "人物",
        field: "subject",
        area: "content",
        items: [
            "年轻情侣",
            "白领用户",
            "外卖骑手",
            "旅行者",
            "游戏角色",
            "3D卡通人物",
            "真实商业模特",
            "年轻创作者",
            "商务人士",
            "科技产品体验者",
        ],
    },
    {
        title: "场景",
        field: "scene",
        area: "content",
        items: [
            "城市街区",
            "商场门口",
            "春季街道",
            "夜景霓虹",
            "科技展厅",
            "游戏世界",
            "旅游风景区",
            "家庭客厅",
            "门店入口",
            "未来城市",
        ],
    },
    {
        title: "动作",
        field: "action",
        area: "content",
        items: [
            "向前走",
            "看向镜头",
            "手持手机",
            "点击按钮",
            "展示优惠券",
            "奔跑",
            "轻微转身",
            "开心互动",
            "打开礼盒",
            "展示产品",
        ],
    },
    {
        title: "服装",
        field: "outfit",
        area: "content",
        items: [
            "休闲穿搭",
            "商务外套",
            "运动服",
            "旅行穿搭",
            "科技感服装",
            "游戏角色服装",
            "春季浅色服装",
            "高级灰穿搭",
            "潮流穿搭",
            "品牌广告穿搭",
        ],
    },
    {
        title: "道具",
        field: "props",
        area: "content",
        items: [
            "优惠券",
            "手机界面",
            "红包卡",
            "商品礼盒",
            "行李箱",
            "游戏武器",
            "奖励宝箱",
            "功能图标",
            "权益卡片",
            "发光按钮",
            "金币",
            "地图卡片",
        ],
    },
    {
        title: "镜头",
        field: "camera",
        area: "content",
        items: [
            "广角",
            "中景",
            "近景",
            "俯拍",
            "低角度",
            "电影感镜头",
            "长焦压缩",
            "居中构图",
            "三分法构图",
            "商业广告镜头",
        ],
    },
    {
        title: "风格",
        field: "style",
        area: "style",
        items: [
            "商业插画",
            "3D卡通",
            "轻写实广告",
            "电影海报",
            "电商促销",
            "科技蓝光",
            "国潮插画",
            "清新春日",
            "高端品牌广告",
            "游戏宣传视觉",
        ],
    },
    {
        title: "光线",
        field: "lighting",
        area: "style",
        items: [
            "柔和日光",
            "清晨阳光",
            "暖色夕阳",
            "霓虹灯光",
            "影棚布光",
            "高级灰光影",
            "明亮通透",
            "高对比商业光",
            "边缘轮廓光",
            "玻璃反射光",
        ],
    },
    {
        title: "色彩",
        field: "color",
        area: "style",
        items: [
            "暖橙色",
            "科技蓝",
            "蓝紫霓虹",
            "清新绿色",
            "高级灰",
            "红橙促销",
            "天空蓝",
            "金色高光",
            "奶白色",
            "银白色",
        ],
    },
    {
        title: "画质",
        field: "quality",
        area: "style",
        items: [
            "高清",
            "干净背景",
            "边缘清晰",
            "电影质感",
            "商业广告质感",
            "高级光影",
            "无噪点",
            "细节丰富",
            "主体清楚",
            "文字区域稳定",
        ],
    },
];

let myPresets = loadJson(USER_PRESETS_KEY, []);
let customElements = loadJson(CUSTOM_ELEMENTS_KEY, []);
let allPresets = [...builtInPresets, ...myPresets];
let current = clone(allPresets[0]);
let activePresetId = current.id;
let mode = "image";
let activeCategory = "全部";
let outputFormat = "full";
let settingsPinned = true;
let settingsHover = true;
let presetsExpanded = false;
let elementLibraryCollapsed = { content: true, style: true };
let mediaState = {
    status: "idle",
    mode: "image",
    prompt: "",
    url: "",
    mediaType: "image",
    error: "",
};

const $ = selector => document.querySelector(selector);
const quickPresetList = $("#quickPresetList");
const showAllPresetsBtn = $("#showAllPresetsBtn");
const allPresetsPanel = $("#allPresetsPanel");
const presetList = $("#presetList");
const categoryFilters = $("#categoryFilters");
const presetSearch = $("#presetSearch");
const formSections = $("#formSections");
const finalPrompt = $("#finalPrompt");
const copyState = $("#copyState");
const mediaPreview = $("#mediaPreview");
const mediaTitle = $("#mediaTitle");
const mediaModeBadge = $("#mediaModeBadge");
const mediaHint = $("#mediaHint");
const generateMediaBtn = $("#generateMediaBtn");
const downloadMediaBtn = $("#downloadMediaBtn");

// Put your own backend proxy URL here after the image/video model API is ready.
const MEDIA_API_ENDPOINT = "";

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function loadJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function saveUserPresets() {
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(myPresets));
    allPresets = [...builtInPresets, ...myPresets];
}

function saveCustomElements() {
    localStorage.setItem(CUSTOM_ELEMENTS_KEY, JSON.stringify(customElements));
}

function saveState() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            current,
            activePresetId,
            mode,
            activeCategory,
            outputFormat,
            settingsPinned,
            presetsExpanded,
            elementLibraryCollapsed,
        })
    );
}

function restoreState() {
    const state = loadJson(STORAGE_KEY, null);
    if (!state || !state.current) return;
    current = { ...createEmptyPreset(), ...state.current };
    activePresetId = state.activePresetId || current.id;
    mode = state.mode || "image";
    activeCategory = state.activeCategory || "全部";
    outputFormat = ["full", "video"].includes(state.outputFormat) ? state.outputFormat : "full";
    settingsPinned = typeof state.settingsPinned === "boolean" ? state.settingsPinned : true;
    presetsExpanded = false;
    elementLibraryCollapsed = {
        content:
            typeof state.elementLibraryCollapsed?.content === "boolean" ? state.elementLibraryCollapsed.content : true,
        style: typeof state.elementLibraryCollapsed?.style === "boolean" ? state.elementLibraryCollapsed.style : true,
    };
}

function createEmptyPreset() {
    return {
        id: `draft-${Date.now()}`,
        name: "",
        category: "我的预设",
        ratio: "16:9",
        usage: "",
        subject: "",
        scene: "",
        action: "",
        outfit: "",
        props: "",
        composition: "",
        camera: "",
        color: "",
        lighting: "",
        style: "",
        quality: "",
        mainTitle: "",
        subTitle: "",
        offerText: "",
        buttonText: "",
        slogan: "",
        sloganRule: defaultFontRule,
        negative: "",
        textNegative: "不要乱码，不要错别字，不要文字漂移",
        privacyNegative: "不生成品牌Logo、不生成水印、不生成二维码、不生成个人信息",
        videoLength: "8s",
        cameraMotion: "轻微推进",
        motionStrength: "稳定",
        videoRule: defaultVideoRule,
        tags: ["自定义"],
    };
}

function renderAll() {
    renderMode();
    renderCategories();
    renderQuickPresets();
    renderPresetList();
    renderForm();
    renderFormatButtons();
    renderDrawerState();
    renderAllPresetsPanel();
    updatePrompt();
}

function renderMode() {
    const isVideo = mode === "video";
    document.body.classList.toggle("mode-image", !isVideo);
    document.body.classList.toggle("mode-video", isVideo);
    $("#imageModeBtn")?.classList.toggle("active", !isVideo);
    $("#videoModeBtn")?.classList.toggle("active", isVideo);
    $("#centerMode").textContent = isVideo ? "文生视频" : "文生图";
    $("#centerRatio").textContent = current.ratio || "未设比例";
    $("#centerPreset").textContent = current.name || "未命名预设";
    $("#activeTitle").textContent = current.name || "未命名预设";
    document.querySelectorAll(".video-tab").forEach(button => {
        button.hidden = !isVideo;
    });
    if (!isVideo && outputFormat === "video") {
        outputFormat = "full";
        renderFormatButtons();
    }
    renderMediaPanel();
}

function renderDrawerState() {
    const open = settingsPinned || settingsHover;
    document.body.classList.toggle("drawer-collapsed", !open);
    document.body.classList.toggle("drawer-pinned", settingsPinned);
    const button = $("#drawerToggleBtn");
    if (!button) return;
    button.innerHTML = settingsPinned
        ? '<span class="drawer-button-inline">已固定 · 收起</span>'
        : open
          ? '<span class="drawer-button-inline">收起</span>'
          : '<span class="drawer-gear" aria-hidden="true">⚙</span><span class="drawer-vertical-text">打开设定</span><span class="drawer-chevron" aria-hidden="true">›</span>';
    button.setAttribute("aria-expanded", String(open));
}

function renderCategories() {
    categoryFilters.innerHTML = categories
        .map(
            category =>
                `<button class="filter-button ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">${category}</button>`
        )
        .join("");
}

function getFilteredPresets() {
    const keyword = presetSearch.value.trim().toLowerCase();
    return allPresets.filter(preset => {
        const matchCategory = activeCategory === "全部" || preset.category === activeCategory;
        const blob = [preset.name, preset.category, preset.usage, preset.subject, preset.scene].join(" ").toLowerCase();
        return matchCategory && (!keyword || blob.includes(keyword));
    });
}

function renderPresetList() {
    const filtered = getFilteredPresets();
    const count = $("#presetCount");
    if (count) count.textContent = `${filtered.length} 组`;
    presetList.innerHTML =
        filtered
            .map((preset, index) => {
                const isMine = preset.category === "我的预设";
                const tags = [preset.category, preset.ratio, ...(preset.tags || [])].slice(0, 4);
                return `
      <button class="preset-button ${preset.id === activePresetId ? "active" : ""}" type="button" data-id="${preset.id}">
        <div class="preset-card-top">
          <span class="preset-index">${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(preset.name)}</strong>
          ${isMine ? `<span class="delete-preset" data-delete-id="${preset.id}">删除</span>` : ""}
        </div>
        <p>${escapeHtml(preset.usage || "")}</p>
        <div class="preset-tags">${tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </button>
    `;
            })
            .join("") || `<div class="quality-item status-warn"><span class="dot"></span>没有匹配的预设</div>`;
}

function getQuickPresets() {
    return builtInPresets.slice(0, 6);
}

function renderQuickIcon(preset, index) {
    const quickIconById = {
        "mini-banner": "quick-preset-1.png",
        "ecommerce-coupon": "quick-preset-2.png",
        "local-life": "quick-preset-3.png",
        "game-launch": "quick-preset-4-safe.png",
        "travel-spring": "quick-preset-5-safe.png",
        "short-video-splash": "quick-preset-6-safe.png",
    };
    const quickIconByCategory = [
        ["电商", "quick-preset-2.png"],
        ["本地生活", "quick-preset-3.png"],
        ["游戏", "quick-preset-4-safe.png"],
        ["旅游", "quick-preset-5-safe.png"],
        ["短视频", "quick-preset-6-safe.png"],
        ["科技", "quick-preset-1.png"],
    ];
    const fallbackIcons = [
        "quick-preset-1.png",
        "quick-preset-2.png",
        "quick-preset-3.png",
        "quick-preset-4-safe.png",
        "quick-preset-5-safe.png",
        "quick-preset-6-safe.png",
    ];
    const fallback = fallbackIcons[index % fallbackIcons.length];
    const fileName =
        quickIconById[preset.id] ||
        quickIconByCategory.find(([category]) => String(preset.category || "").includes(category))?.[1] ||
        fallback;
    return `<img class="quick-illustration quick-image" src="assets/illustration/${fileName}" alt="" aria-hidden="true" loading="eager">`;
    const key = preset.category || "";
    if (key.includes("电商")) {
        return `
      <svg class="quick-illustration quick-icon-coupon" viewBox="0 0 112 82" aria-hidden="true">
        <path class="shadow" d="M21 61h70v8H21z"/>
        <path class="ticket" d="M19 24h74c-4 6-4 12 0 18-5 6-5 12 0 18H19c4-6 4-12 0-18 5-6 5-12 0-18Z"/>
        <path class="ticket-fold" d="M31 25h49l5 7H26z"/>
        <circle class="ticket-dot" cx="39" cy="42" r="5"/>
        <circle class="ticket-dot" cx="73" cy="42" r="5"/>
        <path class="percent" d="M43 55 71 29M44 32a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm26 20a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"/>
      </svg>`;
    }
    if (key.includes("本地生活")) {
        return `
      <svg class="quick-illustration quick-icon-store" viewBox="0 0 112 82" aria-hidden="true">
        <path class="shadow" d="M28 68h58v7H28z"/>
        <rect class="store-body" x="31" y="34" width="52" height="34" rx="5"/>
        <path class="awning-base" d="M25 24h64l-6 14H31z"/>
        <path class="awning-stripe" d="M29 24h12l-2 14H25zM53 24h12v14H51zM77 24h12l-4 14H73z"/>
        <rect class="door" x="51" y="47" width="16" height="21" rx="3"/>
        <rect class="window" x="36" y="47" width="11" height="10" rx="2"/>
        <circle class="plant" cx="26" cy="61" r="5"/>
        <path class="plant-stem" d="M26 66v8"/>
      </svg>`;
    }
    if (key.includes("游戏")) {
        return `
      <svg class="quick-illustration quick-icon-game" viewBox="0 0 112 82" aria-hidden="true">
        <path class="shadow" d="M26 61h62v9H26z"/>
        <path class="pad" d="M30 32c7-8 18-7 27-2h8c9-5 21-6 27 2 6 9 11 28 4 34-6 5-14-2-21-11H47c-7 9-15 16-21 11-7-6-2-25 4-34Z"/>
        <path class="cross" d="M42 43v14M35 50h14"/>
        <circle class="btn green" cx="76" cy="47" r="4"/>
        <circle class="btn orange" cx="88" cy="51" r="4"/>
        <circle class="btn blue" cx="80" cy="60" r="4"/>
        <path class="shine" d="M36 35c8-4 16-3 22 1"/>
      </svg>`;
    }
    if (key.includes("旅游")) {
        return `
      <svg class="quick-illustration quick-icon-travel" viewBox="0 0 112 82" aria-hidden="true">
        <path class="shadow" d="M24 66h70v8H24z"/>
        <path class="mount back" d="M21 63 44 29l23 34Z"/>
        <path class="mount front" d="M42 66 68 25l27 41Z"/>
        <path class="snow" d="m61 36 7-11 8 12-8-4Z"/>
        <circle class="sun" cx="82" cy="25" r="8"/>
        <path class="sign-post" d="M77 50v20"/>
        <path class="sign" d="M72 45h24l-5 7H72z"/>
      </svg>`;
    }
    if (key.includes("短视频")) {
        return `
      <svg class="quick-illustration quick-icon-phone" viewBox="0 0 112 82" aria-hidden="true">
        <path class="shadow" d="M40 67h40v7H40z"/>
        <rect class="phone" x="43" y="12" width="34" height="58" rx="8"/>
        <rect class="screen" x="48" y="20" width="24" height="40" rx="5"/>
        <path class="play" d="m57 34 13 8-13 8Z"/>
        <circle class="home" cx="60" cy="65" r="2.5"/>
        <path class="spark" d="M32 22h8M36 18v8"/>
      </svg>`;
    }
    if (key.includes("科技")) {
        return `
      <svg class="quick-illustration quick-icon-tech" viewBox="0 0 112 82" aria-hidden="true">
        <path class="shadow" d="M29 66h58v8H29z"/>
        <rect class="device" x="30" y="24" width="54" height="38" rx="10"/>
        <circle class="glow" cx="57" cy="43" r="13"/>
        <path class="circuit" d="M38 43h11M65 43h12M57 30v-8M57 56v8"/>
        <circle class="node" cx="57" cy="43" r="5"/>
      </svg>`;
    }
    return `
    <svg class="quick-illustration quick-icon-gift" viewBox="0 0 112 82" aria-hidden="true">
      <path class="shadow" d="M27 65h58v8H27z"/>
      <rect class="window" x="22" y="20" width="68" height="46" rx="10"/>
      <path class="window-bar" d="M22 32h68"/>
      <circle class="dot red" cx="31" cy="26" r="3"/>
      <circle class="dot yellow" cx="41" cy="26" r="3"/>
      <circle class="dot green" cx="51" cy="26" r="3"/>
      <rect class="gift" x="43" y="39" width="30" height="22" rx="3"/>
      <path class="ribbon" d="M58 39v22M43 48h30"/>
      <path class="bow" d="M58 38c-13-13-19 2 0 4 19-2 13-17 0-4Z"/>
    </svg>`;
}

function renderQuickPresets() {
    if (!quickPresetList) return;
    quickPresetList.innerHTML = getQuickPresets()
        .map(
            (preset, index) => `
    <button class="quick-preset-card ${preset.id === activePresetId ? "active" : ""}" type="button" data-id="${preset.id}">
      <span class="quick-index">${String(index + 1).padStart(2, "0")}</span>
      ${renderQuickIcon(preset, index)}
      <strong>${escapeHtml(preset.name)}</strong>
      <small>${escapeHtml(preset.category)} · ${escapeHtml(preset.ratio)}</small>
    </button>
  `
        )
        .join("");
}

function renderAllPresetsPanel() {
    if (!allPresetsPanel || !showAllPresetsBtn) return;
    allPresetsPanel.hidden = !presetsExpanded;
    showAllPresetsBtn.textContent = presetsExpanded ? "收起全部" : "查看全部";
    showAllPresetsBtn.setAttribute("aria-expanded", String(presetsExpanded));
}

function renderForm() {
    formSections.innerHTML = sections
        .map(section => {
            const hidden = section.videoOnly && mode !== "video";
            const area = section.title === "画面内容" ? "content" : section.title === "视觉风格" ? "style" : "";
            const index = sections.indexOf(section) + 1;
            return `
      <section class="module-card ${hidden ? "hidden" : ""}">
        <div class="module-head">
          <div class="module-title"><span class="module-index">${String(index).padStart(2, "0")}</span><div><h3>${section.title}</h3></div></div>
          ${section.title === "基础设定" ? `<span class="soft-label">${mode === "video" ? "文生视频" : "文生图"}</span>` : ""}
        </div>
        <div class="field-grid">
          ${section.fields.map(renderField).join("")}
        </div>
        ${area ? renderInlineElementLibrary(area) : ""}
      </section>
    `;
        })
        .join("");
}

function renderField(field) {
    const value = current[field.key] ?? "";
    const wide = field.wide ? "wide" : "";
    if (field.type === "select") {
        return `
      <div class="field ${wide}">
        <label for="${field.key}">${field.label}</label>
        <select id="${field.key}" data-field="${field.key}">
          ${field.options.map(option => `<option value="${escapeHtml(option)}" ${String(value) === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </div>
    `;
    }
    if (field.type === "input") {
        return `
      <div class="field ${wide}">
        <label for="${field.key}">${field.label}</label>
        <input id="${field.key}" data-field="${field.key}" value="${escapeHtml(value)}">
      </div>
    `;
    }
    return `
    <div class="field ${wide}">
      <label for="${field.key}">${field.label}</label>
      <textarea id="${field.key}" data-field="${field.key}">${escapeHtml(value)}</textarea>
    </div>
  `;
}

function renderInlineElementLibrary(area) {
    const title = area === "content" ? "画面内容提示词库" : "视觉风格提示词库";
    const groups = elementGroups.filter(group => group.area === area);
    const collapsed = elementLibraryCollapsed[area] !== false;
    return `
    <div class="inline-element-library ${collapsed ? "collapsed" : ""}" data-library-area="${area}">
      <div class="element-library-head">
        <h4>${title}</h4>
        <button class="library-toggle" type="button" data-library-toggle="${area}" aria-expanded="${String(!collapsed)}">
          ${collapsed ? "展开" : "收起"}
        </button>
      </div>
      <div class="element-library-body">
        <div class="element-library">
          ${groups.map(renderElementGroup).join("")}
        </div>
        ${area === "style" ? renderCustomElementControls() : ""}
      </div>
    </div>
  `;
}

function renderElementGroup(group) {
    const customForGroup = customElements.filter(item => item.title === group.title);
    const builtInButtons = group.items.map(item => renderElementButton(group, item, false)).join("");
    const customButtons = customForGroup.map(item => renderElementButton(item, item.value, true)).join("");
    return `
    <div class="element-group">
      <h4>${group.title}</h4>
      <div class="element-buttons">
        ${builtInButtons}${customButtons}
      </div>
    </div>
  `;
}

function renderElementButton(group, value, custom) {
    const active = fieldContainsValue(group.field, value);
    return `
    <div class="element-chip ${active ? "active" : ""} ${custom ? "custom-element-chip" : ""}" data-target="${group.field}" data-value="${escapeHtml(value)}">
      <button class="chip-action chip-add" type="button" data-action="add-element" title="添加">+</button>
      <span class="chip-label" data-action="add-element">${escapeHtml(value)}</span>
      <button class="chip-action chip-remove" type="button" data-action="remove-element" title="从当前字段移除">−</button>
      ${custom ? `<button class="chip-action chip-delete-custom" type="button" data-custom-delete="${group.id}" title="从元素库删除">×</button>` : ""}
    </div>
  `;
}

function fieldContainsValue(field, value) {
    const parts = String(current[field] || "")
        .split(/[、,，]/)
        .map(item => item.trim())
        .filter(Boolean);
    return parts.includes(value);
}

function renderCustomElementControls() {
    return `
    <div class="custom-element">
      <input id="customElementInput" type="text" placeholder="请输入自定义元素">
      <select id="customElementTarget">
        ${elementGroups.map(group => `<option value="${group.title}">${group.title}</option>`).join("")}
      </select>
      <button id="addCustomElementBtn" type="button" class="primary-button">添加到元素库</button>
    </div>
  `;
}

function renderFormatButtons() {
    document.querySelectorAll(".prompt-tab[data-format]").forEach(button => {
        button.classList.toggle("active", button.dataset.format === outputFormat);
    });
    const titleMap = {
        full: "完整提示词",
        content: "画面内容",
        copy: "广告文案",
        style: "风格规则",
        video: "视频设置",
    };
    const resultTitle = document.querySelector(".prompt-result-title");
    if (resultTitle) resultTitle.textContent = titleMap[outputFormat] || "完整提示词";
}

function appendToField(field, value) {
    const text = value.trim();
    if (!text) return;
    const oldValue = String(current[field] || "").trim();
    const parts = oldValue
        .split(/[、,，]/)
        .map(item => item.trim())
        .filter(Boolean);
    if (parts.includes(text)) {
        copyState.textContent = "当前字段已包含这个元素";
        return;
    }
    current[field] = oldValue ? `${oldValue}、${text}` : text;
    renderForm();
    updatePrompt();
    saveState();
    copyState.textContent = "已添加元素";
}

function removeFromField(field, value) {
    const text = value.trim();
    if (!text) return;

    const oldValue = String(current[field] || "").trim();
    if (!oldValue) {
        copyState.textContent = "当前字段没有这个元素";
        return;
    }

    const parts = oldValue
        .split(/[、,，]/)
        .map(item => item.trim())
        .filter(Boolean);

    const nextParts = parts.filter(item => item !== text);

    if (nextParts.length === parts.length) {
        copyState.textContent = "当前字段没有这个元素";
        return;
    }

    current[field] = nextParts.join("、");
    renderForm();
    updatePrompt();
    saveState();
    copyState.textContent = "已移除元素";
}

function addCustomElement() {
    const input = $("#customElementInput");
    const target = $("#customElementTarget");
    if (!input || !target) return;
    const value = input.value.trim();
    if (!value) return;
    const group = elementGroups.find(item => item.title === target.value);
    if (!group) return;
    const existsBuiltIn = group.items.includes(value);
    const existsCustom = customElements.some(item => item.title === group.title && item.value === value);
    if (!existsBuiltIn && !existsCustom) {
        customElements.push({
            id: `custom-${Date.now()}`,
            title: group.title,
            field: group.field,
            area: group.area,
            value,
        });
        saveCustomElements();
        renderForm();
    }
    input.value = "";
}

function deleteCustomElement(id) {
    customElements = customElements.filter(item => item.id !== id);
    saveCustomElements();
    renderForm();
    updatePrompt();
}

function filled(value, fallback = "未填写") {
    return String(value || "").trim() || fallback;
}

function buildFullPrompt() {
    const lines = [
        `生成模式：${mode === "video" ? "文生视频" : "文生图"}`,
        `画面类型：${filled(current.name)}`,
        `比例：${filled(current.ratio)}`,
        "",
        "【主体】",
        filled(current.subject),
        "",
        "【场景】",
        filled(current.scene),
        "",
        "【动作 / 服装 / 道具】",
        `动作：${filled(current.action)}`,
        `服装：${filled(current.outfit)}`,
        `道具：${filled(current.props)}`,
        "",
        "【构图/镜头】",
        `${filled(current.composition)}${current.camera ? `，${current.camera}` : ""}`,
        "",
        "【广告文案】",
        `主标题：${filled(current.mainTitle)}`,
        `副标题：${filled(current.subTitle)}`,
        `价格/优惠：${filled(current.offerText)}`,
        `按钮：${filled(current.buttonText)}`,
        `完整标语：${filled(current.slogan)}`,
        "",
        "【视觉风格】",
        `${filled(current.style)}，${current.color || ""}，${current.lighting || ""}，${current.quality || ""}`,
        "",
        "【字体/标语规则】",
        filled(current.sloganRule),
        "",
        "【投放用途】",
        filled(current.usage),
    ];
    if (mode === "video") {
        lines.push(
            "",
            "【视频设置】",
            `视频长度：${current.videoLength}`,
            `镜头运动：${current.cameraMotion}`,
            `动态强度：${current.motionStrength}`,
            `视频限制：${current.videoRule}`
        );
    }
    return lines.join("\n");
}

function buildContentPrompt() {
    return [
        "【画面内容】",
        `主体：${filled(current.subject)}`,
        `场景：${filled(current.scene)}`,
        `动作/姿态：${filled(current.action)}`,
        `服装：${filled(current.outfit)}`,
        `道具：${filled(current.props)}`,
        `构图：${filled(current.composition)}`,
        `镜头：${filled(current.camera)}`,
    ].join("\n");
}

function buildCopyPrompt() {
    return [
        "【广告文案】",
        `主标题：${filled(current.mainTitle)}`,
        `副标题：${filled(current.subTitle)}`,
        `价格/优惠：${filled(current.offerText)}`,
        `按钮文案：${filled(current.buttonText)}`,
        `完整标语：${filled(current.slogan)}`,
        "",
        "【字体/标语规则】",
        filled(current.sloganRule),
    ].join("\n");
}

function buildStylePrompt() {
    return [
        "【风格规则】",
        `视觉风格：${filled(current.style)}`,
        `色彩：${filled(current.color)}`,
        `光线：${filled(current.lighting)}`,
        `画质细节：${filled(current.quality)}`,
        `比例：${filled(current.ratio)}`,
        `投放用途：${filled(current.usage)}`,
    ].join("\n");
}

function buildVideoPrompt() {
    if (mode !== "video") return "当前为文生图模式，切换到文生视频后可查看视频设置。";
    return [
        "【视频设置】",
        `视频长度：${filled(current.videoLength)}`,
        `镜头运动：${filled(current.cameraMotion)}`,
        `动态强度：${filled(current.motionStrength)}`,
        `视频限制：${filled(current.videoRule)}`,
    ].join("\n");
}

function buildPrompt() {
    if (outputFormat === "content") return buildContentPrompt();
    if (outputFormat === "copy") return buildCopyPrompt();
    if (outputFormat === "style") return buildStylePrompt();
    if (outputFormat === "video") return buildVideoPrompt();
    return buildFullPrompt();
}

function renderPromptHtml(prompt) {
    let sectionIndex = 0;
    return String(prompt || "")
        .split("\n")
        .map(line => {
            if (!line.trim()) return `<span class="prompt-gap" aria-hidden="true"></span>`;
            const match = line.match(/^【(.+)】$/);
            if (match) {
                sectionIndex += 1;
                const tone = ((sectionIndex - 1) % 6) + 1;
                return `<span class="prompt-section-title tone-${tone}">${escapeHtml(line)}</span>`;
            }
            return `<span class="prompt-line">${escapeHtml(line)}</span>`;
        })
        .join("");
}

function updatePrompt() {
    const prompt = buildPrompt();
    const formatChanged = finalPrompt.dataset.lastFormat !== outputFormat;
    finalPrompt.dataset.rawPrompt = prompt;
    finalPrompt.innerHTML = renderPromptHtml(prompt);
    if (formatChanged) {
        finalPrompt.scrollTop = 0;
        finalPrompt.dataset.lastFormat = outputFormat;
    }
    renderMode();
    renderQuality();
    copyState.textContent = "已根据当前内容更新";
    saveState();
}

function resetMediaState(nextMode = mode) {
    mediaState = {
        status: "idle",
        mode: nextMode,
        prompt: "",
        url: "",
        mediaType: nextMode === "video" ? "video" : "image",
        error: "",
    };
}

function renderMediaPanel() {
    if (!mediaPreview) return;
    const isVideo = mode === "video";
    const modeLabel = isVideo ? "文生视频" : "文生图";
    const mediaLabel = isVideo ? "视频" : "图片";
    const actionLabel = isVideo ? "生成视频" : "生成图片";
    const promptChanged =
        mediaState.status === "success" && mediaState.prompt && mediaState.prompt !== buildFullPrompt();

    mediaTitle.textContent = `${mediaLabel}生成预览`;
    mediaModeBadge.textContent = modeLabel;
    generateMediaBtn.textContent = actionLabel;
    downloadMediaBtn.disabled = mediaState.status !== "success" || !mediaState.url;
    mediaPreview.className = `media-preview status-${mediaState.status} ${isVideo ? "is-video" : "is-image"}`;

    if (mediaState.status === "loading") {
        mediaPreview.innerHTML = `
      <div class="media-loading">
        <div class="media-loading-bars" aria-hidden="true"><i></i><i></i><i></i></div>
        <strong>正在提交${mediaLabel}任务</strong>
        <span>会把左侧完整提示词作为请求内容，等待模型接口返回结果。</span>
      </div>
    `;
        mediaHint.textContent = "生成中，请稍等。正式接入异步视频接口时，这里可以改成轮询任务进度。";
        return;
    }

    if (mediaState.status === "error") {
        mediaPreview.innerHTML = `
      <div class="media-error">
        <strong>${mediaLabel}生成未完成</strong>
        <span>${escapeHtml(mediaState.error || "接口返回异常，请检查 API 配置。")}</span>
      </div>
    `;
        mediaHint.textContent = "当前页面已预留接口位置，但正式密钥应放在后端代理里，不要写进 GitHub Pages 前端。";
        return;
    }

    if (mediaState.status === "success" && mediaState.url) {
        const safeUrl = escapeHtml(mediaState.url);
        mediaPreview.innerHTML = isVideo
            ? `<div class="media-result"><video src="${safeUrl}" controls playsinline></video></div>`
            : `<div class="media-result"><img src="${safeUrl}" alt="生成结果"></div>`;
        mediaHint.textContent = promptChanged
            ? "提示词已经改过，当前展示的是上一次生成结果。"
            : "生成完成，可以下载结果或继续调整提示词后重新生成。";
        return;
    }

    mediaPreview.innerHTML = `
      <div class="media-empty">
        <div class="media-empty-icon" aria-hidden="true"></div>
        <strong>等待生成${mediaLabel}</strong>
        <span>点击“${actionLabel}”后，会用左侧完整提示词调用模型接口。</span>
      </div>
  `;
    mediaHint.textContent = "接口未接入前，这里只展示预览容器和状态；后续只需要配置后端代理地址。";
}

function pickMediaUrl(data) {
    if (!data || typeof data !== "object") return "";
    const direct = data.url || data.imageUrl || data.videoUrl || data.outputUrl;
    if (direct) return direct;
    const nested =
        data.data?.url ||
        data.data?.imageUrl ||
        data.data?.videoUrl ||
        data.result?.url ||
        data.result?.imageUrl ||
        data.result?.videoUrl;
    if (nested) return nested;
    const outputs = data.outputs || data.output || data.images || data.videos;
    if (Array.isArray(outputs) && outputs.length) {
        const first = outputs[0];
        return typeof first === "string" ? first : first?.url || first?.imageUrl || first?.videoUrl || "";
    }
    return "";
}

async function generateMediaFromPrompt({ prompt, mode: requestMode, preset }) {
    if (!MEDIA_API_ENDPOINT) {
        throw new Error("接口未配置：请先把 app.js 里的 MEDIA_API_ENDPOINT 换成你的后端代理地址。");
    }

    const response = await fetch(MEDIA_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mode: requestMode,
            prompt,
            preset,
        }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.message || data.error || `接口请求失败：HTTP ${response.status}`);
    }
    const url = pickMediaUrl(data);
    if (!url) {
        throw new Error("接口已返回，但没有找到图片或视频地址。");
    }
    return {
        url,
        mediaType: data.mediaType || data.type || (requestMode === "video" ? "video" : "image"),
    };
}

async function handleGenerateMedia() {
    const requestMode = mode;
    const prompt = buildFullPrompt();
    mediaState = {
        status: "loading",
        mode: requestMode,
        prompt,
        url: "",
        mediaType: requestMode === "video" ? "video" : "image",
        error: "",
    };
    renderMediaPanel();

    try {
        const result = await generateMediaFromPrompt({ prompt, mode: requestMode, preset: clone(current) });
        mediaState = {
            status: "success",
            mode: requestMode,
            prompt,
            url: result.url,
            mediaType: result.mediaType || (requestMode === "video" ? "video" : "image"),
            error: "",
        };
        copyState.textContent = requestMode === "video" ? "视频结果已返回" : "图片结果已返回";
    } catch (error) {
        mediaState = {
            status: "error",
            mode: requestMode,
            prompt,
            url: "",
            mediaType: requestMode === "video" ? "video" : "image",
            error: error.message || "生成失败，请检查接口配置。",
        };
        copyState.textContent = "生成接口暂未完成";
    }

    renderMediaPanel();
}

function downloadMediaResult() {
    if (!mediaState.url) return;
    const a = document.createElement("a");
    a.href = mediaState.url;
    a.download = mediaState.mediaType === "video" ? "didi-prompt-video.mp4" : "didi-prompt-image.png";
    a.target = "_blank";
    a.rel = "noopener";
    a.click();
}

function renderQuality() {
    const checks = [
        ["是否填写主体", current.subject ? "ok" : "miss"],
        ["是否填写场景", current.scene ? "ok" : "miss"],
        ["是否填写风格", current.style ? "ok" : "miss"],
        ["是否填写比例", current.ratio ? "ok" : "miss"],
        ["视频长度已选择", mode !== "video" ? "ok" : current.videoLength ? "ok" : "miss"],
        ["广告图有主标题或标语", current.mainTitle || current.slogan ? "ok" : "miss"],
        ["字体/标语规则已填写", current.sloganRule ? "ok" : "warn"],
    ];
    const okCount = checks.filter(([, status]) => status === "ok").length;
    $("#qualitySummary").textContent = `${okCount}/${checks.length} 项通过`;
    $("#qualityList").innerHTML = checks
        .map(([label, status]) => {
            const className = status === "ok" ? "status-ok" : status === "warn" ? "status-warn" : "status-miss";
            const text = status === "ok" ? "完整" : status === "warn" ? "建议补充" : "缺失";
            return `<div class="quality-item ${className}"><span class="dot"></span><span>${label}：${text}</span></div>`;
        })
        .join("");
}

function selectPreset(id) {
    const preset = allPresets.find(item => item.id === id);
    if (!preset) return;
    current = { ...createEmptyPreset(), ...clone(preset) };
    activePresetId = id;
    renderQuickPresets();
    renderPresetList();
    renderForm();
    updatePrompt();
}

async function copyText(text, message) {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    copyState.textContent = message;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
    }
}

function saveAsMyPreset() {
    const saved = {
        ...clone(current),
        id: `mine-${Date.now()}`,
        category: "我的预设",
        tags: ["我的预设", mode === "video" ? "视频" : "图片"],
    };
    saved.name = saved.name || `我的预设 ${myPresets.length + 1}`;
    myPresets.push(saved);
    saveUserPresets();
    activeCategory = "我的预设";
    activePresetId = saved.id;
    current = clone(saved);
    renderAll();
    copyState.textContent = "已保存到我的预设";
}

function deleteMyPreset(id) {
    myPresets = myPresets.filter(preset => preset.id !== id);
    saveUserPresets();
    if (activePresetId === id) {
        current = clone(builtInPresets[0]);
        activePresetId = current.id;
    }
    renderAll();
}

function clearCurrent() {
    current = createEmptyPreset();
    activePresetId = current.id;
    renderForm();
    renderPresetList();
    updatePrompt();
    copyState.textContent = "已清空当前编辑";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

categoryFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCategories();
    renderPresetList();
    saveState();
});

presetSearch.addEventListener("input", () => {
    renderPresetList();
});

quickPresetList.addEventListener("click", event => {
    const card = event.target.closest("[data-id]");
    if (card) selectPreset(card.dataset.id);
});

showAllPresetsBtn.addEventListener("click", () => {
    presetsExpanded = !presetsExpanded;
    renderAllPresetsPanel();
    saveState();
});

presetList.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-delete-id]");
    if (deleteButton) {
        event.stopPropagation();
        deleteMyPreset(deleteButton.dataset.deleteId);
        return;
    }
    const card = event.target.closest("[data-id]");
    if (card) selectPreset(card.dataset.id);
});

formSections.addEventListener("input", event => {
    const key = event.target.dataset.field;
    if (!key) return;
    current[key] = event.target.value;
    updatePrompt();
});

formSections.addEventListener("change", event => {
    const key = event.target.dataset.field;
    if (!key) return;
    current[key] = event.target.value;
    updatePrompt();
});

formSections.addEventListener("click", event => {
    const libraryToggle = event.target.closest("[data-library-toggle]");
    if (libraryToggle) {
        const area = libraryToggle.dataset.libraryToggle;
        elementLibraryCollapsed[area] = !(elementLibraryCollapsed[area] !== false);
        renderForm();
        saveState();
        return;
    }

    const deleteButton = event.target.closest("[data-custom-delete]");
    if (deleteButton) {
        event.stopPropagation();
        deleteCustomElement(deleteButton.dataset.customDelete);
        return;
    }
    if (event.target.closest("#addCustomElementBtn")) {
        addCustomElement();
        return;
    }
    const chip = event.target.closest(".element-chip");
    if (!chip) return;

    const field = chip.dataset.target;
    const value = chip.dataset.value;
    const actionButton = event.target.closest("[data-action]");
    const action = actionButton?.dataset.action || "add-element";

    if (action === "remove-element") {
        event.stopPropagation();
        removeFromField(field, value);
        return;
    }

    appendToField(field, value);
});

$("#imageModeBtn").addEventListener("click", () => {
    const changed = mode !== "image";
    mode = "image";
    if (changed) resetMediaState(mode);
    renderForm();
    updatePrompt();
});

$("#videoModeBtn").addEventListener("click", () => {
    const changed = mode !== "video";
    mode = "video";
    if (changed) resetMediaState(mode);
    renderForm();
    updatePrompt();
});

$("#promptTabs").addEventListener("click", event => {
    const button = event.target.closest("[data-format]");
    if (!button) return;
    outputFormat = button.dataset.format;
    renderFormatButtons();
    updatePrompt();
});

$("#copyFullBtn").addEventListener("click", () => copyText(buildFullPrompt(), "已复制完整提示词"));
$("#clearBtn").addEventListener("click", clearCurrent);
$("#generateMediaBtn").addEventListener("click", handleGenerateMedia);
$("#downloadMediaBtn").addEventListener("click", downloadMediaResult);
$("#savePresetInlineBtn").addEventListener("click", saveAsMyPreset);
restoreState();
renderAll();
