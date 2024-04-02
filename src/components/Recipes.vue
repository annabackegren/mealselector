<script>
export default {
  data() {
    return {
      meals: [], // meals sätts som en tom array
    };
  },

  methods: {
    // Fetch för att hämta en kategori med recept
    // category kommer från URL:en (hämtas under created)
    fetchRecipesByCategory(category) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((result) => {
          this.meals = result.meals;
        });
    },
  },

  created() {
    // Watch-kod från:
    // https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchRecipesByCategory(this.$route.params.category);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
    // Hämta kategori från adressparametern när komponenten skapas
    const category = this.$route.params.category;
    this.fetchRecipesByCategory(category);
  },
};
</script>

<template>
  <!-- Om meals inte är tom, visa resultaten -->
  <div v-if="meals !== null" id="searchResult">
    <!-- Hämta information från varje måltid i arrayen -->
    <div v-for="meal in meals" class="resultBox">
      <!-- Länk till egen sida för rätten -->
      <router-link :to="{ path: `/recipe-details/${meal.idMeal}` }">
        <p>{{ meal.strMeal }}</p>
        <!-- Namn -->
        <p>{{ meal.strCategory }}</p>
        <!-- Kategori -->
        <img :src="meal.strMealThumb" alt="food" id="resultBoxImg" />
        <!-- Bild -->
      </router-link>
    </div>
  </div>

  <!-- Om det inte finns några måltider att hämta (tex vid fel i API etc) -->
  <div v-else>
    <p>Sorry, but no meals were found.</p>
  </div>
</template>

<style>
#searchResult {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.resultBox {
  width: 200px;
  margin: 25px;
  border-radius: 5%;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  /* Inspiration for box-shadow from https://getcssscan.com/css-box-shadow-examples */
}
/* #nameInResult {
  height: 3rem;
} */
#resultBoxImg {
  max-width: 100%;
  height: auto;
  width: auto;
  border-radius: 50%;
  width: 100%;
}
#resultBoxImg:hover {
  opacity: 0.5;
}
</style>
