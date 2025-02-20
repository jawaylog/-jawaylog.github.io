---
title: "Giscus评论系统简单配置"
description: "Giscus评论系统简单配置"
date: 2022-10-12T22:41:02+08:00
tags: [giscus, 评论]
categories: [折腾吧]
summary: "给博客弄个评论系统，有互动才更加有乐趣。
看了其他的一些评论系统，就选择了Giscus评论系统。"
image: https://img.xieha.cn/i/2024/12/09/6755eef805c87.jpg
---
![](https://img.xieha.cn/i/2024/10/21/6716117612146.png)
很早之前就想给博客弄个评论系统，又互动才更加有乐趣。看了其他的一些评论系统，就选择了Giscus评论系统，由于小白一个，弄了很久才搞明白怎么回事。

##  一、使用说明与介绍

#### 1.1 新建github项目

在github里面，我们需要新建一个项目仓库，用作giscus储存评论。

#### 1.2 满足以下条件：

- 此仓库是公开的，否则访客将无法查看 discussion。
- giscus app 已安装否则访客将无法评论和回应。
- Discussions功能已在你的仓库中启用。
  ![](1.png)

## 二、安装与配置

#### 2.1 寻找分类名与id

在giscus官网找到这里，这是只要填写分类名，分类id就行了。

```
<script src="https://giscus.app/client.js"
        data-repo="[在此输入仓库]"
        data-repo-id="[在此输入仓库 ID]"
        data-category="[在此输入分类名]"
        data-category-id="[在此输入分类 ID]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```
![](3.png)



其实看了上面的数值，我当时是有点懵的，查了下其他博主的说法。
```
data-repo="[在此输入仓库]"
data-repo-id="[在此输入仓库 ID]"
```
如果上面的 仓库 名字设置显示成功，这两个数值我们是不用设置的。我们只需要设置分类名和分类ID就可以了。

repo_id是托管博客的代码仓库的一个标识值，category是该仓库Issues里面对应的分类（或者说是主题）。一个仓库默认具有下面几个分类：Announcements、General、Ideas、Q&A、Show and tell。这里我选择Announcements作为评论的分类。最后的category_id类似repo_id也是对该分类的一个标识值。

那如何快速的获取这些数据呢，可以通过GitHub官方的<a target="_blank" href="https://docs.github.com/en/graphql/overview/explorer/">GraphQL API Explorer</a>查询到。这里把查询所用的语句进行记录。
 ![](5.png)

 

 ```
 {
  repository(owner:  "jawaylog", name: "giscus") {
    id
    discussionCategories (first: 5) {
      nodes {
        name
        id
      }
    }
  }
}
 ```
 点击查询可得以下结果
 ```
 "nodes": [
          {
            "name": "Announcements",
            "id": "DIC_kwDOIMxYZc4CR8Kb"
          },
          {
            "name": "General",
            "id": "DIC_kwDOIMxYZc4CR8Kc"
          },
          {
            "name": "Ideas",
            "id": "DIC_kwDOIMxYZc4CR8Ke"
          },
          {
            "name": "Polls",
            "id": "DIC_kwDOIMxYZc4CR8Kg"
          },
          {
            "name": "Q&A",
            "id": "DIC_kwDOIMxYZc4CR8Kd"
          }
        ]
      }
    }
  }
}
 ```
配置完最终得到的代码是这样的：
 ```
 <script src="https://giscus.app/client.js"
        data-repo="jawaylog/giscus"
        data-repo-id="R_kgDOIMxYZQ"
        data-category="Announcements"
        data-category-id="DIC_kwDOIMxYZc4CR8Kb"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
 ```
  至于如何显示评论系统，需要根据各自的主题文档设置，又或者你可以尝试在_config.yml配置。
  ![](featured.png)