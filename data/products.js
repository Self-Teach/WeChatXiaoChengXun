/**
 * 本地商品数据，模拟本地数据库存储。
 * 每个商品包含基础信息、轮播图片、规格、评价等内容。
 */
const products = [
  {
    id: 'tea001',
    name: '易武古树普洱生茶',
    price: 368,
    origin: '西双版纳·易武山',
    stock: 120,
    rating: 4.8,
    brief: '精选易武古树春茶，甜润花香持久，回甘显著。',
    description:
      '来自云南西双版纳易武山的核心产区，精选百年古树头春茶青，采用传统晒青工艺精制而成，条索紧结，汤色金黄透亮，入口花香馥郁，回甘悠长。',
    specs: ['357g 饼茶', '200g 饼茶', '7饼整提'],
    options: ['单饼装', '礼盒装'],
    images: [
      '/image/products/tea-green.svg',
      '/image/products/tea-mist.svg',
      '/image/products/tea-amber.svg'
    ],
    detailImages: ['/image/products/detail-leaf.svg', '/image/products/detail-tea-set.svg'],
    reviews: [
      {
        user: '茶客阿明',
        avatar: '/image/profile/avatar1.svg',
        content: '茶汤金黄清亮，花香高扬，回甘迅速，非常喜欢。',
        date: '2024-04-16'
      },
      {
        user: '普洱小师妹',
        avatar: '/image/profile/avatar4.svg',
        content: '包装精美，茶香醇厚耐泡，送人自饮都合适。',
        date: '2024-03-02'
      }
    ]
  },
  {
    id: 'tea002',
    name: '勐海大树熟茶',
    price: 298,
    origin: '西双版纳·勐海县',
    stock: 90,
    rating: 4.7,
    brief: '陈化五年，枣香浓郁，茶汤醇滑顺口。',
    description:
      '精选勐海高海拔大树晒青毛茶，经传统渥堆工艺发酵，历经五年陈化，茶汤红浓透亮，口感稠滑甜润，枣香悠长。',
    specs: ['357g 饼茶', '500g 散茶', '1kg 散茶'],
    options: ['常规包装', '锦盒礼装'],
    images: [
      '/image/products/tea-dark.svg',
      '/image/products/tea-amber.svg',
      '/image/products/tea-red.svg'
    ],
    detailImages: ['/image/products/detail-cake.svg', '/image/products/detail-tea-set.svg'],
    reviews: [
      {
        user: '普洱发烧友',
        avatar: '/image/profile/avatar2.svg',
        content: '茶汤稠滑甜润，枣香明显，是我喜欢的口感。',
        date: '2024-02-18'
      }
    ]
  },
  {
    id: 'tea003',
    name: '布朗山乔木生茶',
    price: 428,
    origin: '西双版纳·布朗山',
    stock: 60,
    rating: 4.9,
    brief: '布朗山乔木茶劲道十足，苦尽甘来，茶气足。',
    description:
      '布朗山大叶种乔木茶，芽叶肥壮，茶气强劲，入口先苦后甜，回甘生津迅速，适合资深普洱爱好者收藏品饮。',
    specs: ['400g 饼茶', '7饼整提'],
    options: ['简装', '礼盒装'],
    images: [
      '/image/products/tea-mist.svg',
      '/image/products/tea-green.svg',
      '/image/products/tea-dark.svg'
    ],
    detailImages: ['/image/products/detail-leaf.svg', '/image/products/detail-cake.svg'],
    reviews: [
      {
        user: '茶语者',
        avatar: '/image/profile/avatar3.svg',
        content: '茶气充，回甘持久，值得收藏。',
        date: '2024-01-06'
      }
    ]
  },
  {
    id: 'tea004',
    name: '冰岛古树春茶',
    price: 998,
    origin: '临沧·双江县',
    stock: 40,
    rating: 5,
    brief: '冰岛老寨古树茶，兰香甜润，回甘绵长。',
    description:
      '采用冰岛老寨古树头春茶青制作，兰香高扬，汤色蜜黄透亮，入口甜润柔和，喉韵深长，是冰岛茶的经典代表。',
    specs: ['357g 饼茶', '200g 饼茶'],
    options: ['单饼', '礼盒装'],
    images: [
      '/image/products/tea-amber.svg',
      '/image/products/tea-green.svg',
      '/image/products/tea-mist.svg'
    ],
    detailImages: ['/image/products/detail-tea-set.svg', '/image/products/detail-leaf.svg'],
    reviews: []
  },
  {
    id: 'tea005',
    name: '勐库冰岛拼配生茶',
    price: 268,
    origin: '临沧·勐库',
    stock: 110,
    rating: 4.6,
    brief: '勐库大雪山拼配，汤感清甜，性价比高。',
    description:
      '精选勐库大雪山及周边山头原料科学拼配，香甜协调，入口柔和，性价比高，适合日常品饮。',
    specs: ['357g 饼茶', '500g 散茶'],
    options: ['常规装', '收藏罐'],
    images: [
      '/image/products/tea-green.svg',
      '/image/products/tea-red.svg',
      '/image/products/tea-amber.svg'
    ],
    detailImages: ['/image/products/detail-cake.svg'],
    reviews: []
  },
  {
    id: 'tea006',
    name: '景迈古树熟茶',
    price: 358,
    origin: '普洱市·澜沧县',
    stock: 80,
    rating: 4.8,
    brief: '景迈山古树原料发酵，蜜香浓郁，陈香显。',
    description:
      '选用景迈山古茶园晒青毛茶，轻发酵处理后经数年陈化，香气高扬，汤感粘稠细腻，甜度高。',
    specs: ['357g 饼茶', '1kg 散茶'],
    options: ['常规装', '礼盒装'],
    images: [
      '/image/products/tea-dark.svg',
      '/image/products/tea-amber.svg',
      '/image/products/tea-mist.svg'
    ],
    detailImages: ['/image/products/detail-tea-set.svg'],
    reviews: []
  },
  {
    id: 'tea007',
    name: '临沧昔归古树生茶',
    price: 628,
    origin: '临沧·昔归村',
    stock: 55,
    rating: 4.9,
    brief: '昔归古树头春茶，甘甜细腻，山野花蜜香。',
    description:
      '昔归村临澜江畔古树茶青制作，香气高扬，滋味饱满，汤色明亮，具有浓郁的花蜜香与甘甜细腻的口感。',
    specs: ['357g 饼茶', '7饼整提'],
    options: ['收藏装', '礼盒装'],
    images: [
      '/image/products/tea-mist.svg',
      '/image/products/tea-green.svg',
      '/image/products/tea-red.svg'
    ],
    detailImages: ['/image/products/detail-leaf.svg', '/image/products/detail-tea-set.svg'],
    reviews: []
  },
  {
    id: 'tea008',
    name: '保山滇红工夫茶',
    price: 168,
    origin: '保山市·昌宁县',
    stock: 150,
    rating: 4.5,
    brief: '滇红工夫茶，蜜香果香，汤色红艳透亮。',
    description:
      '选用保山高山大叶种原料，采用传统滇红工夫茶工艺制作，条索紧细金毫显，汤色红艳透亮，滋味甜润顺滑。',
    specs: ['250g 礼盒', '125g 铁罐'],
    options: ['经典装', '商务礼盒'],
    images: [
      '/image/products/tea-red.svg',
      '/image/products/tea-amber.svg',
      '/image/products/tea-green.svg'
    ],
    detailImages: ['/image/products/detail-cake.svg', '/image/products/detail-tea-set.svg'],
    reviews: []
  }
];

module.exports = {
  products
};
