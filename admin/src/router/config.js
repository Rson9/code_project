import Home from "../views/home/Home";
import Center from "../views/center/Center";
import UserList from "../views/user-manage/UserList";
import UserAdd from "../views/user-manage/UserAdd";
import NewsList from "../views/news-manage/NewsList";
import NewsAdd from "../views/news-manage/NewsAdd";
import NewsEdit from "../views/news-manage/NewsEdit";
import ProductList from "../views/product-manage/ProductList";
import ProductAdd from "../views/product-manage/ProductAdd";
import ProductEdit from '../views/product-manage/ProductEdit';
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
    path: "/news-manage/editnews/:id",
    component: NewsEdit
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
    path: "/product-manage/productedit/:id",
    component: ProductEdit,
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
