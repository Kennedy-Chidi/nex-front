<template>
  <div>
    <admin-confirmation
      :msg="confirmMessage"
      :state="confirmStatus"
      @confirm="returnConfirmation"
    />

    <div class="table-filters">
      <div class="each-filter-option">
        <img
          @click="hideCategory = !hideCategory"
          src="/admin-images/caret-down-gray.svg"
          loading="lazy"
          alt=""
          class="filter-icon drop"
        />
        <h4 @click="hideCategory = !hideCategory" class="filter-label">
          All Banner
        </h4>
        <ul role="list" class="filter-list" :class="{ hide: hideCategory }">
          <li
            @click="getField(item)"
            class="filter-items"
            v-for="(item, int) in bannerCategories"
            :key="int"
          >
            <div>{{ item }}</div>
          </li>
        </ul>
      </div>
      <div @click="sortResult" class="each-filter-option point">
        <h4 class="filter-label">Time</h4>
        <img
          src="/admin-images/sort.svg"
          loading="lazy"
          alt=""
          class="filter-icon drop"
        />
      </div>
    </div>
    <div class="table-wrapper">
      <table class="custom-table">
        <thead>
          <tr>
            <td>S/N</td>
            <td>Banner</td>
            <td>Category</td>
            <td>Intro</td>
            <td>Title</td>
            <td>Subtitle</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, int) in banner" :key="item._id">
            <td>{{ int + 1 }}</td>
            <td>
              <img
                :src="`${FILE_URL}/${item.bannerImage}`"
                alt=""
                class="banner"
              />
            </td>
            <td>{{ item.bannerCategory }}</td>
            <td>{{ item.bannerIntro }}</td>
            <td>{{ item.bannerTitle }}</td>
            <td>
              {{ item.bannerSubtitle }}
            </td>

            <td>
              <div
                @click="toggleBannerStatus(item._id, item.status)"
                class="status"
                :class="{ success: item.status }"
                v-if="item.status"
              >
                Active
              </div>
              <div
                @click="toggleBannerStatus(item._id, item.status)"
                :class="{ success: item.status }"
                class="status"
                v-else
              >
                Draft
              </div>
            </td>
            <td>
              <div class="filter-box" @click="prepareBannerEdit(item)">
                <img
                  src="/admin-images/edit-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon check action-icon"
                />
              </div>
              <div
                class="filter-box"
                @click="
                  showConfirmation(
                    'Are you sure you want to delete this Banner',
                    item._id
                  )
                "
              >
                <img
                  src="/admin-images/delete-gray.svg"
                  loading="lazy"
                  alt=""
                  class="filter-icon check action-icon"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-label">
      <div>
        <strong class="bold-text">Results</strong>: {{ resultLength }}
        <strong class="bold-text-2">Page</strong> {{ currentPage }} of
        {{ pages().length }}
      </div>
      <ul v-if="pages().length > 1" role="list" class="min-table-pagination">
        <li
          v-if="currentPage != 1"
          @click="paginate(currentPage - 1)"
          class="pagination-item"
        >
          <img
            src="/admin-images/cheveron-left.svg"
            loading="lazy"
            alt=""
            class="pagination-img"
          />
        </li>
        <li
          @click="paginate(int + 1)"
          :class="{
            active: int == currentPage - 1,
            hide: int >= 3 + currentPage || int < currentPage - 3,
            show: int + 1 == pages().length,
          }"
          v-for="(page, int) in pages().length"
          :key="int"
          class="pagination-item"
        >
          <div>{{ int + 1 }}</div>
        </li>
        <li
          v-if="currentPage < pages(currentPage + 1).length"
          @click="paginate(currentPage + 1)"
          class="pagination-item"
        >
          <img
            src="/admin-images/cheveron-right.svg"
            loading="lazy"
            alt=""
            class="pagination-img"
          />
        </li>
      </ul>
    </div>
    <div class="input-wrapper w-form">
      <div class="input-form">
        <div class="each-input">
          <label for="name-3" class="input-label"
            >Banner Categories <span class="important">*</span></label
          >
          <h4
            class="select-display"
            @click="showBannerCategoryList = !showBannerCategoryList"
          >
            {{ bannerCategory }}
          </h4>
          <ul role="list" class="filter-list" v-if="showBannerCategoryList">
            <li
              v-for="(banner, index) in bannerCategories"
              :key="index"
              class="filter-items"
              @click="setBannerCategory(banner)"
            >
              <div>{{ banner }}</div>
            </li>
          </ul>
          <img
            src="/admin-images/caret-down-gray.svg"
            loading="lazy"
            alt=""
            class="filter-icon middle"
            @click="showBannerCategoryList = !showBannerCategoryList"
          />
        </div>
        <div class="each-input">
          <label for="name-4" class="input-label"
            >Banner Intro<span class="important">*</span></label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="bannerIntro"
            placeholder="Enter Banner Title"
          />
        </div>
        <div class="each-input">
          <label for="name-4" class="input-label"
            >Banner Title<span class="important">*</span></label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="bannerTitle"
            placeholder="Enter Banner Title"
          />
        </div>
        <div class="each-input">
          <label for="password-3" class="input-label"
            >Banner Subtitle<span class="important">*</span></label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="bannerSubtitle"
            placeholder="bannerSubtitle"
          />
        </div>
        <div class="button-holder">
          <label for="banner" class="upload-btn banner">
            <img
              src="/admin-images/white-upload.svg"
              loading="lazy"
              alt=""
              class="upload-icon"
            />
            <input
              type="file"
              class="file-input"
              id="banner"
              @change="setBanner"
            />
            <div>Upload Banner</div>
          </label>
          <input
            type="button"
            value="Add Banner"
            @click="processBanner"
            class="button w-button"
          /><input
            type="submit"
            value="Cancel"
            data-wait="Please wait..."
            class="button w-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerCategories: [
        "All Banner",
        "Home",
        "About",
        "Services",
        "FAQ",
        "Contact",
        "Blog",
        "Signup",
        "Login",
        "Plan",
        "Terms",
      ],
      hideCategory: true,
      bannerCategory: "Select Category",
      showBannerCategoryList: false,
      bannerIntro: "",
      bannerTitle: "",
      bannerSubtitle: "",
      bannerImage: "",

      banner: [],

      editingState: false,
      editingId: "",

      confirmMessage: "",
      confirmStatus: true,
      deleteId: "",
      field: "",
      sort: "-time",
      limit: 3,
      resultLength: "",
      currentPage: 1,
      pages: function () {
        let array = [];
        let x = Math.ceil(this.resultLength / this.limit);
        for (let i = 0; i < x; i++) {
          array.push("i");
        }
        return array;
      },
    };
  },
  methods: {
    setBanner(event) {
      this.bannerImage = event.target.files[0];
    },

    setBannerCategory(data) {
      this.bannerCategory = data;
      this.showBannerCategoryList = !this.showBannerCategoryList;
    },

    clearInputs() {
      this.editingId = "";
      this.editingState = false;
      this.bannerCategory = "Select Category";
      this.bannerIntro = "";
      this.bannerTitle = "";
      this.bannerSubtitle = "";
      this.bannerImage = "";
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deleteBanner(this.deleteId);
      }
      this.confirmStatus = true;
    },

    prepareBannerEdit(banner) {
      this.editingId = banner._id;
      this.editingState = true;
      this.bannerImage = banner.bannerImage;
      this.bannerCategory = banner.bannerCategory;
      this.bannerTitle = banner.bannerTitle;
      this.bannerSubtitle = banner.bannerSubtitle;
      this.bannerIntro = banner.bannerIntro;
    },

    getField(data) {
      if (data == "All Banner") {
        this.field = "";
      } else {
        this.field = `&bannerCategory=${data}`;
      }
      this.hideCategory = true;
      this.getBanner();
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getBanner();
    },

    paginate(page) {
      this.currentPage = page;
      this.getBanner();
    },

    processBanner() {
      const form = new FormData();
      form.append("bannerCategory", this.bannerCategory);
      form.append("bannerIntro", this.bannerIntro);
      form.append("bannerTitle", this.bannerTitle);
      form.append("bannerSubtitle", this.bannerSubtitle);
      form.append("bannerImage", this.bannerImage);
      form.append("time", new Date().getTime());
      if (this.editingState) {
        this.updateBanner(form);
      } else {
        this.createBanner(form);
      }
    },

    async updateBanner(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.field}`;
      try {
        const result = await this.$axios.patch(
          `/banner/${this.editingId}/${query}`,
          form
        );
        this.clearInputs();
        this.banner = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createBanner(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.field}`;
      try {
        const result = await this.$axios.post(`/banner/${query}`, form);
        this.clearInputs();
        this.banner = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getBanner() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.field}`;
      try {
        const result = await this.$axios.get(`/banner/${query}`);
        this.banner = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteBanner(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}${this.field}`;
      try {
        const result = await this.$axios.delete(`/banner/${id}/${query}`);
        this.banner = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInputs();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getBanner();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style>
.each-filter-option h4 {
  cursor: pointer;
}
.each-filter-option.point {
  cursor: pointer;
}
</style>
