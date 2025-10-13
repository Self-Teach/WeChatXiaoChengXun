/**
 * 存储云南茶叶与科普信息的本地数据模块。
 * 所有商品信息都来自公开渠道资料，实际使用中可以替换为企业自有数据。
 */
const teaProducts = [
  {
    id: 'pu-er-raw',
    name: '勐海生普洱',
    price: 298,
    origin: '西双版纳勐海茶区',
    flavor: '花果香、山野气韵',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 298 },
      { id: '200g', label: '200克饼', price: 188 }
    ],
    description: '选取勐海早春头采大树茶，带有明显的花蜜香与山野气，回甘持久。',
    highlights: ['头采嫩叶，甜润柔滑', '勐海山野韵味浓郁', '适合藏存陈化'],
    brewGuides: ['醒茶 1-2 次以唤醒茶性', '95℃ 纯净水快出汤，保留鲜爽', '前几泡控制 5-8 秒出汤'],
    reviews: [
      { user: '茶友阿林', rating: 5, date: '2023-11-12', content: '汤感饱满，入口柔顺甘甜，香气高扬。' },
      { user: '南国茶客', rating: 4, date: '2024-02-18', content: '山场气息明显，存放后潜力大。' }
    ],
    detail: '勐海茶区海拔高、云雾多，茶树养分积累充分，茶汤亮黄透澈，生津持久。'
  },
  {
    id: 'pu-er-ripe',
    name: '勐海熟普洱',
    price: 268,
    origin: '勐海布朗山',
    flavor: '枣香、糯甜',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 268 },
      { id: '100g', label: '100克小饼', price: 118 }
    ],
    description: '布朗山大叶种晒青原料，经 45 天渥堆发酵，呈现红枣香与糯米甜感。',
    highlights: ['经典渥堆工艺，汤色红浓', '糯甜顺滑，适合日常饮用', '醒茶后香气逐渐醇厚'],
    brewGuides: ['沸水冲泡，洗茶 2 次', '前 3 泡 5 秒出汤，之后逐步延长', '保持盖碗温度更显糯甜'],
    reviews: [
      { user: '布朗小叶', rating: 5, date: '2024-01-05', content: '糯感十足，滋味醇厚，办公日常必备。' },
      { user: '滇南慢生活', rating: 4, date: '2023-09-23', content: '枣香明显，耐泡度不错。' }
    ],
    detail: '布朗山古茶园海拔 1400 米，红褐色汤水油亮粘稠，滋味甘甜顺滑。'
  },
  {
    id: 'bingdao-raw',
    name: '冰岛古树茶',
    price: 1280,
    origin: '临沧双江冰岛村',
    flavor: '兰花香、甜润',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '200g',
    specs: [
      { id: '200g', label: '200克饼', price: 1280 },
      { id: '100g', label: '100克礼盒', price: 688 }
    ],
    description: '源自冰岛老寨，茶气细腻绵长，汤感绵柔甜润，兰花香高雅。',
    highlights: ['老寨古树纯料', '汤质细腻、甜感悠长', '收藏级礼赠佳选'],
    brewGuides: ['投茶 7 克，90℃ 清水冲泡', '快速注水，保留细腻香气', '第三泡起稍延长时间，体会层次'],
    reviews: [
      { user: '冰岛村口', rating: 5, date: '2024-03-09', content: '兰香高扬，回甘持久，值得慢慢体会。' },
      { user: '旅人七七', rating: 5, date: '2023-12-28', content: '入口绵柔，甜润细腻，满口生香。' }
    ],
    detail: '冰岛茶以其汤感柔滑、蜜甜和冰糖甜为特色，回味悠长，被誉为云南高端生茶代表。'
  },
  {
    id: 'yiwu-raw',
    name: '易武古树茶',
    price: 980,
    origin: '西双版纳易武茶区',
    flavor: '蜜香、柔滑',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 980 },
      { id: '200g', label: '200克饼', price: 588 }
    ],
    description: '易武茶区茶气柔和，汤质细腻甜润，蜜香深长，入口丝滑。',
    highlights: ['易武柔甜典型口感', '蜜香显著，回味绵长', '适合喜欢柔顺口感的茶友'],
    brewGuides: ['90-95℃ 冲泡，轻投茶', '前几泡快出汤，保持汤水柔滑', '中后段适当延长时间提升层次'],
    reviews: [
      { user: '易武藏家', rating: 5, date: '2024-04-12', content: '柔甜蜜香，非常顺口，生津持久。' },
      { user: '小隐于市', rating: 4, date: '2023-10-06', content: '香气细腻，建议使用盖碗冲泡控制水温。' }
    ],
    detail: '易武茶山森林覆盖率高，茶叶条索肥壮，茶汤蜜黄透亮，香扬水柔，具有极佳陈化潜力。'
  },
  {
    id: 'lincang-gushu',
    name: '临沧勐库大雪山',
    price: 520,
    origin: '临沧勐库',
    flavor: '高扬花香、清甜',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 520 },
      { id: '50g', label: '50克试饮装', price: 108 }
    ],
    description: '勐库大雪山以花香高扬见长，汤感清冽甘爽，叶底柔韧有弹性。',
    highlights: ['高海拔茶区，花香显', '甜度清爽，适口性强', '适合作为日常口粮茶'],
    brewGuides: ['投茶 6 克，95℃ 水快速出汤', '第三泡起逐步延长 5 秒', '注意及时分杯，避免过度浸泡'],
    reviews: [
      { user: '山里人家', rating: 4, date: '2024-02-01', content: '香气扬，汤水清甜，耐泡度优秀。' },
      { user: '茶路同行', rating: 4, date: '2023-08-19', content: '叶底柔韧有活性，性价比不错。' }
    ],
    detail: '大雪山茶区常年云雾缭绕，茶汤带有明显的兰花香与清甜感，回甘迅猛。'
  },
  {
    id: 'jingmai-raw',
    name: '景迈香古树',
    price: 860,
    origin: '普洱市澜沧景迈山',
    flavor: '兰花香、山韵悠长',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 860 },
      { id: '100g', label: '100克礼盒', price: 328 }
    ],
    description: '景迈山古茶园保存完好，茶汤兰花香浓郁，山野气息厚重，甜润细腻。',
    highlights: ['千年古茶园风味', '兰花香显著，甜韵十足', '适合老茶客收藏'],
    brewGuides: ['投茶 7 克，95℃ 水温', '前段快出汤保持兰香', '中段适当延长，体验山野韵味'],
    reviews: [
      { user: '景迈守望者', rating: 5, date: '2023-11-02', content: '山韵十足，香甜并存，回甘悠长。' },
      { user: '阿文', rating: 4, date: '2024-01-17', content: '香气层次丰富，需要耐心冲泡。' }
    ],
    detail: '景迈山被列入世界文化遗产，古茶林生态完整，造就了兰花香与甜韵兼备的独特口感。'
  },
  {
    id: 'bulang-raw',
    name: '布朗山春茶',
    price: 360,
    origin: '勐海布朗山',
    flavor: '山野气、苦尽甘来',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 360 },
      { id: '200g', label: '200克饼', price: 218 }
    ],
    description: '布朗山春茶茶气强劲，苦尽甘来，回甘迅速，是喜爱茶气茶友的心头好。',
    highlights: ['茶气足，劲道强', '苦尽甘来，回甘持久', '适合收藏或调饮'],
    brewGuides: ['建议投茶 6 克，使用沸水', '前几泡控制 3-5 秒出汤', '可搭配冰糖或花草调饮'],
    reviews: [
      { user: '山野行者', rating: 5, date: '2024-03-21', content: '茶气强烈，回甘非常快，力量感十足。' },
      { user: '普洱爱好者', rating: 4, date: '2023-07-30', content: '适合偏好重口的茶友，耐泡。' }
    ],
    detail: '布朗山属南亚热带季风气候，茶叶富含内含物质，带来浓烈厚重的山野气息。'
  },
  {
    id: 'nan-nuo-raw',
    name: '南糯山古树茶',
    price: 420,
    origin: '西双版纳南糯山',
    flavor: '蜜香、山野气',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '357g',
    specs: [
      { id: '357g', label: '357克饼', price: 420 },
      { id: '100g', label: '100克礼盒', price: 198 }
    ],
    description: '南糯山海拔高，云雾缭绕，茶汤蜜香显著，带有山野气息。',
    highlights: ['蜜香浓，茶汤甜', '山野气十足，耐泡度高', '入门与进阶茶友都适合'],
    brewGuides: ['投茶 6 克，水温 92℃', '前段保持快出汤', '中后段可延长以释放甜润'],
    reviews: [
      { user: '山谷微风', rating: 4, date: '2024-04-03', content: '香气迷人，汤感饱满，适合日常喝。' },
      { user: '茶山行者', rating: 4, date: '2023-09-01', content: '甜润持久，山野气十足。' }
    ],
    detail: '南糯山茶叶条索紧结，香气高扬，冲泡后茶汤金黄透亮，滋味甜润。'
  },
  {
    id: 'black-tea',
    name: '滇红金芽',
    price: 198,
    origin: '临沧凤庆',
    flavor: '蜜糖香、甘甜',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '100g',
    specs: [
      { id: '100g', label: '100克铁罐', price: 198 },
      { id: '50g', label: '50克礼盒', price: 118 }
    ],
    description: '滇红金芽条索金毫显露，蜜糖香甜，汤色红亮。',
    highlights: ['金毫丰富，甜香显', '热泡冷泡皆宜', '适合搭配甜点'],
    brewGuides: ['90℃ 水温冲泡，3-5 分钟', '可采用功夫茶法小杯品饮', '也可冷泡 6 小时，风味柔和'],
    reviews: [
      { user: '红茶迷', rating: 5, date: '2023-12-08', content: '香气浓郁，汤色红亮，适合下午茶。' },
      { user: '滇味生活', rating: 4, date: '2024-02-26', content: '甜度高，冷泡也很好喝。' }
    ],
    detail: '凤庆滇红以其金毫显露、滋味甜润而闻名，是云南功夫红茶的代表。'
  },
  {
    id: 'green-tea',
    name: '普洱晒青绿茶',
    price: 168,
    origin: '普洱市宁洱',
    flavor: '清香、鲜爽',
    image: 'https://images.unsplash.com/photo-1451743505249-86d22862fd7e?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '100g',
    specs: [
      { id: '100g', label: '100克袋装', price: 168 },
      { id: '30g', label: '30克体验装', price: 68 }
    ],
    description: '普洱晒青绿茶保留了鲜嫩青草香，汤色清亮，口感鲜爽。',
    highlights: ['鲜爽清香，适合夏日', '采用晒青工艺保留活性', '低温冲泡更显鲜香'],
    brewGuides: ['80℃ 左右水温冲泡', '首泡 10 秒，随后可增加时间', '建议玻璃杯冲泡观赏叶底'],
    reviews: [
      { user: '清心雅舍', rating: 4, date: '2024-03-15', content: '清香爽口，低温冲泡更惊艳。' },
      { user: '小鹿茶语', rating: 4, date: '2023-08-05', content: '夏日冷泡非常解暑，口感鲜甜。' }
    ],
    detail: '晒青绿茶采用传统晒制工艺，茶汤清亮，富含氨基酸，滋味鲜爽。'
  },
  {
    id: 'white-tea',
    name: '月光白',
    price: 258,
    origin: '西双版纳景洪',
    flavor: '花香、细腻',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '200g',
    specs: [
      { id: '200g', label: '200克礼盒', price: 258 },
      { id: '50g', label: '50克典藏装', price: 118 }
    ],
    description: '月光白经夜间采摘与阴干工艺制成，条索黑白分明，花香清新。',
    highlights: ['花香柔雅，汤水细腻', '富含茶多酚，耐泡', '适合新茶友尝试'],
    brewGuides: ['85℃ 水温冲泡，首泡 15 秒', '可使用盖碗或玻璃壶冲泡', '冷泡 6-8 小时风味更甜润'],
    reviews: [
      { user: '月色微醺', rating: 5, date: '2024-01-28', content: '香气清雅，汤感柔滑，晚上饮用也很舒服。' },
      { user: '茶与诗', rating: 4, date: '2023-09-16', content: '颜值高，适合送礼与品鉴。' }
    ],
    detail: '月光白因茶芽面白背黑似月光而得名，茶汤透亮，滋味清甜柔和。'
  },
  {
    id: 'tisanes',
    name: '玫瑰普洱茶砖',
    price: 188,
    origin: '普洱市思茅',
    flavor: '花香、甜润',
    image: 'https://images.unsplash.com/photo-1487020530383-c62abe4f934b?auto=format&fit=crop&w=600&q=80',
    defaultSpecId: '240g',
    specs: [
      { id: '240g', label: '240克礼盒', price: 188 },
      { id: '80g', label: '80克体验装', price: 78 }
    ],
    description: '将勐海熟普洱与玫瑰花窨制，花香与糯甜相融，适合日常调饮。',
    highlights: ['窨制花香，甜润柔和', '可热泡也可冷泡', '适合茶与花草结合的饮用场景'],
    brewGuides: ['沸水冲泡，洗茶一次', '第一泡 8 秒，第二泡 10 秒', '亦可搭配柠檬、蜂蜜调饮'],
    reviews: [
      { user: '花语茶人', rating: 4, date: '2024-02-20', content: '玫瑰香气淡雅，甜感舒适。' },
      { user: '普洱调饮家', rating: 5, date: '2023-11-30', content: '搭配蜂蜜非常好喝，朋友都喜欢。' }
    ],
    detail: '精选云南玫瑰花瓣与熟普洱窨制，兼具花香与普洱的醇厚，适合打造多样化饮品。'
  }
];

