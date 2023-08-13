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
            <td>Position</td>
            <td>Quote</td>
            <td>Social Links</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, int) in staffs" :key="item._id">
            <td>{{ int + 1 }}</td>
            <td>
              <img :src="`${FILE_URL}/${item.image}`" alt="" class="banner" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.position }}</td>
            <td>
              {{ item.quote }}
            </td>
            <td>
              <div v-for="(link, int) in item.coloredMedia" :key="int">
                <img
                  :src="`${FILE_URL}/${link.icon}`"
                  alt=""
                  class="banner ic"
                />

                {{ link.text }}
              </div>
            </td>

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
                    'Are you sure you want to delete this Staff',
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
          <label for="name-4" class="input-label">Staff Name</label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="name"
            placeholder="Enter Staff Name"
          />
        </div>
        <div class="each-input">
          <label for="password-3" class="input-label">Staff Position</label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="position"
            placeholder="Enter Staff Position"
          />
        </div>
        <div class="each-input">
          <label for="password-3" class="input-label">Staff Quote</label
          ><input
            type="text"
            class="plan-input w-input"
            v-model="quote"
            placeholder="Enter Quote"
          />
        </div>
        <div class="each-input half down">
          <div
            v-for="(med, int) in coloredMedia"
            :key="int"
            class="social-list"
          >
            <img
              v-if="med.tempIcon"
              :src="med.tempIcon"
              loading="lazy"
              alt=""
              class="social-img"
            />
            <img
              v-else
              :src="`${FILE_URL}/${med.icon}`"
              loading="lazy"
              alt=""
              class="social-img"
            />
            <div>{{ med.text }}</div>
            <img
              src="/admin-images/edit-gray.svg"
              @click="startEditTempState(int, coloredMedia, 'coloredMedia')"
              loading="lazy"
              alt=""
              class="filter-icon check action-icon edit"
            />

            <img
              src="/admin-images/delete-gray.svg"
              loading="lazy"
              alt=""
              @click="removeTempState(int, 'coloredMedia')"
              class="filter-icon check action-icon delete"
            />
          </div>

          <div class="social-holder">
            <label for="coloredMedia" class="upload-btn sm">
              <img
                src="/admin-images/white-upload.svg"
                loading="lazy"
                alt=""
                class="upload-icon"
              />
              <input
                id="coloredMedia"
                type="file"
                class="file-input"
                @change="setIcon($event, 'coloredMedia')"
              />
            </label>
            <input
              type="text"
              class="plan-input w-input"
              maxlength="256"
              v-model="coloredMediaText"
              @keypress.enter="
                enterTempState(
                  coloredMedia,
                  coloredMediaText,
                  coloredMediaTempIcon,
                  coloredMediaIcon,
                  'coloredMedia'
                )
              "
              placeholder="Social Links"
            />
          </div>
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
            value="Add Staff"
            @click="processStaff"
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
      staffs: [],
      image: "",
      name: "",
      position: "",
      quote: "",
      imageLenght: ["1"],

      coloredMediaText: "",
      coloredMediaIcon: "",
      coloredMediaTempIcon: "",
      coloredMedia: [],

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

    setIcon(event, type) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        if (type == "coloredMedia") {
          reader.onload = (e) => {
            this.coloredMediaIcon = input.files[0];
            this.coloredMediaTempIcon = e.target.result;
          };
        }

        reader.readAsDataURL(input.files[0]);
      }
    },

    clearType(type) {
      this.editingTempState = false;
      if (type == "coloredMedia") {
        this.coloredMediaIcon = "";
        this.coloredMediaText = "";
        this.coloredMediaTempIcon = "";
      }
    },

    clearInputs() {
      this.image = "";
      this.name = "";
      this.position = "";
      this.quote = "";
      (this.editingId = ""), (this.editingState = false);
      this.clearType();
    },

    enterTempState(array, receivedText, receivedTempIcon, receivedIcon, type) {
      if (receivedTempIcon != "") {
        const data = {
          text: receivedText,
          tempIcon: receivedTempIcon,
          icon: receivedIcon,
        };

        if (this.editingTempState) {
          array.splice(this.editingTempIndex, 1, data);
        } else {
          const existingObj = array.find((item) => item.text === data.text);
          if (existingObj) {
            this.showResponseMsg("Named item already exist", true);
          } else {
            array.push(data);
          }
        }
        this.clearType(type);
      } else {
        this.showResponseMsg("Please select icon first", true);
      }
    },

    removeTempState(index, type) {
      if (type == "coloredMedia") {
        this.coloredMedia.splice(index, 1);
      }
    },

    startEditTempState(index, array, type) {
      this.editingTempState = true;
      this.editingTempIndex = index;
      const item = array[index];
      if (type == "coloredMedia") {
        this.coloredMediaText = item.text;
        this.coloredMediaTempIcon = item.tempIcon;
        this.coloredMediaIcon = item.icon;
      }
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
        this.deleteStaff(this.deleteId);
      }
      this.confirmStatus = true;
    },

    setImage(e) {
      this.image = e.target.files[0];
    },

    prepareStaff(staff) {
      this.editingId = staff._id;
      this.editingState = true;
      this.name = staff.name;
      this.position = staff.position;
      this.quote = staff.quote;
      this.coloredMedia = staff.coloredMedia;
    },

    sortResult() {
      this.sort = this.sort == "-time" ? "time" : "-time";
      this.getStaffs();
    },

    paginate(page) {
      this.currentPage = page;
      this.getStaffs();
    },

    processStaff() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("position", this.position);
      form.append("quote", this.quote);
      this.imageLenght.forEach((el) => {
        form.append("image", this.image);
      });
      this.coloredMedia.forEach((el) => {
        form.append("coloredMediaIcon", el.icon);
        form.append("coloredMediaText", el.text);
      });
      form.append("time", new Date().getTime());

      if (this.editingState) {
        this.updateStaff(form);
      } else {
        this.createStaff(form);
      }
    },

    async updateStaff(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.patch(
          `/staffs/${this.editingId}/${query}`,
          form
        );
        this.clearInputs();
        this.staffs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async createStaff(form) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.post(`/staffs/${query}`, form);
        this.clearInputs();
        this.staffs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async getStaffs() {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.get(`/staffs/${query}`);
        this.staffs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async deleteStaff(id) {
      const query = `?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      try {
        const result = await this.$axios.delete(`/staffs/${id}/${query}`);
        this.staffs = result.data.data;
        this.resultLength = result.data.resultLength;
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  mounted() {
    this.getStaffs();
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
