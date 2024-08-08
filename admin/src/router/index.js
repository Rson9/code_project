import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login";
import MainBox from "../views/MainBox";
import RoutesConfig from "../router/config";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const ConfigRouter = () => {
  RoutesConfig.forEach((item) => {
    router.addRoute("mainbox", item);
  });
};

ConfigRouter();

//每次路由跳转之前
router.beforeEach((to, from, next) => {
  if (to.name == "login" || localStorage.getItem("token")) {
    next();
  } else {
    next('/login');
  }
});

export default router;
