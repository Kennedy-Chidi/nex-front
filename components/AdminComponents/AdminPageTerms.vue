<template>
  <div>
    <admin-confirmation
      :msg="confirmMsg"
      :state="confirmStatus"
      @confirm="returnConfirmation"
    />
    <div class="table-filters">
      <div @click="sortResult" class="each-filter-option point">
        <h4 class="filter-label">Time</h4>
        <img
          src="/images/sort.svg"
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
            <td>Heading</td>
            <td>Body</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(term, int) in terms" :key="term._id">
            <td>{{ int + 1 }}</td>

            <td>{{ term.heading }}</td>
            <td>
              <div
                v-if="term.content"
                v-html="`${term.content.substring(0, 200)}...`"
              ></div>
            </td>
            <td>
              <div
                @click="toggleTermsStatus(term._id, term.status)"
                class="status"
                :class="{ success: term.status }"
                v-if="term.status"
              >
                Active
              </div>
              <div
                @click="toggleTermsStatus(term._id, term.status)"
                :class="{ success: term.status }"
                class="status"
                v-else
              >
                Draft
              </div>
            </td>
            <td>
              <div class="filter-box" @click="prepareTermEdit(term)">
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
                    'Are you sure you want to delete this Term',
                    term._id
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
        <div class="each-input full">
          <label for="name-4" class="input-label"
            >Terms Heading<span class="important">*</span></label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="heading"
            placeholder="Terms Heading"
          />
        </div>
        <div class="each-input full">
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="content"
              :config="editorConfig"
            />
          </client-only>
        </div>
        <div class="button-holder">
          <input
            type="button"
            value="Add Terms"
            @click="processTerms"
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
import AdminConfirmation from "./AdminConfirmation.vue";
export default {
  components: {
    AdminConfirmation,
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },

  data() {
    return {
      heading: "",
      content: "",

      terms: [],

      editingId: "",
      editingState: false,

      confirmMsg: "",
      confirmStatus: true,

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
    clearInput() {
      this.heading = "";
      this.content = "";
      this.editingState = false;
      this.editingId = "";
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMsg = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deleteTerms();
      }
      this.confirmStatus = true;
    },

    toggleTermsStatus(id, status) {
      this.editingId = id;
      this.editingState = true;
      const form = {
        status: !status,
      };

      this.updateTerms(form);
    },

    prepareTermEdit(term) {
      this.heading = term.heading;
      this.content = term.content;
      this.editingId = term._id;
      this.editingState = true;
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getTerms();
    },

    paginate(page) {
      this.currentPage = page;
      this.getTerms();
    },

    processTerms() {
      const form = {
        heading: this.heading,
        content: this.content,
        time: new Date().getTime(),
      };

      if (this.editingState) {
        this.updateTerms(form);
      } else {
        this.createTerms(form);
      }
    },

    async updateTerms(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/terms/${this.editingId}/${query}`,
          form
        );
        this.terms = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInput();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createTerms(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.post(`/terms/${query}`, form);
        this.terms = result.data.data;
        this.resultLength = result.data.resultLength;
        this.clearInput();
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getTerms() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/terms/${query}`);
        this.terms = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteTerms() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(
          `/terms/${this.deleteId}/${query}`
        );
        this.terms = result.data.data;
        this.resultLength = result.data.resultLength;
        this.deleteId = "";
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },
  },

  mounted() {
    this.getTerms();
  },
};
</script>

<style></style>
