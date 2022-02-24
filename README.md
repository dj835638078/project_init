# 文件说明
- 此项目为稍复杂的h5项目的初始模板代码，可直接 clone 到本地后，将除了 .git 文件夹和 README.md 文件外的其它文件复制粘贴到项目中开始使用，具体使用方法见使用说明。

- 此项目未引入 router，有需要的项目自行引入。

- 此项目引入了 scss，初始布局方式定为 rem 布局，定义位置见 index.html 文件，使用方法如下：

  ```
  // 设计稿某样式宽度为 123px，那么在375手机下为 1.23rem，小数点左移2位即可
  height: 1.23rem;
  ```

  此项目的 main.js 中已经引入了 base.scss 文件和 common.scss 文件，一些基础样式可写在 base.scss 文件中，需要哪些打开注释自行调整即可。
  一些公共样式可写在 common.scss 文件中，且建议将其它项目可复用的 common 样式更新到前端公共代码仓库。

  现有可取用的基础公共样式类名：
  > .flex
  > .flex-column
  > .clearfix
  > .ellipsis-1

  > 关于 scss 使用方法，详见 https://www.sass.hk/docs/

- Eslint 规则使用的是 standard 规则。

  > 详见 https://standardjs.com/

- 此项目引入了 vant 组件，此组件在 main.js 中需要按需引入，此处只有一个 button 的引入示例。

- 此项目引入了 axios

  - 实例和拦截器在 `service/service.js` 文件
  - 接口请求 api 在 `service/requestApi.js` 文件
  - mock 数据在 `public/mock` 文件夹，示例 mock 文件为此文件夹下的 `test.json` 文件，在 `components/HelloWorld.vue` 文件中引入并调用打印；习惯使用其它mock方式的同学自行选择即可。

- h5 与 app 交互相关函数，在 `helpers/jsBridge.js` 文件中，需要的地方直接引入即可
  目前包含：
  > 返回 app 函数
  > 从 app 获取公共参数函数

- 由于目前前端项目部署地址统一路径规范，会导致 nginx 部署后的 vue 项目找不到项目的静态资源文件，需要配置静态资源文件引用
  - 只需将 vue.config.js 文件中的代码部分注释打开，在路径处填入项目相应子路由即可

- 注意：

  - @vue/cli 版本： 4.5.12
  - vue 版本： 2.6.11  详见 https://cn.vuejs.org/index.html
  - vant 版本： 2.12.14  详见 https://youzan.github.io/vant-weapp/#/home
  - node-sass 版本： 4.14.1
  - sass-loader 版本：5.0.0
  - 轻易不要更改依赖版本，容易导致项目依赖获取失败
  - 项目代码必须有 package-lock.json 文件

# 使用说明
## project-model-complex-h5
修改项目名称: `package.json` 文件 `name` 字段

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).