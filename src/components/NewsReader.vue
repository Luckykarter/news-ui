<template>
  <div class="px-4">
    <h2 class="my-4 copperplate">News Reader</h2>
    <ArticlesView></ArticlesView>
  </div>


</template>

<script>
import ArticlesView from "@/components/ArticlesView";

export default {
  name: "NewsReader",
  components: {ArticlesView},
}
</script>

<style scoped>

</style>