<template>
  <div class="input-wrapper w-form">
    <form
      id="email-form"
      name="email-form"
      data-name="Email Form"
      method="get"
      class="input-form big"
    >
      <div class="each-input sm">
        <label for="name-4" class="input-label">Verify Recaptch</label>
        <div class="check-wrapper" @click="setRecaptcha">
          <div class="check-indicator" :class="{ active: recaptcha }"></div>
        </div>
      </div>
      <div class="each-input sm">
        <label for="name-4" class="input-label">Verify Residence</label>
        <div class="check-wrapper" @click="setResidence">
          <div class="check-indicator" :class="{ active: residence }"></div>
        </div>
      </div>
      <div class="each-input sm">
        <label for="name-4" class="input-label">Verify Origin</label>
        <div class="check-wrapper" @click="setOrigin">
          <div class="check-indicator" :class="{ active: origin }"></div>
        </div>
      </div>
      <div class="each-input sm">
        <label for="name-4" class="input-label">Verify Identity</label>
        <div class="check-wrapper" @click="setIdentity">
          <div class="check-indicator" :class="{ active: identity }"></div>
        </div>
      </div>
      <div class="each-input sm">
        <label for="name-4" class="input-label">Verify Email</label>
        <div class="check-wrapper" @click="setEmail">
          <div class="check-indicator" :class="{ active: email }"></div>
        </div>
      </div>
      <div class="each-input sm">
        <label for="name-4" class="input-label">Restrict Age</label>
        <div class="check-wrapper" @click="setAge">
          <div class="check-indicator" :class="{ active: age }"></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recaptcha: false,
      residence: false,
      origin: false,
      identity: false,
      age: false,
      email: false,

      editingId: "",
    };
  },
  methods: {
    setRecaptcha() {
      this.recaptcha = !this.recaptcha;
      this.updateSignup();
    },

    setResidence() {
      this.residence = !this.residence;
      this.updateSignup();
    },

    setOrigin() {
      this.origin = !this.origin;
      this.updateSignup();
    },

    setIdentity() {
      this.identity = !this.identity;
      this.updateSignup();
    },

    setAge() {
      this.age = !this.age;
      this.updateSignup();
    },

    setEmail() {
      this.email = !this.email;
      this.updateSignup();
    },

    setResult(data) {
      this.recaptcha = data.recaptcha;
      this.residence = data.residence;
      this.origin = data.origin;
      this.identity = data.identity;
      this.age = data.age;
      this.email = data.email;
      this.editingId = data._id;
    },

    async createSignup() {
      try {
        const form = {
          residence: this.residence,
        };
        const result = await this.$axios.post("/signup", form);
        this.setResult(result.data.data);
      } catch (err) {
        console.log(err);
      }
    },

    async getSignup() {
      try {
        const result = await this.$axios.get("/signup");
        if (result.data.data == undefined) {
          this.createSignup();
        } else {
          this.setResult(result.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateSignup() {
      const form = {
        recaptcha: this.recaptcha,
        residence: this.residence,
        origin: this.origin,
        identity: this.identity,
        email: this.email,
      };
      const result = await this.$axios.patch(`/signup/${this.editingId}`, form);
      this.setResult(result.data.data);
    },
  },
  mounted() {
    this.getSignup();
  },
};
</script>

<style></style>