const teaCategories = [
  {
    id: 'sheng-puer',
    name: '生普洱',
    summary: '以晒青毛茶为原料，经蒸压定型后自然陈化，口感鲜爽且具陈化潜力。',
    details: [
      '以云南大叶种晒青毛茶为原料，经蒸压成饼或砖后自然陈化。',
      '新茶呈现鲜爽与苦涩共存的滋味，随时间转化为柔甜与陈香。',
      '适合喜欢探索年份变化、偏好清新口感的茶友。'
    ],
    brewTips: ['95℃ 左右水温冲泡，快速出汤保留鲜爽', '醒茶 1-2 次以去除杂味', '可搭配紫砂壶或盖碗冲泡']
  },
  {
    id: 'shu-puer',
    name: '熟普洱',
    summary: '通过渥堆发酵加速后熟，汤色红浓，口感糯甜顺滑。',
    details: [
      '在生茶基础上通过渥堆发酵工艺加速转化，使茶性趋于温润。',
      '汤色红浓明亮，滋味醇厚甘甜，耐泡度高。',
      '适合体质偏寒或喜欢醇厚口感的消费者。'
    ],
    brewTips: ['沸水冲泡更易激发糯甜', '渥堆茶建议醒茶两次以去堆味', '闷泡时间不宜过长，避免苦涩']
  },
  {
    id: 'dian-hong',
    name: '滇红茶',
    summary: '以云南大叶种制成的工夫红茶，金毫显露，蜜香浓郁。',
    details: [
      '采用云南大叶种鲜叶，经萎凋、揉捻、发酵、干燥制成。',
      '汤色红亮，口感甜润，带有独特的蜜糖香与果香。',
      '适合搭配甜点饮用，也是奶茶基底的优选。'
    ],
    brewTips: ['90-95℃ 水温冲泡，保持 3-5 分钟浸泡', '玻璃杯或瓷壶冲泡可观赏金毫', '可冷泡 6 小时获得柔和口感']
  },
  {
    id: 'dian-green',
    name: '滇绿茶',
    summary: '云南产区特有的晒青绿茶，保留鲜爽与高香。',
    details: [
      '部分滇绿采用晒青工艺，保留茶叶活性物质。',
      '茶汤清亮，滋味鲜爽带花香，适合夏季饮用。',
      '冲泡时需控制水温，避免茶汤苦涩。'
    ],
    brewTips: ['80℃ 左右低温冲泡', '首泡 10 秒即可出汤，避免苦涩', '适合使用玻璃杯或盖碗']
  },
  {
    id: 'moonlight-white',
    name: '月光白',
    summary: '云南特色白茶，采用夜间采摘阴干工艺，香气柔雅。',
    details: [
      '月光白条索黑白分明，如月光照拂的色泽。',
      '茶汤金黄透亮，入口柔和花香清雅。',
      '既可热泡亦可冷泡，适合晚上饮用。'
    ],
    brewTips: ['85℃ 左右水温冲泡，首泡 15 秒', '可使用盖碗或玻璃壶提升观赏性', '冷泡 6-8 小时口感更甜润']
  },
  {
    id: 'blended-tea',
    name: '花香调饮',
    summary: '以普洱为底加入玫瑰、茉莉等花料，带来丰富香气层次。',
    details: [
      '窨制或拼配花材与普洱，使花香与茶香融合。',
      '兼具熟普的糯甜与花香的清爽，适合入门茶友。',
      '冲泡时可加入蜂蜜、柠檬等调味。'
    ],
    brewTips: ['使用沸水冲泡，快速出汤以保持花香', '不建议闷泡过久，避免花香被掩盖', '可尝试冷泡做冷饮']
  }
];

