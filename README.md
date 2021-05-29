# vue_blog
### YG博客（vue+elementUI）

> 本项目为练习项目，简单学习并实践

#### 技术选型

- 核心框架：Spring Boot
- 持久层框架：MyBatis 
- 数据库连接池：Alibaba Druid
- 缓存框架：Redis
- 日志管理：LogBack
- 工具类：Apache Common
- 视图框架：Spring MVC
- 页面交互：vue



#### 说明

> 本项目主要用于熟悉如何用 vue2 架构一个项目

> 制作一个简单的博客

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

> 开发环境 win10 + Chrome 



#### 目录结构

```bash
├── /public/         # 项目开发环境配置
│ ├── /favicon.png   # 页面的title
│ ├── /index.html    # 总页面
├── /src/            # 源码目录
│ ├── /assets/       # 组件静态资源(图片)
│ ├── /components/   # 公共组件
│ ├── /router/       # 路由配置
│ ├── /service/      # 请求接口配置文件（请求地址）axios
│ ├── /utils/        # 工具类
│ ├── /views/        # 各个子页面
│ ├── App.vue        # 组件入口
│ └── main.js        # 程序入口
├── /static/         # 非组件静态资源
├── .babelrc         # ES6语法编译配置
├── .editorconfig    # 定义代码格式
├── .eslintignore    # ES6规范忽略文件
├── .eslintrc.js     # ES6语法规范配置
├── .gitignore       # git忽略文件
├── index.html       # 页面入口
├── package.json     # 项目依赖
└── README.md        # 项目文档
```

####  完成功能

-  登录 -- 完成
-  路由拦截 -- 完成
-  用户管理（增加、编辑、搜索、删除、权限管理） -- 完成
-  博客管理（增加、编辑、搜索、删除） -- 完成
-  备忘录管理（增加、编辑、搜索、删除） -- 完成

####  部分截图

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530012113677.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530012438145.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530012217148.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530012538085.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530013355408.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530013241284.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530012642456.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530012658169.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530013016651.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530013025754.png)

![](https://cdn.jsdelivr.net/gh/PaulGeorge123/cloudimg@master/img_yg/image-20210530013418442.png)



####  运行项目

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

####  项目源码地址：

- github：https://github.com/PaulGeorge123/vue_blog.git