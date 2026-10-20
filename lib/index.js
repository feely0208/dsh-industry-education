import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'industry-education',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/industry-education.md',
  binFile: 'bin/cli.mjs',
  description: '学生信息、备案号、适龄提示，教育 App 的硬杠杠',
  whenToUse: '教育类 App / 小程序 / 家校通 / 校园应用上线前自查：有没有公示教育移动应用备案号、有没有备案信息表、代码里有没有公开成绩排名或升学喜报、依赖里有没有广告或游戏 SDK、面向未成年人有没有写适龄范围、学籍号有没有明文落库、有没有指定儿童个人信息保护负责人。用户会说：「教育 App 要查什么」「我们小程序备案号放哪」「成绩排行榜能不能做」「学籍号能存库里吗」「儿童个人信息保护负责人怎么配」。',
});
