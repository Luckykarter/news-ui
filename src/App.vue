<template>
  <NewsReader></NewsReader>
</template>

<script>
import NewsReader from "@/components/NewsReader";

export default {
  name: 'App',
  components: {
    NewsReader,
  }
}
</script>

<style>
@font-face {
  font-family: "Copperplate Gothic";
  src: local("Copperplate"),
  url("./fonts/Copperplate/Copperplate Gothic Std 32 AB.otf") format("truetype");
}

@font-face {
  font-family: "Bebas";
  src: local("Bebas"),
  url("./fonts/Bebas/bebas.ttf") format("truetype");
}

@font-face {
  font-family: "LatoRegular";
  src: local("LatoRegular"),
  url("./fonts/Lato/Lato-Regular.ttf") format("truetype");
}

.copperplate {
  font-family: "Copperplate Gothic", Avenir, Helvetica, Arial, sans-serif;
}

.bebas {
  font-family: "Bebas", Avenir, Helvetica, Arial, sans-serif;
}

#app {
  font-family: LatoRegular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10pt;
}
</style>