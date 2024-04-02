// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import SeafoodView from "./views/SeafoodView.vue";
import VegetarianView from "./views/VegetarianView.vue";
import PorkView from "./views/PorkView.vue";
import FullRecipeView from "./views/FullRecipeView.vue";
import SearchView from "./views/SearchView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: "/",
    },
    {
      component: SeafoodView,
      path: "/recipes/:category",
    },
    {
      component: VegetarianView,
      path: "/recipes/:category",
    },
    {
      component: PorkView,
      path: "/recipes/:category",
    },
    {
      component: FullRecipeView,
      path: "/recipe-details/:id",
      props: true,
    },
    {
      component: SearchView,
      path: "/search",
    },
  ],
});