const knowledgeSections = {
  origins: [
    {
      name: '西双版纳茶区',
      description: '拥有勐海、易武、布朗等著名茶山，典型特点是山野气强、香气高扬，是普洱茶核心产区。'
    },
    {
      name: '临沧茶区',
      description: '代表产区包括冰岛、勐库、凤庆等，茶汤甜度高、细腻度好，兼具鲜爽与层次。'
    },
    {
      name: '普洱茶区',
      description: '以思茅、景迈为代表，古茶园保存完好，茶叶带兰花香与糯甜，适合不同风味需求。'
    }
  ],
  storage: {
    principles: ['保持干燥、通风，避光存放', '采用无异味的纸箱、竹篓或陶罐', '定期翻茶检查，防止受潮与异味'],
    tips: ['家庭环境建议放置在 20-30℃、湿度 60% 以下的空间', '不同茶类分开存放，避免串味', '可搭配活性炭或竹炭吸附异味']
  },
  brewing: [
    {
      teaType: '生普洱',
      steps: ['醒茶后使用 95℃ 左右水温', '前段 5 秒内出汤保持鲜爽', '逐泡递增 3-5 秒展现层次'],
      suggestion: '生茶茶性偏寒，可搭配红枣、老姜调和。'
    },
    {
      teaType: '熟普洱',
      steps: ['沸水冲泡并快速洗茶 1-2 次', '首泡 8 秒，逐渐延长时间', '保持壶具温度，汤感更糯'],
      suggestion: '适合搭配牛奶或花茶调饮，口感醇厚顺滑。'
    },
    {
      teaType: '滇红茶',
      steps: ['90℃ 热水注入，静置 3 分钟', '可根据浓度调整浸泡时间', '冷泡 6 小时口感柔和不苦涩'],
      suggestion: '搭配柠檬、橙片可做水果红茶，适合夏季饮用。'
    }
  ]
};

module.exports = {
  teaProducts,
  teaCategories,
  knowledgeSections
};
