/**
 * 本地商品数据，模拟本地数据库存储。
 * 每个商品包含基础信息、轮播图片、规格、评价等内容。
 */
const products = [
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea001',
    // 展示的商品名称
    name: '易武古树普洱生茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱生茶',
    // 商品价格（元）
    price: 368,
    // 产地信息
    origin: '西双版纳·易武山',
    harvestYear: 2022,
    // 当前库存数量
    stock: 120,
    // 综合评分
    rating: 4.8,
    // 商品简短描述，用于列表展示
    brief: '精选易武古树春茶，甜润花香持久，回甘显著。',
    // 商品详细介绍，用于详情页
    description:
      '来自云南西双版纳易武山的核心产区，精选百年古树头春茶青，采用传统晒青工艺精制而成，条索紧结，汤色金黄透亮，入口花香馥郁，回甘悠长。',
    // 风味关键词标签数组
    tastingNotes: ['兰花香', '冰糖甜', '喉韵长'],
    // 冲泡建议数组
    brewTips: ['投茶6g，水温95℃', '首泡5秒出汤，后续每泡递增5秒'],
    // 推荐搭配
    pairing: '搭配鲜果或轻甜茶点，突显易武的甜润口感。',
    // 规格型号列表
    specs: ['357g 饼茶', '200g 饼茶', '7饼整提'],
    // 购买选项列表
    options: ['单饼装', '礼盒装'],
    // 详情页标签集合
    tags: ['柔甜', '收藏'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-leaf.svg', '/image/products/detail-tea-set.svg'],
    // 用户评价数组
    reviews: [
      {
        // 评价用户昵称
        user: '茶客阿明',
        // 评价头像使用 image/profile 目录素材，可替换
        // 评价头像路径
        avatar: '/image/profile/avatar1.svg',
        // 评价内容
        content: '茶汤金黄清亮，花香高扬，回甘迅速，非常喜欢。',
        // 评价日期
        date: '2024-04-16'
      },
      {
        // 评价用户昵称
        user: '普洱小师妹',
        // 评价头像使用 image/profile 目录素材，可替换
        // 评价头像路径
        avatar: '/image/profile/avatar4.svg',
        // 评价内容
        content: '包装精美，茶香醇厚耐泡，送人自饮都合适。',
        // 评价日期
        date: '2024-03-02'
      }
    ]
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea002',
    // 展示的商品名称
    name: '勐海大树熟茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱熟茶',
    // 商品价格（元）
    price: 298,
    // 产地信息
    origin: '西双版纳·勐海县',
    harvestYear: 2021,
    // 当前库存数量
    stock: 90,
    // 综合评分
    rating: 4.7,
    // 商品简短描述，用于列表展示
    brief: '陈化五年，枣香浓郁，茶汤醇滑顺口。',
    // 商品详细介绍，用于详情页
    description:
      '精选勐海高海拔大树晒青毛茶，经传统渥堆工艺发酵，历经五年陈化，茶汤红浓透亮，口感稠滑甜润，枣香悠长。',
    // 风味关键词标签数组
    tastingNotes: ['枣香', '糯甜', '顺滑'],
    // 冲泡建议数组
    brewTips: ['投茶7g，水温100℃', '闷泡8秒，逐步延长至15秒'],
    // 推荐搭配
    pairing: '适合搭配坚果或芝士糕点，衬托熟茶的稠滑口感。',
    // 规格型号列表
    specs: ['357g 饼茶', '500g 散茶', '1kg 散茶'],
    // 购买选项列表
    options: ['常规包装', '锦盒礼装'],
    // 详情页标签集合
    tags: ['醇厚', '即饮'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-cake.svg', '/image/products/detail-tea-set.svg'],
    // 用户评价数组
    reviews: [
      {
        // 评价用户昵称
        user: '普洱发烧友',
        // 评价头像使用 image/profile 目录素材，可替换
        // 评价头像路径
        avatar: '/image/profile/avatar2.svg',
        // 评价内容
        content: '茶汤稠滑甜润，枣香明显，是我喜欢的口感。',
        // 评价日期
        date: '2024-02-18'
      }
    ]
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea003',
    // 展示的商品名称
    name: '布朗山乔木生茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱生茶',
    // 商品价格（元）
    price: 428,
    // 产地信息
    origin: '西双版纳·布朗山',
    harvestYear: 2018,
    // 当前库存数量
    stock: 60,
    // 综合评分
    rating: 4.9,
    // 商品简短描述，用于列表展示
    brief: '布朗山乔木茶劲道十足，苦尽甘来，茶气足。',
    // 商品详细介绍，用于详情页
    description:
      '布朗山大叶种乔木茶，芽叶肥壮，茶气强劲，入口先苦后甜，回甘生津迅速，适合资深普洱爱好者收藏品饮。',
    // 风味关键词标签数组
    tastingNotes: ['茶气强', '山野韵', '回甘久'],
    // 冲泡建议数组
    brewTips: ['投茶7g，水温96℃', '首泡6秒，后续递增6-8秒'],
    // 推荐搭配
    pairing: '搭配烘焙坚果或轻咸茶点，平衡强劲茶气。',
    // 规格型号列表
    specs: ['400g 饼茶', '7饼整提'],
    // 购买选项列表
    options: ['简装', '礼盒装'],
    // 详情页标签集合
    tags: ['山野气', '收藏'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-leaf.svg', '/image/products/detail-cake.svg'],
    // 用户评价数组
    reviews: [
      {
        // 评价用户昵称
        user: '茶语者',
        // 评价头像使用 image/profile 目录素材，可替换
        // 评价头像路径
        avatar: '/image/profile/avatar3.svg',
        // 评价内容
        content: '茶气充，回甘持久，值得收藏。',
        // 评价日期
        date: '2024-01-06'
      }
    ]
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea004',
    // 展示的商品名称
    name: '冰岛古树春茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱生茶',
    // 商品价格（元）
    price: 998,
    // 产地信息
    origin: '临沧·双江县',
    harvestYear: 2023,
    // 当前库存数量
    stock: 40,
    // 综合评分
    rating: 5,
    // 商品简短描述，用于列表展示
    brief: '冰岛老寨古树茶，兰香甜润，回甘绵长。',
    // 商品详细介绍，用于详情页
    description:
      '采用冰岛老寨古树头春茶青制作，兰香高扬，汤色蜜黄透亮，入口甜润柔和，喉韵深长，是冰岛茶的经典代表。',
    // 风味关键词标签数组
    tastingNotes: ['兰香', '冰糖甜', '喉韵深'],
    // 冲泡建议数组
    brewTips: ['投茶5g，水温94℃', '首泡4秒，后续每泡+4秒'],
    // 推荐搭配
    pairing: '适合搭配奶香糕点或新鲜奶酪，衬托高扬花香。',
    // 规格型号列表
    specs: ['357g 饼茶', '200g 饼茶'],
    // 购买选项列表
    options: ['单饼', '礼盒装'],
    // 详情页标签集合
    tags: ['高端', '柔甜'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-tea-set.svg', '/image/products/detail-leaf.svg'],
    // 用户评价数组
    reviews: []
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea005',
    // 展示的商品名称
    name: '勐库冰岛拼配生茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱生茶',
    // 商品价格（元）
    price: 268,
    // 产地信息
    origin: '临沧·勐库',
    harvestYear: 2021,
    // 当前库存数量
    stock: 110,
    // 综合评分
    rating: 4.6,
    // 商品简短描述，用于列表展示
    brief: '勐库大雪山拼配，汤感清甜，性价比高。',
    // 商品详细介绍，用于详情页
    description:
      '精选勐库大雪山及周边山头原料科学拼配，香甜协调，入口柔和，性价比高，适合日常品饮。',
    // 风味关键词标签数组
    tastingNotes: ['花果香', '清甜', '耐泡'],
    // 冲泡建议数组
    brewTips: ['投茶6g，水温94℃', '首泡5秒，逐泡延长5秒'],
    // 推荐搭配
    pairing: '搭配烘焙糕点或软欧面包，突显清甜果香。',
    // 规格型号列表
    specs: ['357g 饼茶', '500g 散茶'],
    // 购买选项列表
    options: ['常规装', '收藏罐'],
    // 详情页标签集合
    tags: ['性价比', '日饮'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-cake.svg'],
    // 用户评价数组
    reviews: []
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea006',
    // 展示的商品名称
    name: '景迈古树熟茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱熟茶',
    // 商品价格（元）
    price: 358,
    // 产地信息
    origin: '普洱市·澜沧县',
    harvestYear: 2020,
    // 当前库存数量
    stock: 80,
    // 综合评分
    rating: 4.8,
    // 商品简短描述，用于列表展示
    brief: '景迈山古树原料发酵，蜜香浓郁，陈香显。',
    // 商品详细介绍，用于详情页
    description:
      '选用景迈山古茶园晒青毛茶，轻发酵处理后经数年陈化，香气高扬，汤感粘稠细腻，甜度高。',
    // 风味关键词标签数组
    tastingNotes: ['蜜香', '糯甜', '陈韵'],
    // 冲泡建议数组
    brewTips: ['投茶7g，水温100℃', '闷泡10秒，逐步延长至18秒'],
    // 推荐搭配
    pairing: '与黑巧克力或焦糖甜品搭配，凸显熟茶的蜜枣香。',
    // 规格型号列表
    specs: ['357g 饼茶', '1kg 散茶'],
    // 购买选项列表
    options: ['常规装', '礼盒装'],
    // 详情页标签集合
    tags: ['蜜香', '陈化'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-tea-set.svg'],
    // 用户评价数组
    reviews: []
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea007',
    // 展示的商品名称
    name: '临沧昔归古树生茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '普洱生茶',
    // 商品价格（元）
    price: 628,
    // 产地信息
    origin: '临沧·昔归村',
    harvestYear: 2022,
    // 当前库存数量
    stock: 55,
    // 综合评分
    rating: 4.9,
    // 商品简短描述，用于列表展示
    brief: '昔归古树头春茶，甘甜细腻，山野花蜜香。',
    // 商品详细介绍，用于详情页
    description:
      '昔归村临澜江畔古树茶青制作，香气高扬，滋味饱满，汤色明亮，具有浓郁的花蜜香与甘甜细腻的口感。',
    // 风味关键词标签数组
    tastingNotes: ['花蜜香', '甘甜', '喉韵持久'],
    // 冲泡建议数组
    brewTips: ['投茶6g，水温95℃', '首泡5秒，后续逐泡延长5-7秒'],
    // 推荐搭配
    pairing: '适合搭配软质奶酪或蜂蜜坚果，增强花蜜甜感。',
    // 规格型号列表
    specs: ['357g 饼茶', '7饼整提'],
    // 购买选项列表
    options: ['收藏装', '礼盒装'],
    // 详情页标签集合
    tags: ['花香', '收藏'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-leaf.svg', '/image/products/detail-tea-set.svg'],
    // 用户评价数组
    reviews: []
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'tea008',
    // 展示的商品名称
    name: '保山滇红工夫茶',
    // 用于首页筛选的分类名称
    category: '茶叶精选',
    // 茶叶类型说明
    type: '滇红工夫',
    // 商品价格（元）
    price: 168,
    // 产地信息
    origin: '保山市·昌宁县',
    // 当前库存数量
    stock: 150,
    // 综合评分
    rating: 4.5,
    // 商品简短描述，用于列表展示
    brief: '滇红工夫茶，蜜香果香，汤色红艳透亮。',
    // 商品详细介绍，用于详情页
    description:
      '选用保山高山大叶种原料，采用传统滇红工夫茶工艺制作，条索紧细金毫显，汤色红艳透亮，滋味甜润顺滑。',
    // 风味关键词标签数组
    tastingNotes: ['蜜香', '果甜', '顺滑'],
    // 冲泡建议数组
    brewTips: ['投茶5g，水温95℃', '首泡8秒，之后逐泡延长5秒'],
    // 推荐搭配
    pairing: '可搭配曲奇饼或奶香甜点，平衡滇红的蜜果香。',
    // 规格型号列表
    specs: ['250g 礼盒', '125g 铁罐'],
    // 购买选项列表
    options: ['经典装', '商务礼盒'],
    // 详情页标签集合
    tags: ['蜜香', '礼赠'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-cake.svg', '/image/products/detail-tea-set.svg'],
    // 用户评价数组
    reviews: []
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'spec001',
    // 展示的商品名称
    name: '普洱茶膏礼盒',
    // 用于首页筛选的分类名称
    category: '特产精选',
    // 茶叶类型说明
    type: '茶礼臻品',
    // 商品价格（元）
    price: 268,
    // 产地信息
    origin: '西双版纳·勐海',
    harvestYear: 2021,
    // 当前库存数量
    stock: 70,
    // 综合评分
    rating: 4.7,
    // 商品简短描述，用于列表展示
    brief: '以春茶熟膏压制小块，便于携带冲泡，适合作为伴手礼。',
    // 商品详细介绍，用于详情页
    description:
      '选用勐海古树晒青毛茶渥堆发酵后低温浓缩，保留茶多酚与咖啡碱，再经传统手工压制定量茶膏，入口甜润顺滑，随身携带即可冲泡。',
    // 风味关键词标签数组
    tastingNotes: ['枣香', '甜润', '便携冲泡'],
    // 冲泡建议数组
    brewTips: ['投入茶膏1块，注入90℃热水冲化', '可反复续水2-3次'],
    // 推荐搭配
    pairing: '适合搭配奶香小食或坚果，凸显熟茶稠滑口感。',
    // 规格型号列表
    specs: ['12块礼盒', '24块礼盒'],
    // 购买选项列表
    options: ['经典装', '商务礼盒'],
    // 详情页标签集合
    tags: ['伴手礼', '即溶'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-cake.svg'],
    // 用户评价数组
    reviews: [
      {
        // 评价用户昵称
        user: '茶旅人',
        // 评价头像使用 image/profile 目录素材，可替换
        // 评价头像路径
        avatar: '/image/profile/avatar2.svg',
        // 评价内容
        content: '出差随身携带很方便，一块就能泡出熟茶香气。',
        // 评价日期
        date: '2024-04-22'
      }
    ]
  },
  {
    // 商品唯一标识，便于详情页定位
    id: 'spec002',
    // 展示的商品名称
    name: '滇味手工茶点礼盒',
    // 用于首页筛选的分类名称
    category: '特产精选',
    // 茶叶类型说明
    type: '茶点伴侣',
    // 商品价格（元）
    price: 198,
    // 产地信息
    origin: '昆明·官渡',
    // 当前库存数量
    stock: 95,
    // 综合评分
    rating: 4.6,
    // 商品简短描述，用于列表展示
    brief: '甄选玫瑰云腿饼与普洱茶曲奇，搭配品茶更添层次。',
    // 商品详细介绍，用于详情页
    description:
      '礼盒内含云南经典玫瑰鲜花饼、云腿月饼与普洱茶曲奇，全部当天烘焙真空锁鲜。甜咸交融，搭配普洱茶饮能够平衡茶汤苦甜。',
    // 风味关键词标签数组
    tastingNotes: ['花香', '奶香', '云腿鲜'],
    // 冲泡建议数组
    brewTips: ['建议搭配普洱熟茶或滇红茶', '拆封后冷藏保存，尽早食用'],
    // 推荐搭配
    pairing: '可与冰岛生茶对比体验甜润回甘，也适合茶会分食。',
    // 规格型号列表
    specs: ['12枚礼盒', '18枚组合装'],
    // 购买选项列表
    options: ['经典礼盒', '伴手提袋套装'],
    // 详情页标签集合
    tags: ['伴手礼', '茶点'],
    // 商品主图引用 image/products 目录，可按需替换本地素材
    // 商品轮播图列表（引用本地素材）
    images: ['/image/products/tea-green.svg', '/image/products/tea-mist.svg', '/image/products/tea-amber.svg'],
    // 详情页补充图同样来自 image/products，可替换
    // 详情页补充插图列表
    detailImages: ['/image/products/detail-tea-set.svg'],
    // 用户评价数组
    reviews: [
      {
        // 评价用户昵称
        user: '茶会主持人',
        // 评价头像使用 image/profile 目录素材，可替换
        // 评价头像路径
        avatar: '/image/profile/avatar1.svg',
        // 评价内容
        content: '茶点口味丰富，与普洱搭配不会抢味，客人反馈很好。',
        // 评价日期
        date: '2024-03-30'
      }
    ]
  }
];

module.exports = {
  products
};
