/**
 * data/tea.js
 * 本文件用于存放云南茶叶商品的本地静态数据，避免依赖后端服务。
 * 在真实项目中这些数据应来自后端接口，这里仅用于教学演示。
 */

// 定义 8 种云南茶叶商品的基础信息
const teaList = [
  {
    id: 'tea001', // 商品唯一标识
    name: '大益7542生饼', // 商品名称
    category: '生茶', // 分类标签
    price: 298, // 价格（单位：元）
    origin: '云南西双版纳', // 产地
    year: '2022', // 年份
    type: '生茶', // 茶类（生茶/熟茶等）
    desc: '经典大益生饼，汤色清亮、香气持久。', // 简短介绍
    specs: [
      { id: '100g', name: '100g 小样装' },
      { id: '200g', name: '200g 旅行装' },
      { id: '357g', name: '357g 经典饼茶' }
    ], // 可选规格数组
    images: [
      '/images/tea001_1.jpg',
      '/images/tea001_2.jpg',
      '/images/tea001_3.jpg'
    ], // 商品图片，本地占位，需放入 /images 目录
    tags: ['口感鲜爽', '茶气足', '耐泡'] // 标签，用于展示亮点
  },
  {
    id: 'tea002',
    name: '勐海熟普洱',
    category: '熟茶',
    price: 188,
    origin: '云南勐海',
    year: '2021',
    type: '熟茶',
    desc: '勐海茶区精选熟茶，醇厚顺滑，陈香明显。',
    specs: [
      { id: '250g', name: '250g 砖茶' },
      { id: '357g', name: '357g 饼茶' }
    ],
    images: ['/images/tea002_1.jpg', '/images/tea002_2.jpg', '/images/tea002_3.jpg'],
    tags: ['醇厚', '陈香', '老少皆宜']
  },
  {
    id: 'tea003',
    name: '冰岛古树生茶',
    category: '古树茶',
    price: 1280,
    origin: '云南临沧冰岛村',
    year: '2020',
    type: '生茶',
    desc: '冰岛古树头春茶，汤感柔滑，甜度高且喉韵悠长。',
    specs: [
      { id: '100g', name: '100g 礼盒装' },
      { id: '357g', name: '357g 收藏饼' }
    ],
    images: ['/images/tea003_1.jpg', '/images/tea003_2.jpg', '/images/tea003_3.jpg'],
    tags: ['古树茶', '回甘明显', '收藏级']
  },
  {
    id: 'tea004',
    name: '布朗山熟茶',
    category: '熟茶',
    price: 268,
    origin: '云南西双版纳布朗山',
    year: '2019',
    type: '熟茶',
    desc: '布朗山原料发酵，层次丰富，甜度高。',
    specs: [
      { id: '357g', name: '357g 标准饼' },
      { id: '500g', name: '500g 家庭装' }
    ],
    images: ['/images/tea004_1.jpg', '/images/tea004_2.jpg', '/images/tea004_3.jpg'],
    tags: ['甜润', '润喉', '耐泡']
  },
  {
    id: 'tea005',
    name: '易武正山生茶',
    category: '生茶',
    price: 480,
    origin: '云南西双版纳易武乡',
    year: '2021',
    type: '生茶',
    desc: '易武茶区经典味道，花香高扬，茶汤细腻。',
    specs: [
      { id: '200g', name: '200g 精装饼' },
      { id: '357g', name: '357g 正山饼' }
    ],
    images: ['/images/tea005_1.jpg', '/images/tea005_2.jpg', '/images/tea005_3.jpg'],
    tags: ['花香', '柔滑', '易接受']
  },
  {
    id: 'tea006',
    name: '南糯山古树生茶',
    category: '古树茶',
    price: 860,
    origin: '云南勐海南糯山',
    year: '2020',
    type: '生茶',
    desc: '南糯山百年古树，香气馥郁，苦底轻，回甘持久。',
    specs: [
      { id: '100g', name: '100g 礼盒装' },
      { id: '357g', name: '357g 收藏饼' }
    ],
    images: ['/images/tea006_1.jpg', '/images/tea006_2.jpg', '/images/tea006_3.jpg'],
    tags: ['古树香', '韵味十足', '收藏']
  },
  {
    id: 'tea007',
    name: '景迈山甜润熟茶',
    category: '熟茶',
    price: 320,
    origin: '云南澜沧景迈山',
    year: '2018',
    type: '熟茶',
    desc: '景迈甜润熟茶，花蜜香显著，汤感绵柔。',
    specs: [
      { id: '357g', name: '357g 经典饼' },
      { id: '500g', name: '500g 家庭装' }
    ],
    images: ['/images/tea007_1.jpg', '/images/tea007_2.jpg', '/images/tea007_3.jpg'],
    tags: ['花蜜香', '顺滑', '口碑款']
  },
  {
    id: 'tea008',
    name: '临沧滇红',
    category: '红茶',
    price: 156,
    origin: '云南临沧凤庆',
    year: '2022',
    type: '红茶',
    desc: '凤庆滇红，金毫显露，入口甘甜，适合日常冲泡。',
    specs: [
      { id: '100g', name: '100g 礼袋装' },
      { id: '250g', name: '250g 礼盒装' }
    ],
    images: ['/images/tea008_1.jpg', '/images/tea008_2.jpg', '/images/tea008_3.jpg'],
    tags: ['金毫', '甘甜', '大众款']
  }
];

module.exports = {
  teaList
};
