// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// 1、import导入组件
import GoodsVue from './components/goods/goods';
import RatingsVue from './components/ratings/ratings';
import SellerVue from './components/seller/seller';

// 注册插件,不然在组件中的<router-link>和<router-view>会报错
Vue.use(VueRouter);
Vue.use(VueResource);
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/goods', component: GoodsVue },
  { path: '/seller', component: SellerVue },
  { path: '/ratings', component: RatingsVue }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
// 现在，应用已经启动了！
// router.go('/seller');
