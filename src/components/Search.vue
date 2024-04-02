<script>
export default {
  data() {
    return {
      meals: [],
      category: "",
    };
  },

  methods: {
    fetchRecipesByCategory() {
      if (this.category) {
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.category}`
        )
          .then((response) => response.json())
          .then((result) => {
            this.meals = result.meals;
          });
      }
    },
  },
  created() {
    // Watch-kod från:
    // https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
    this.$watch(
      () => this.category,
      () => {
        this.fetchRecipesByCategory(this.$route.params.category);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
};
</script>

<template>
  <div class="margins">
    <!-- Drop down för att välja kategori -->
    <label for="category">Choose from one of the following: </label>
    <!-- Sätter category och kör fetchen -->
    <select v-model="category" @change="fetchRecipesByCategory">
      <option disabled value="">--------</option>
      <option value="starter">Starter</option>
      <option value="side">Side</option>
      <option value="dessert">Dessert</option>
      <option value="breakfast">Breakfast</option>
      <option value="miscellaneous">Other</option>
    </select>
  </div>

  <!-- Om category är valt i drop down och arrayen har ett värde -->
  <div v-if="category && meals !== null" class="margins" id="headline">
    Following recipes are suitable for {{ category }}:
  </div>
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
    <p>No recipes were found.</p>
  </div>
</template>

<style>
#headline {
  font-size: 2rem;
}
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
