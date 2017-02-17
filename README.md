
[轮播应用](https://wuhanjun.github.io/carousel/index.html)

[渐变轮播](https://wuhanjun.github.io/Learing-Task/27-jQuery%E8%BD%AE%E6%92%AD/27Carousel-1.html)

[渐变多轮播](https://wuhanjun.github.io/Learing-Task/27-jQuery%E8%BD%AE%E6%92%AD/27Carousel-2.html)

[思路四clone节点轮播](https://wuhanjun.github.io/Learing-Task/27-jQuery%E8%BD%AE%E6%92%AD/27Carousel-3.1.html)

[全屏轮播](https://wuhanjun.github.io/Learing-Task/27-jQuery%E8%BD%AE%E6%92%AD/27Carousel-4Fullpage2.html)

[函数封装](https://wuhanjun.github.io/Learing-Task/otherCarousel/function)

[对象封装](https://wuhanjun.github.io/Learing-Task/otherCarousel/object.html)

[立即执行函数封装](https://wuhanjun.github.io/Learing-Task/otherCarousel/immediately-function.html)

[构造函数轮播封装](https://wuhanjun.github.io/Learing-Task/Object&&Prototype/carousel.html#)

## 初衷：

网上轮播插件较多，但工作中各种应用场景也多，为响应需求，方便自己故自造轮子。

## 思路：

这两种只是属性在变化：
### 第一种：
图片排成一列，父容器margin-left或者绝对定位来移动。判断放到最后一张的时候，判断放到第一张的时候整个容器回来
缺点：最后一张和第一张的时候会看到途中所有图片(100张怎么办)。

### 第二种：
上面放左中右三张图片，左右两张为hidden看不见。还有一张放下面，当滚动的时候，将下面的这张放到后面或前面(对应前滚和后滚)。
缺点： 当用户从第一张跳到第四张的时候，无法操作，因为下面只有一张牌。

下面这第三种的缺点就是DOM一直在变化，如果是自动轮播的话较为损耗性能:
### 第三种： 
往右滑先滚再拿，往左滑先拿在滚。(这是有原因的，初始的时候如下所示，往左滑的时候必须先拿一张放前面然后滚动，往右滑的时候只能先往右滑再拿，因为刚开始第一张的左边还没有。)     x永远在第一个。

```
初始条件：
x
1 2 3 4
```

### 第四种：

针对第三种进行优化(注意区别很大，这个是父元素position(或margin-left)马上变化，第三种是父元素(属性)和子元素(节点位置)都发生变化)，在最左边和最右边clone节点。判断位置为最左或者最右边的时候，父元素position瞬间发生变化对应向左和向右，人眼看不出来。

### 第五种：
淡入淡出渐变轮播。图片绝对定位，通过jQuery API实现。

### 第六种：

CSS3实现轮播，很好奇。有时间了看看。

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

#### 未完待续：我觉得还是自己的逻辑不够完善。等手头的事忙完去看Slides.js是如何办到这件事情的。

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
