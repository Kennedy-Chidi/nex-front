<template>
  <div class="input-wrapper w-form">
    <div class="input-form">
      <div class="each-input full flex">
        <img
          v-if="certificate"
          :src="certificate"
          alt=""
          class="company-cert"
        />
        <img v-else :src="`${FILE_URL}/${cert}`" alt="" class="company-cert" />
      </div>
      <div class="editor-holder each-input full">
        <label for="name-4" class="input-label"
          >Write about your company<span class="important">*</span></label
        >
        <client-only placeholder="loading...">
          <ckeditor-nuxt
            class="editor"
            v-model="content"
            :config="editorConfig"
          />
        </client-only>
      </div>
      <div class="button-holder">
        <label for="certificate" class="upload-btn banner">
          <img
            src="/admin-images/white-upload.svg"
            loading="lazy"
            alt=""
            class="upload-icon"
          />
          <div>Upload Certificate</div>
          <input
            type="file"
            class="file-input"
            id="certificate"
            @change="setCertificate"
          />
        </label>
        <input
          type="button"
          value="Save"
          @click="processAbout"
          class="button w-button"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      certificate: "",
      cert: "",
      company: "",
      editingId: "",
      editState: false,
    };
  },
  methods: {
    setCertificate(event) {
      this.cert = event.target.files[0];
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.certificate = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    processAbout() {
      const form = new FormData();
      form.append("content", this.content);
      form.append("certificate", this.cert);

      if (this.editState) {
        this.updateAbout(form);
      } else {
        this.saveAbout(form);
      }
    },

    async getAboutCompany() {
      try {
        const result = await this.$axios.get("/about");
        if (result.data.data.length > 0) {
          this.editState = true;
          this.editingId = result.data.data[0]?._id;
        }
        this.cert = await result.data.data[0].certificate;
        this.content = await result.data.data[0].content;
      } catch (err) {
        console.log(err);
      }
    },

    async saveAbout(form) {
      try {
        await this.$axios.post(`/about`, form);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },

    async updateAbout(form) {
      try {
        await this.$axios.patch(`/about/${this.editingId}`, form);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
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
  mounted() {
    this.getAboutCompany();
  },
};
</script>

<style>
.full.flex {
  display: flex;
  justify-content: center;
}

.ck.ck-editor__main > .ck-editor__editable {
  min-height: 20vh;
}

.company-certificate {
  height: 200;
  width: 100;
  margin: 20px auto;
}

.each-input.full textarea {
  min-height: 40vh;
}
</style>
