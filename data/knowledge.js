/**
 * data/knowledge.js
 * 茶叶知识科普页面所需的静态数据。
 * 在真实项目中请从权威资料来源进行整理和校验。
 */

// 茶叶分类模块数据
const categories = [
  {
    id: 'ripe',
    name: '熟普洱茶',
    definition: '以晒青毛茶为原料，经过人工渥堆发酵工艺制成，茶性温和。',
    process: '渥堆发酵—翻堆—干燥—分级—压制成型。',
    taste: '汤色红浓明亮，香气纯净，口感醇厚顺滑。',
    crowd: '适合体质偏寒、喜欢甜润口感的茶友。',
    image: '/images/knowledge_ripe.jpg' // 占位图片
  },
  {
    id: 'raw',
    name: '生普洱茶',
    definition: '以晒青毛茶直接蒸压而成，未经人工发酵，具有越陈越香的潜力。',
    process: '摊凉—蒸压—定型—干燥，主要依赖自然陈化。',
    taste: '汤色金黄清亮，香气高扬，回甘持久。',
    crowd: '适合喜欢茶气、能接受一定苦涩度的茶友。',
    image: '/images/knowledge_raw.jpg'
  },
  {
    id: 'black',
    name: '滇红茶',
    definition: '以大叶种鲜叶为原料，采用萎凋、揉捻、发酵、干燥等工艺制作的红茶。',
    process: '萎凋—揉捻—发酵—干燥，每一步都会影响香气与汤色。',
    taste: '汤色红亮，蜜糖香显，滋味甘醇。',
    crowd: '适合大多数消费者，尤其是喜欢甜香口感的茶友。',
    image: '/images/knowledge_black.jpg'
  }
];

// 主要产地介绍
const origins = [
  {
    title: '西双版纳茶区',
    content:
      '以勐海、勐腊等地为代表，气候湿润，茶树高大粗壮，茶质浓厚，香气饱满。著名山头包括老班章、易武、布朗山等。'
  },
  {
    title: '临沧茶区',
    content:
      '临沧气候温和、云雾缭绕，出产的茶叶汤感细腻柔和，甜度高。代表山头有冰岛、昔归、邦东等。'
  },
  {
    title: '普洱茶区',
    content:
      '普洱市周边茶区历史悠久，拥有广阔的古茶园资源，茶质平衡，适合长期存放陈化。'
  }
];

// 存储事项
const storageTips = [
  '避免阳光直射，宜放在阴凉通风处。',
  '保持干燥，远离潮湿环境，防止茶叶受潮霉变。',
  '隔绝异味，茶叶易吸味，可使用无味密封袋或陶罐存放。',
  '保持适度通风，熟茶可适当透气，生茶则需注意防尘。'
];

// 冲泡方法
const brewGuides = [
  {
    title: '水温',
    detail: '普洱茶建议使用 95-100℃ 的沸水冲泡，滇红茶可稍低 90-95℃。'
  },
  {
    title: '投茶量',
    detail: '150ml 盖碗建议投茶 7-8g，可根据口感适当增减。'
  },
  {
    title: '浸泡时间',
    detail: '第一泡醒茶快速出汤，之后视个人口感 5-10 秒出汤，避免苦涩。'
  },
  {
    title: '器具选择',
    detail: '盖碗、紫砂壶、玻璃壶都可冲泡普洱，根据个人习惯选择即可。'
  }
];

module.exports = {
  categories,
  origins,
  storageTips,
  brewGuides
};
