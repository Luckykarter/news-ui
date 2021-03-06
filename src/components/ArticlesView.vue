<template>
  <!-- search elements-->
  <div class="row my-2 copperplate">
    <div class="col-lg-3 my-1">
      <label for="keywords" v-if="isSafari">Search</label>
      <input type="text" class="form-control" id="keywords" placeholder="Keywords"
             v-model="keywords" v-on:keyup.enter="refresh()">
    </div>
    <div class="col-lg-2 my-1">
      <label for="search-from" v-if="isSafari">From</label>
      <input type="date" id="search-from" class="form-control search-date" v-model="from_date">
    </div>
    <div class="col-lg-2 my-1">
      <label for="search-till" v-if="isSafari">Till</label>
      <input type="date" id="search-till" class="form-control search-date" v-model="to_date">
    </div>
    <div class="col-lg-auto my-1 ms-auto">
      <div class="mt-4" v-if="isSafari"></div>
      <button class="btn btn-outline-secondary" id="search-btn" @click="refresh()">Search</button>
    </div>
  </div>

  <div class="my-5">
    <div class="row">
      <!-- counter-->
      <div class="col-lg-4 copperplate">
        <div v-if="!loaded" class="spinner-border"></div>
        <div v-if="loaded">
          <h5 v-if="totalArticles <= 0">No News yet...</h5>
          <h5 v-if="totalArticles > 0">{{ totalArticles }} News</h5>
        </div>
      </div>
      <!-- sort dropdown-->
      <div class="col-lg-auto ms-auto copperplate">
        <select class="form-select my-2" @change="refresh()" v-model="ordering">
          <option value="">Newest first</option>
          <option value="timestamp">Oldest first</option>
          <option value="author">Sort by Author</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
    </div>

    <!-- articles -->
    <div class="border-top border-bottom border-1" id="news-container" ref="news-container">
      <div class="row mx-1 my-3 border-bottom" v-for="article in articles" v-bind:key="article.id">
        <h5 class="article-title bebas">{{ article.title }}</h5>
        <div class="row">
          <div class="col-lg-3 my-2">
            <img class="img-fluid" v-bind:src="article.image_url">
          </div>
          <div class="col-lg-9 my-2">
            <div class="">
              <span v-html="article.description"></span>
              <a class="link-dark" v-bind:href="article.external_url" v-if="article.external_url" target="_blank">
                Continue reading
              </a>
            </div>
            <div class="text-muted mt-2">
              {{ article.publishedBy }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.loadingMore" class="d-flex justify-content-center">
        <div class="spinner-border"></div>
      </div>
    </div>

  </div>
</template>

<script>
import {getArticles, getMoreArticles, getDate} from "@/modules/articles";
import {isSafari} from "@/main";

export default {
  name: "ArticlesView",
  data() {
    return {
      articles: [],
      totalArticles: 0,
      nextUrl: null,
      loaded: false,
      loadingMore: false,
      keywords: "",
      to_date: "",
      from_date: "",
      ordering: "",
      isSafari: false,
    };
  },
  methods: {
    getNextArticles() {
      const newsContainer = this.$refs["news-container"];
      newsContainer.onscroll = () => {
        const bottomOfWindow = newsContainer.scrollTop + newsContainer.offsetHeight > newsContainer.scrollHeight / 1.2 ;
        if (bottomOfWindow) {
          if (this.nextUrl && !this.loadingMore) {
            this.loadingMore = true;
            getMoreArticles(this.nextUrl).then(res => {
              const d = res.data;
              this.processEntries(d.results);
              this.articles.push(...d.results);
              this.nextUrl = d.next;
              this.loadingMore = false;
            })
          }
        }
      }
    },

    processEntries(elements) {
      elements.forEach(function (element) {
        const author = element.author;
        element.publishedBy = `${getDate(element.timestamp)} by ${author.first_name} ${author.last_name}`
      })
    },

    refresh() {
      this.loaded = false;
      getArticles(this.keywords, this.from_date, this.to_date, this.ordering).then(res => {
        const d = res.data;
        this.articles = d.results;
        this.processEntries(this.articles)
        this.totalArticles = d.count;
        this.nextUrl = d.next;
        this.loaded = true;
      })
    }
  },
  beforeMount() {
    this.isSafari = isSafari()
    this.refresh();
  },
  mounted() {
    this.getNextArticles();
  }
}


</script>

<style scoped>
#news-container {
  max-height: 75vh;
  overflow-y: scroll;
}

.article-title {
  color: #4153B6;
}

#search-btn {
  min-width: 170pt;
}

.form-control {
  /*
    Tweak for MacOS Safari
    For some reason - date input fields are higher than text there
  */
  max-height: 28pt;
}

</style>