<template>
  <div class="dashboard-footer">
    <div>
      {{ new Date().getFullYear() }} Copyright {{ company.companyName }}, All
      Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: "",
    };
  },
  methods: {
    setFileURL() {
      this.$store.commit("SET_URL", this.$config.FILE_URL);
    },
    async getCompany() {
      try {
        const result = await this.$axios.get("/company");
        this.company = await result.data.data;
      } catch (err) {
        console.log(err.response.data);
      }
    },
  },
  mounted() {
    this.setFileURL();
    this.getCompany();
  },
};
</script>

<style></style>
