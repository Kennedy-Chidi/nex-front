<template>
  <div>
    <admin-confirmation
      :msg="confirmMessage"
      :state="confirmStatus"
      @confirm="returnConfirmation"
    />
    <div class="table-filters">
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
            <td>Image</td>
            <td>Name</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, int) in partners" :key="item._id">
            <td>{{ int + 1 }}</td>
            <td>
              <img :src="`${FILE_URL}/${item.image}`" alt="" class="banner" />
            </td>
            <td>{{ item.name }}</td>
            <td>
              <div class="filter-box" @click="prepareStaff(item)">
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
                    'Are you sure you want to delete this Partner',
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
          <label for="name-4" class="input-label">Name</label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="name"
            placeholder="Enter Staff Name"
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
              @change="setImage"
            />
            <div>Upload Image</div>
          </label>
          <input
            type="button"
            value="Add Partner"
            @click="processPartner"
            class="button w-button"
          />
          <input
            type="submit"
            value="Cancel"
            @click="clearInputs"
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
      pertners: [],
      image: "",
      name: "",

      editingState: false,
      editingId: "",

      confirmMessage: "",
      confirmStatus: true,
      deleteId: "",

      sort: "-time",
      field: "",
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
    showResponseMsg(msg, status) {
      this.response = msg;
      this.responseState = status;
      this.showResponse = true;
      setTimeout(() => {
        this.response = "";
        this.showResponse = false;
      }, 6000);
    },

    clearInputs() {
      this.image = "";
      this.name = "";
      (this.editingId = ""), (this.editingState = false);
    },

    toggleBlogStatus(id, status) {
      this.editingId = id;
      const data = {
        status: !status,
      };
      this.updateStaff(data);
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deletePartner(this.deleteId);
      }
      this.confirmStatus = true;
    },

    setImage(e) {
      this.image = e.target.files[0];
    },

    prepareStaff(partner) {
      this.editingId = partner._id;
      this.editingState = true;
      this.name = partner.name;
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getPartners();
    },

    paginate(page) {
      this.currentPage = page;
      this.getPartners();
    },

    processPartner() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("image", this.image);
      form.append("time", new Date().getTime());

      if (this.editingState) {
        this.updatePartner(form);
      } else {
        this.createPartner(form);
      }
    },

    async updatePartner(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/partners/${this.editingId}/${query}`,
          form
        );
        this.clearInputs();
        this.partners = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createPartner(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.post(`/partners/${query}`, form);
        this.clearInputs();
        this.partners = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getPartners() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/partners/${query}`);
        this.partners = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deletePartner(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(`/partners/${id}/${query}`);
        this.partners = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getPartners();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style>
.each-input textarea {
  width: 100%;
}

.banner.ic {
  max-width: 18px;
}
</style>
