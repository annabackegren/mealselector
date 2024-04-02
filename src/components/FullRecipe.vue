<script>
export default {
  props: {
    id: {},
  },

  data() {
    return {
      meals: [], // meals sätts som en tom array
    };
  },

  methods: {
    // Fetch för att hämta information mha id från den måltid man klickat på
    fetchRecipeById() {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`)
        .then((response) => response.json())
        .then((result) => {
          this.meals = result.meals;
        });
    },
    //Till tillbakaknappen
    goBack() {
      this.$router.back();
    },
  },
  // Visar resultatet från fetchen så snart sidan laddas
  created() {
    this.fetchRecipeById();
  },
};
</script>

<template>
  <!-- Tillbakaknapp för att gå till föregående sida -->
  <input type="button" @click="goBack()" value="Tillbaka" class="margins" />

  <div>
    <!-- Visar vilket id man klickat på -->
    <h1 class="margins">Du har klickat på ett recept med id: {{ id }}</h1>
  </div>

  <!-- Om meals inte är tom, visa resultaten -->
  <div v-if="meals !== null" id="searchResult">
    <!-- Hämta information från varje måltid i arrayen -->
    <div v-for="meal in meals">
      <p>{{ meal.strMeal }}</p>
      <!-- Namn -->
      <p>{{ meal.strCategory }}</p>
      <!-- Kategori -->
      <img :src="meal.strMealThumb" alt="food" id="recipeImg" />
      <!-- Bild -->
    </div>
  </div>

  <!-- Om det inte finns några måltider att hämta (tex vid fel i API etc) -->
  <div v-else>
    <p>Sorry, but no meal was found.</p>
  </div>
</template>

<style>
#recipeImg {
  width: 15rem;
  border-radius: 50%;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  margin-bottom: 1rem;
}
</style>
