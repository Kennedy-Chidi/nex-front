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
            <td>Banner</td>
            <td>Category</td>
            <td>Title</td>
            <td>Subtitle</td>
            <td>Author</td>
            <td>Date</td>
            <td>content</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, int) in blogs" :key="item._id">
            <td>{{ int + 1 }}</td>
            <td>
              <img :src="`${FILE_URL}/${item.banner}`" alt="" class="banner" />
            </td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>
              {{ item.subtitle }}
            </td>
            <td>{{ item.author }}</td>
            <td>{{ formatDate(item.time) }}</td>
            <td><div v-html="`${item.content.substring(0, 400)}...`"></div></td>
            <td>
              <div
                @click="toggleBlogStatus(item._id, item.status)"
                class="status"
                :class="{ success: item.status }"
                v-if="item.status"
              >
                Active
              </div>
              <div
                @click="toggleBlogStatus(item._id, item.status)"
                :class="{ success: item.status }"
                class="status"
                v-else
              >
                Draft
              </div>
            </td>
            <td>
              <div class="filter-box" @click="prepareBlog(item)">
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
                    'Are you sure you want to delete this Blog',
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
          <label for="name-3" class="input-label">Blog Type </label>
          <h4
            class="select-display"
            @click="showBlogTypeList = !showBlogTypeList"
          >
            {{ blogType }}
          </h4>
          <ul role="list" class="filter-list" v-if="showBlogTypeList">
            <li
              v-for="(type, index) in blogTypes"
              :key="index"
              class="filter-items"
              @click="setBlogType(type)"
            >
              <div>{{ type }}</div>
            </li>
          </ul>
          <img
            src="/admin-images/caret-down-gray.svg"
            loading="lazy"
            alt=""
            class="filter-icon middle"
            @click="showBlogTypeList = !showBlogTypeList"
          />
        </div>
        <div class="each-input">
          <label for="name-4" class="input-label">Blog Category</label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="category"
            placeholder="Enter Blog Category"
          />
        </div>
        <div class="each-input">
          <label for="name-4" class="input-label">Blog Title</label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="title"
            placeholder="Enter Blog Title"
          />
        </div>
        <div class="each-input">
          <label for="password-3" class="input-label">Blog Subtitle</label
          ><input type="text" class="plan-input w-input" v-model="subtitle" />
        </div>
        <div class="each-input">
          <label for="password-3" class="input-label">Blog Author</label
          ><input type="text" class="plan-input w-input" v-model="author" />
        </div>
        <div class="each-input">
          <label for="password-3" class="input-label">Blog Date</label
          ><input type="date" class="plan-input w-input" v-model="date" />
        </div>

        <div class="editor-holder each-input full">
          <label for="name-4" class="input-label">Blog content</label>
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="content"
              :config="editorConfig"
            />
          </client-only>
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
            value="Add Blog"
            @click="processBlog"
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
      blogTypes: ["News", "Services"],
      showBlogTypeList: false,
      blogType: "Select Type",
      category: "",
      title: "",
      subtitle: "",
      banner: "",
      content: "",
      blogs: [],
      date: "",
      author: "",

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
    formatDate(data) {
      if (data == null || data == undefined) {
        return "N/A";
      }
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

    setBlogType(blogType) {
      this.blogType = blogType;
      this.showBlogTypeList = false;
    },

    setBanner(event) {
      this.banner = event.target.files[0];
    },

    clearInputs() {
      this.editingId = "";
      this.editingState = false;
      this.blogType = "Select Type";
      (this.category = ""), (this.title = "");
      this.subtitle = "";
      this.banner = "";
      this.content = "";
      this.date = "";
      this.author = "";
    },

    toggleBlogStatus(id, status) {
      this.editingId = id;
      const data = {
        status: !status,
      };
      this.updateBlog(data);
    },

    showConfirmation(msg, id) {
      this.deleteId = id;
      this.confirmMessage = msg;
      this.confirmStatus = false;
    },

    returnConfirmation(data) {
      if (data == "yes") {
        this.deleteBlog(this.deleteId);
      }
      this.confirmStatus = true;
    },

    prepareBlog(blog) {
      this.editingId = blog._id;
      this.editingState = true;
      this.banner = blog.banner;
      this.blogType = blog.blogType;
      this.title = blog.title;
      this.subtitle = blog.subtitle;
      this.content = blog.content;
      this.author = blog.author;
      this.category = blog.category;
      this.time = blog.time;
    },
    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getBlog();
    },

    paginate(page) {
      this.currentPage = page;
      this.getBlog();
    },

    processBlog() {
      const form = new FormData();
      form.append("blogType", this.blogType);
      form.append("title", this.title);
      form.append("subtitle", this.subtitle);
      form.append("banner", this.banner);
      form.append("content", this.content);
      form.append("category", this.category);
      form.append("author", this.author);

      form.append(
        "time",
        this.date == "" ? new Date().getTime() : new Date(this.date).getTime()
      );
      if (this.editingState) {
        this.updateBlog(form);
      } else {
        this.createBlog(form);
      }
    },

    async updateBlog(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/blog/${this.editingId}/${query}`,
          form
        );
        this.clearInputs();
        this.blogs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createBlog(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.post(`/blog/${query}`, form);
        this.clearInputs();
        this.blogs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getBlog() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/blog/${query}`);
        this.blogs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteBlog(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(`/blog/${id}/${query}`);
        this.blogs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getBlog();
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },
  },
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
};
</script>

<style>
.each-input textarea {
  width: 100%;
}

.ck.ck-editor__main > .ck-editor__editable {
  min-height: 20vh;
}
</style>
