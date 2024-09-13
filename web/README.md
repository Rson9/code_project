# 一个坑

在用 vite 构建时，需要把他自带的样式删除，否则会让你很难受，在 src/assets/main.css 这个，然后在 main.js 中放弃导入，全局 css 需要放在这个文件夹里，然后在 main.js 中导入

# 注意

使用 vite 构建 vue 项目时，项目入口是在根目录里的 index.html

# 组件

lodash：
对数据，根据指定属性值进行分类
基本用法

```
import _ from 'lodash'

const datatab = () =>_.groupBy(data,item=>item.status)
```

# 页面跳转问题

在 vue 中在相同路由之间的跳转，会导致页面复用，导致生命周期钩子不会重新调用，然后页面不更新，
这里有几个方法
1：用:key 进行完整路径绑定, 相当于取消所有复用
<router-view :key="$route.fullPath" />

2：使用 watch 对当前路径末尾进行监听

```js
watch(
	() => route.params.id,
	(to, from) => {
		if (to != from) {
			router.go(0);
		}
	}
);
```
