import { Menu } from './menu';
import { Product } from './product';
import { Skip } from './skip';

export const MENUS: Menu[] = [
    { name: '特性', url: '#' },
    { name: '企业', url: 'http://www.baidu.com' },
    { name: '支持', url: '#' },
    { name: '价格', url: '#' },
]

export const PRODUCTS: Product[] = [
    { category: '免费版', pricing: { price: 0, unit: '月' }, features: ['10 users included', '2 GB of storage', 'Email support', 'Help center access'], action: '注册免费使用' },
    { category: '专业版', pricing: { price: 15, unit: '月' }, features: ['20 users included', '10 GB of storage', 'Priority email support', 'Help center access'], action: '立即使用' },
    { category: '企业版', pricing: { price: 29, unit: '月' }, features: ['30 users included', '15 GB of storage', 'Phone and email support', 'Help center access'], action: '联系我们' }
]

export const SKIPS: Skip[] = [
    { sort: '特性', names: ['酷玩物', '随机特性', '团队功能', '开发人员物品', '另一个', '最后一次'] },
    { sort: '资源', names: ['资源', '资源名称', '其他资源', '最后的资源'] },
    { sort: '关于', names: ['关于我们', '地址', '隐私权', '关系'] }
];