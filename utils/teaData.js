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
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pu-er-ripe',
    name: '勐海熟普洱',
    price: 268,
    origin: '勐海布朗山',
    flavor: '枣香、糯甜',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bingdao-raw',
    name: '冰岛古树茶',
    price: 1280,
    origin: '临沧双江冰岛村',
    flavor: '兰花香、甜润',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'yiwu-raw',
    name: '易武古树茶',
    price: 980,
    origin: '西双版纳易武茶区',
    flavor: '蜜香、柔滑',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lincang-gushu',
    name: '临沧勐库大雪山',
    price: 520,
    origin: '临沧勐库',
    flavor: '高扬花香、清甜',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'jingmai-raw',
    name: '景迈香古树',
    price: 860,
    origin: '普洱市澜沧景迈山',
    flavor: '兰花香、山韵悠长',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bulang-raw',
    name: '布朗山春茶',
    price: 360,
    origin: '勐海布朗山',
    flavor: '山野气、苦尽甘来',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'nan-nuo-raw',
    name: '南糯山古树茶',
    price: 420,
    origin: '西双版纳南糯山',
    flavor: '蜜香、山野气',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'black-tea',
    name: '滇红金芽',
    price: 198,
    origin: '临沧凤庆',
    flavor: '蜜糖香、甘甜',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'green-tea',
    name: '普洱晒青绿茶',
    price: 168,
    origin: '普洱市宁洱',
    flavor: '清香、鲜爽',
    image: 'https://images.unsplash.com/photo-1451743505249-86d22862fd7e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'white-tea',
    name: '月光白',
    price: 258,
    origin: '西双版纳景洪',
    flavor: '花香、细腻',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tisanes',
    name: '玫瑰普洱茶砖',
    price: 188,
    origin: '普洱市思茅',
    flavor: '花香、甜润',
    image: 'https://images.unsplash.com/photo-1487020530383-c62abe4f934b?auto=format&fit=crop&w=600&q=80'
  }
];

const knowledgeArticles = [
  {
    title: '云南茶区速览',
    content: '云南拥有六大茶山与无数小产区，勐海、临沧、普洱是代表。高海拔、云雾缭绕的生态环境造就了云南大叶种茶树的独特风味。'
  },
  {
    title: '普洱茶的分类',
    content: '普洱茶分为生茶与熟茶。生茶以自然陈化方式转化，滋味鲜爽；熟茶通过渥堆工艺加速后熟，口感醇厚顺滑。'
  },
  {
    title: '云南白茶与滇红',
    content: '云南白茶以月光白闻名，条索黑白分明、汤色金黄；滇红茶条索肥硕、金毫显露，以凤庆滇红最负盛名。'
  },
  {
    title: '经典云南茶山',
    content: '冰岛、易武、景迈、布朗等茶山各具风格：冰岛甜润、易武柔和、景迈兰香、布朗山野气足。'
  },
  {
    title: '家庭储存技巧',
    content: '保持干燥、避光、通风是普洱茶存放的核心原则，可选择牛皮纸袋或陶罐存放，并定期翻动检查。'
  },
  {
    title: '冲泡建议',
    content: '生普洱宜采用95℃左右的水温，快速注水出汤；熟普可用沸水闷泡，快速洗茶后冲泡。注意掌握投茶量与浸泡时间。'
  }
];

module.exports = {
  teaProducts,
  knowledgeArticles
};
