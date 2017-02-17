# [carousel](https://wuhanjun.github.io/carousel/index.html)

## 遇到的问题：

### webpack引入jQuery：

我想的是只将自己写的代码进行打包，其他的第三方库直接引入。果然网上有这种方法：

直接在页面中引用jQuery，在配置文件中然后在需要jQuery的文件中require或import,加入externals选项，作用是将某个全局变量“伪装”成某个js模块的exports。
那么，当某个js模块显式地调用var $ = require('jquery')的时候，就会把window,jQuery返回给它。这种方式相比于ProvidePlugin + expose-loader的方案是将
jQuery这类较大的第三方库给分离出去。

```
//官方的providePlugin方式
 plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ]
```
### 获取idx

在轮播自动滚动时，下方的按钮背景图随之响应。如何获取当前图片的index即是问题。

#### 第一种思路，把插件看做一个黑盒来处理:
因为fadeIn和fadeOut的实质是display:none/block的转换，所以采用定时器获取图片元素display为block元素的idx即可。

#### 第二种，因为插件是自己写的，修改插件：
由插件返回一个idx来处理该事件。这样的话插件就不能满足jQuery的经典特征链式调用了。

未完待续：我觉得还是自己的逻辑不够完善。等手头的事忙完去看Slides.js是如何办到这件事情的。

## 运行指南

mkdir
```
mkdir vue-demo
```

clone我的项目到你的本地 

```
git clone @github.com:git@github.com:WuHanJun/carousel.git

```

安装依赖

```
npm install
```

运行
```
./node_modules/.bin/webpack
```

打开index.html

### 注意

- 直接npm install
```
1. 不用 npm init来获取package.json了，
2. 不用单独安装依赖(webpack  style-loader css-loader url-loader babel-loader babel-core babel-preset-es2015 babel-preset-react)了我都放在(npm i -S)package.json里面了，所以你执行完这句话就安装好了。四不四很贴心。
3. 不用写readme.md了，这里也有一个，如果没有的话npm里会出警告。
```
- ./node_modules/.bin/webpack 在你的npm里执行这个命令（啊，原来命令是一个文件！你才知道=，=）

注意：因为不是全局安装的，所以你用webpack -v npm会说没有这个命令。

或者你嫌命令太长，npm install -g webpack.全局安装一下，
那么直接输入  webpack    命令就可以了。

- 打开index.html
