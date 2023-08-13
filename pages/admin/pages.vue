<template>
  <div class="main-wrapper pages">
    <admin-confirmation :msg="confirmMsg" :state="confirmState" />
    <AdminNavigation />
    <div class="body-wrapper">
      <AdminTopHeader />
      <div class="content-wrapper">
        <div class="custom-card plan">
          <div class="pages-navbar">
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Banner' }"
              @click="setTag('Banner')"
              >Banner</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'About' }"
              @click="setTag('About')"
              >About</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'FAQ' }"
              @click="setTag('FAQ')"
              >FAQ</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Events' }"
              @click="setTag('Events')"
              >Events</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Products' }"
              @click="setTag('Products')"
              >Products</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Terms' }"
              @click="setTag('Terms')"
              >Terms</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Staffs' }"
              @click="setTag('Staffs')"
              >Staffs</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Partners' }"
              @click="setTag('Partners')"
              >Partners</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Signup' }"
              @click="setTag('Signup')"
              >Signup</span
            >
            <span
              class="button w-button"
              :class="{ 'not-active': currentTag != 'Blog' }"
              @click="setTag('Blog')"
              >Blog</span
            >
          </div>
          <admin-page-banner v-if="currentTag == 'Banner'" />
          <admin-page-about v-else-if="currentTag == 'About'" />
          <admin-page-faq v-else-if="currentTag == 'FAQ'" />
          <AdminRoadmap v-else-if="currentTag == 'Events'" />
          <admin-page-product v-else-if="currentTag == 'Products'" />
          <admin-page-terms v-else-if="currentTag == 'Terms'" />
          <admin-page-staffs v-else-if="currentTag == 'Staffs'" />
          <admin-page-partner v-else-if="currentTag == 'Partners'" />
          <admin-page-signup v-else-if="currentTag == 'Signup'" />
          <admin-page-blog v-else-if="currentTag == 'Blog'" />
        </div>
      </div>
      <div class="content-wrapper">
        <Instruction />
      </div>
      <AdminFooter />
    </div>
  </div>
</template>

<script>
import AdminFooter from "../../components/AdminComponents/AdminFooter.vue";
import AdminNavigation from "../../components/AdminComponents/AdminNavigation.vue";
import AdminPageAbout from "../../components/AdminComponents/AdminPageAbout.vue";
import AdminPagePartner from "../../components/AdminComponents/AdminPagePartner.vue";
import AdminPageProduct from "../../components/AdminComponents/AdminPageProduct.vue";
import AdminPageStaffs from "../../components/AdminComponents/AdminPageStaffs.vue";
import AdminRoadmap from "../../components/AdminComponents/AdminRoadmap.vue";
import AdminTopHeader from "../../components/AdminComponents/AdminTopHeader.vue";
import Instruction from "../../components/AdminComponents/Instruction.vue";
export default {
  data() {
    return {
      confirmMsg: "",
      confirmState: true,
      currentTag: "Banner",
    };
  },
  methods: {
    setTag(tag) {
      this.currentTag = tag;
    },
  },
  components: {
    AdminFooter,
    Instruction,
    AdminNavigation,
    AdminTopHeader,
    AdminPageAbout,
    AdminPageStaffs,
    AdminRoadmap,
    AdminPagePartner,
    AdminPageProduct,
  },
};
</script>

<style></style>
