---
title: "Gitalk评论系统Error: Network Error"
date: 2022-11-26T15:22:45+08:00
description: "Gitalk评论系统Error: Network Error,Error: Validation Failed,hugo配置gitalk评论系统"
tags: ["gitalk","hugo"]
categories: ["折腾吧"]
summary: "收集一些gitalk评论系统出现的一些问题，方便以后查询并解决"
image: https://img.xieha.cn/i/2024/12/09/6755f2594b0b7.webp
---

   收集gitalk评论系统出现的一些问题

- **Gitalk评论系统出现 Error: Network Erro**
- **Gitalk评论系统出现 Error: Validation Failed**
- **未找到相关的Issues进行评论，请联系XXX进行创建**

本站采用的是评论系统是Giscus，之所以要用gitalk，是觉得它的UI挺不错的，一直都想弄个微言的页面，发现这挺适合的。

本来觉得嵌入gitalk应该很容易的，谁知道这货是坑完又坑呀，搜寻了许多方法，什么md5呀，改变其他的ID呀，一堆的解决方案，自己愣是没搞明白。参考这么多方案，记录下自己的方法，仅供参考。

我这里采用的博客程序是hugo系统+Github+NEtlify部署方案。

### 一、未找到相关的Issues进行评论，请联系XXX进行创建

看下Homepage URL和Authorization callback URL，是否填写正确，这两个是否加上一样的**https://**

查找地址：登录github，点击头像的Settings ，最下面的Developer settings ，找到对应的OAuth Apps。

还有检查下gitalk配置文件是否正确。



![](F:\blog-koobai\static\img\1.png)

### 二、Gitalk评论系统出现 Error: Network Erro

![2](2.png)

这个错误蛮复杂的，F12查看，是由于https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token这个链接失效。换个代理链接就好了。

那去哪里弄代理链接呢？
首先去Github ,Forked一个项目：**[cors-server](https://github.com/jawaylog/cors-server)**,部署在Netlify。

路径是：登录Netlify，可以用github账号授权登录，新建项目（add new site>Import an existing project），选择github授权登录，之后再选择刚才Fored的项目**[cors-server](https://github.com/jawaylog/cors-server)**。然后Deploy site。

成功了话会有个子域名地址，比如 ：[https://xx.xx.netlify.app](https://xx.xx.netlify.app/)

这就是代理地址了。如果你的主题程序自带程序gitalk评论系统的，就把Proxy地址换成这个代理地址就行了。

例如这样：proxy = "https://xx.xx.netlify.app/github_access_token"

xx.xx是你的子域名。

那像我这种没有Gitalk评论系统程序的，又该怎样呢。

前面说了，我用的程序是hugo，没有带gitalk评论系统，所以需要嵌入个。

首先在你主题文件夹（themes\xxx\layouts\partials），partials文件下新建个gitalk.html，放入如下代码：

```
<html>
<head>
{{ if .Site.Params.enableGitalk }}
<div id="gitalk-container"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
</head>
<body>
<script>
  const gitalk = new Gitalk({
     id: 'location.pathname',
    clientID: '{{ .Site.Params.Gitalk.clientID }}', 
    clientSecret: '{{ .Site.Params.Gitalk.clientSecret }}',
    repo: '{{ .Site.Params.Gitalk.repo }}',
    owner: '{{ .Site.Params.Gitalk.owner }}',
    admin: ['{{ .Site.Params.Gitalk.owner }}'],
    proxy: '{{ .Site.Params.Gitalk.proxy }}', 
    title: '{{ .Site.Params.Gitalk.title }}',
    distractionFreeMode: false // Facebook-like distraction free mode  
     
     });     
  (function() {
    if (["localhost", "127.0.0.1"].indexOf(window.location.hostname) != -1) {
      document.getElementById('gitalk-container').innerHTML = 'Gitalk comments not available by default when the website is previewed locally.';
      return;
    }
    gitalk.render('gitalk-container');
  })();
</script>
</body>
</html>

```

然后在single.html页面，找到这个 {{ partial "comments.html" . }}，在下面加入 {{ partial "gitalk.html" . }}

因为我用gitalk评论系统是用来做微言页面。所以我的就加在我的微言页面了。
但如果你的系统自带gitalk，就不需要额外添加了，又或者可以在comments.html页面里面直接加入我上面的gitalk代码就可以了。
然后在你的配置文件config.toml加入这段代码

```
[Params]
  enableGitalk = true

[Params.Gitalk]
    clientID = "9fdd81a0137ba23" # 上面申请OAuth Apps项目里的 ID
    clientSecret = "2b0d69b9cee2c69d54cc8" # 上面申请OAuth Apps项目里的密钥
    repo = "gitalk" # 项目仓库名字
    owner = "jawaylog" # github账号名字
    admin = "jawaylog" # Github库所有者和合作者，也可以像我的一样
    id= "location.pathname" 
    labels= "gitalk" #
    perPage= 15  
    pagerDirection= "last" 
    createIssueManually= false 
    distractionFreeMode= false 
    proxy = "https://xx.xx.netlify.app/github_access_token" //这里填写你的代理地址
    title = "RulatedayDnd5eWiki-Comment"

```

### 三、Gitalk评论系统出现 Error: Validation Failed

![3](3.png)

这个问题是我嵌入Gitalk评论，部署上去之后出现了。真的是一个坑填完又来一个坑。这是由于labels的50个字符长度限制问题，不能超过50个字符。

在gitalk.html里，加入这个就可以解决了。

```
title: '{{ .Site.Params.Gitalk.title }}',
```

具体实现代码在上个问题里。

![](4.png)

本文参看部分文章如下：

[解决 Gitalk 无法获取 Github Token 问题 ](https://prohibitorum.top/7cc2c97a15b4.html)

[Dedicatus546/cors-server项目 ](https://github.com/Dedicatus546/cors-server)

### 1.1 cors-server项目
最近发现cors-server项目 部署失败

```
 警告https://registry.nlark.com/setprototypeof/download/setprototypeof-1.2.0.tgz错误
```

![](6.png)
发现是这个地址是访问不了，在项目里面更改地址了就可以了

```
将pnpm-lock.yaml里面的https://registry.nlark.com全部更改为https://registry.npmmirror.com
```

![](7.png)

如有问题，欢迎留言更正。

更新于2024.07.02
