# my-codex-skills

我制作并公开分享的个人 Codex Skills。

## 下班倒计时小网页

### build-emotional-offwork-countdown

用于让 Codex 创建或继续迭代一个有情绪的下班倒计时网页，包含：

- 本地双击即可运行的 HTML / CSS / JavaScript
- 分阶段倒计时文案
- “老板又来了”突发需求反应
- 自动 Friday Mode
- 固定时间预览参数
- 网页检查、测试与截图流程

Skill 地址：

https://github.com/qdqzlll818-tech/my-codex-skills/tree/main/build-emotional-offwork-countdown

## 安装方法

在 Codex 中发送：

```text
请安装这个 Skill：
https://github.com/qdqzlll818-tech/my-codex-skills/tree/main/build-emotional-offwork-countdown
```

也可以发送：

```text
请从 GitHub 仓库 qdqzlll818-tech/my-codex-skills 安装
build-emotional-offwork-countdown Skill。
```

安装完成后，重新启动 Codex，使新 Skill 被加载。

## 使用示例

```text
请使用 build-emotional-offwork-countdown，
帮我制作一个默认 18:00 下班、有分阶段情绪文案和
“老板又来了”按钮的本地倒计时网页。
```

也可以直接说：

```text
用下班倒计时 Skill 帮我做一个 17:30 下班的版本。
```

## 为什么 Skill 里有吴小鸡？

这个 Skill 附带了一个可直接复制使用的网页起始模板，吴小鸡图片位于：

```text
build-emotional-offwork-countdown/assets/starter/assets/wuxiaoji.png
```

它属于模板的示例角色素材，用来保留原版网页右下角的人格感和完整视觉效果。

吴小鸡不是 Skill 的强制依赖：

- 不影响倒计时、普通模式、突发需求模式或 Friday Mode 的逻辑
- 使用者可以保留、替换成自己的角色，或直接删除
- 如果删除图片，同时移除页面中对应的图片元素即可
- Skill 的核心是网页结构、时间逻辑、情绪文案与验证流程

简单说：**Skill 负责教 Codex 怎么做这类网页，吴小鸡只是随模板附送的示例角色。**

> 如果公开使用或二次分发角色图片，请确保自己拥有相应的使用与授权权利。

## 仓库结构

```text
my-codex-skills/
├─ README.md
└─ build-emotional-offwork-countdown/
   ├─ SKILL.md
   ├─ agents/
   ├─ assets/
   │  └─ starter/
   ├─ references/
   └─ scripts/
```
