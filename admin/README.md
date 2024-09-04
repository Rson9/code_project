# admin

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### 父子通信

使用 vue 组件库中的 defineEmits 和 defineProps
defineEmits 用于回传，
defineProps 用于父向子传数据
在 news 编辑时，由于 editor 的 onMounted 执行在 props 之前，会导致数据不同步，我们使用 watch 对 props 的状态进行监听，从而解决这个问题
