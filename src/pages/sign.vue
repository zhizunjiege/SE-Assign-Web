<template>
  <q-card class="ui-sign-card">
    <q-card-section> 登陆 </q-card-section>
    <q-card-section>
      <q-input v-model="userStore.username" autocomplete />
      <q-input v-model="userStore.password" type="password" autocomplete />
      <q-radio v-for="option in radioOptions" v-model="userStore.identity" :val="option.value" :label="option.label" />
    </q-card-section>
    <q-card-section>
      <q-btn label="登陆" class="full-width" @click="signin" />
    </q-card-section>
    <q-card-section class="flex justify-between">
      <span>还没有账号，去注册</span>
      <span>忘记密码</span>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const radioOptions = [
  { value: "student", label: "学生" },
  { value: "teacher", label: "教师" },
];

async function signin() {
  // await userStore.signin()
  alert("登陆成功");
}

/* export default {
  data() {
    return {

      fields: {
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
        identity: localStorage.getItem("identity") || "student",
        save: localStorage.getItem("save") == "user",
      },
    };
  },
  methods: {
    async submit() {
      let data = this.fields,
        result = await this.$axiosPost("/login", {
          username: data.username,
          password: objectHash.MD5(data.password),
          identity: data.identity,
        });
      if (result.status) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("identity", data.identity);
        if (data.save) {
          localStorage.setItem("password", data.password);
          localStorage.setItem("save", "user");
        } else {
          localStorage.removeItem("password", data.password);
          localStorage.setItem("save", "auto");
        }
        this.$parent.$emit("login", result);
      } else {
        this.$alertError(result.msg);
      }
    },
  },
  created() {
    if (this.$route.query.admin || localStorage.getItem("identity") == "admin") {
      this.radios.push({ val: "admin", des: "管理员" });
      this.fields.identity = "admin";
    }
  },
}; */
</script>

<style scoped>
.ui-sign-card {
  width: 500px;
}
</style>

<route lang="yaml">
meta:
  layout: center
</route>
