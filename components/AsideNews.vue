<template>
  <div class="second-box-news">
    <div class="row-one-links">
      <div class="link-header-holder">
        <h1 class="first-link-header">Recent Posts</h1>
      </div>
      <nuxt-link
        :to="`/news-details/${blog._id}`"
        v-for="blog in blogs"
        :key="blog._id"
        href="#"
        class="each-news-link w-inline-block"
        ><div class="slide-thick-text">{{ blog.title }}</div></nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    formatDate(data) {
      const date = new Date(data).getTime(); // Note that month is zero-indexed in JavaScript
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        suffix: (day) => {
          if (day === 1 || day === 21 || day === 31) {
            return "st";
          } else if (day === 2 || day === 22) {
            return "nd";
          } else if (day === 3 || day === 23) {
            return "rd";
          } else {
            return "th";
          }
        },
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    async getBlogs() {
      try {
        const result = await this.$axios.get("/blog");
        this.blogs = result.data.data;
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  mounted() {
    this.getBlogs();
  },
};
</script>

<style></style>
