import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserList from "../views/UserList";
import UserProfile from "../views/UserProfile";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import NotFoundView from "../views/NotFoundView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: "/:catchAll(.*)",   //正则表达式，表示可以匹配任意字符串
    redirect: '/404/',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
