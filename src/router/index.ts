import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/pet/list",
    name: "PetList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "petList" */ "../views/PetList.vue")
  },
  {
    path: "/pet/add/",
    name: "PetAdd",
    component: () =>
      import(/* webpackChunkName: "petAdd" */ "../views/PetAdd.vue")
  },
  {
    path: "/pet/detail/:id",
    name: "PetDetail",
    component: () =>
      import(/* webpackChunkName: "petDetail" */ "../views/PetDetail.vue")
  },
  {
    path: "/pet/edit/:id",
    name: "PetEdit",
    component: () =>
      import(/* webpackChunkName: "petEdit" */ "../views/PetEdit.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
