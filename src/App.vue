<script>
import HomeView from "./views/HomeView.vue";
import VegetarianView from "./views/VegetarianView.vue";
import PorkView from "./views/PorkView.vue";
import SearchView from "./views/SearchView.vue";

export default {
  components: {
    HomeView,
    VegetarianView,
    PorkView,
    SearchView,
  },
};
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Start</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ path: '/recipes/seafood' }">Seafood</RouterLink>
      </li>
      <li>
        <router-link :to="{ path: '/recipes/vegetarian' }"
          >Vegetarian</router-link
        >
      </li>
      <li>
        <router-link :to="{ path: '/recipes/pork' }">Pork</router-link>
      </li>
      <li>
        <RouterLink to="/search">Search by meal-category</RouterLink>
      </li>
    </ul>
  </nav>

  <main>
    <RouterView></RouterView>
  </main>
</template>

<style>
.margins {
  margin-top: 1rem;
  margin-left: 1rem;
}
body {
  margin: 0;
  padding: 0;
}
nav {
  padding: 2rem;
  width: 100vw;
  top: 0;
  background-color: #d5bdaf;
}
nav ul {
  margin: 0;
}
nav ul li {
  display: inline;
}
nav ul a {
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1.5rem;
}
nav ul a:hover {
  text-decoration: underline;
}

nav ul a:visited {
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1.5rem;
}
a {
  color: black;
  text-decoration: none;
}
</style>
