import Home from "../views/home/Home";
import Center from "../views/center/Center";
import UserList from "../views/user-manage/UserList";
import UserAdd from "../views/user-manage/UserAdd";
import NewsList from "../views/news-manage/NewsList";
import NewsAdd from "../views/news-manage/NewsAdd";
import ProductList from "../views/product-manage/ProductList";
import ProductAdd from "../views/product-manage/ProductAdd";
import NotFound from "../views/notfound/NotFound";
import store from '@/store';
const routes = [
  {
    path: "/index",
    component: Home,
  },
  {
    path: "/center",
    component: Center,
  },

  {
    path: "/user-manage/useradd",
    component: UserAdd,
    beforeEnter: (to, from, next) => {
      if (store.state.userInfo.role === 1) {
        next()
      }
      else {
        next('/error')
      }
    }
  },
  {
    path: "/user-manage/userlist",
    component: UserList,
    beforeEnter: (to, from, next) => {
      if (store.state.userInfo.role === 1) {
        next()
      }
      else {
        next('/error')
      }
    }
  },

  {
    path: "/news-manage/newsadd",
    component: NewsAdd,
  },
  {
    path: "/news-manage/newslist",
    component: NewsList,
  },

  {
    path: "/product-manage/productadd",
    component: ProductAdd,
  },
  {
    path: "/product-manage/productlist",
    component: ProductList,
  },
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  }
];
export default routes;
