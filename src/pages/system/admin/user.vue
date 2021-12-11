<template>
  <q-card>
    <q-card-section class="ui-user-main">
      <q-table
        v-model:selected="selected"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        :pagination="pagination"
        row-key="id"
        selection="multiple"
        separator="cell"
        table-header-class="bg-info"
        class="transparent shadow-0 full-height ui-user-table"
      >
        <template #top>
          <q-input v-model="filter" borderless dense debounce="300" placeholder="搜索..." class="ui-user-search">
            <template #prepend>
              <q-icon name="bi-search" size="1rem" class="q-ml-md" />
            </template>
          </q-input>
          <q-space />
          <q-btn size="sm" class="ui-user-btn" :disable="selected.length === 0" @click="deleteUser">
            <span> 删除用户 </span>
          </q-btn>
          <q-btn size="sm" class="ui-user-btn" @click="createUser">
            <span> 新增用户 </span>
          </q-btn>
          <q-btn size="sm" class="ui-user-btn" :disable="selected.length !== 1" @click="updateUser">
            <span> 修改信息 </span>
          </q-btn>
          <q-btn size="sm" class="ui-user-btn" @click="importUser">
            <span> 批量导入 </span>
          </q-btn>
        </template>
        <template #no-data="{ message, icon }">
          <div class="flex flex-center full-width ui-user-nodata">
            <q-icon :name="icon" size="md" />
            <span class="q-ml-md">{{ message }}</span>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-dialog v-model="formDialogOpen" persistent>
    <q-card class="flex justify-center">
      <q-card-section>
        <q-markup-table separator="horizontal" class="bg-secondary ui-user-dialog-table">
          <tbody>
            <tr>
              <td>身份</td>
              <td>
                <q-select
                  v-model="form.role"
                  :options="['教师', '学生']"
                  standout
                  dense
                  options-dense
                  hide-dropdown-icon
                  color="positive"
                  class="float-right ui-user-text"
                />
              </td>
            </tr>
            <tr>
              <td>账号</td>
              <td>
                <q-input v-model="form.username" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr>
              <td>密码</td>
              <td>
                <q-input v-model="form.password" type="password" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>
                <q-input v-model="form.name" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr>
              <td>性别</td>
              <td>
                <q-select
                  v-model="form.gender"
                  :options="['男', '女']"
                  standout
                  dense
                  options-dense
                  hide-dropdown-icon
                  color="positive"
                  class="float-right ui-user-text"
                />
              </td>
            </tr>
            <tr v-if="form.role !== '管理员'">
              <td>{{ form.role === "学生" ? "学号" : "工号" }}</td>
              <td>
                <q-input v-model="form.jobNum" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr v-if="form.role === '教师'">
              <td>职称</td>
              <td>
                <q-input v-model="form.title" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr v-else-if="form.role === '学生'">
              <td>班级</td>
              <td>
                <q-input v-model="form.class" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr v-if="form.role !== '管理员'">
              <td>{{ form.role === "教师" ? "研究方向" : "主修专业" }}</td>
              <td>
                <q-input v-model="form.major" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr>
              <td>邮箱</td>
              <td>
                <q-input v-model="form.email" standout class="float-right ui-user-text" />
              </td>
            </tr>
            <tr>
              <td>个人简介</td>
              <td>
                <q-input v-model="form.resume" type="textarea" standout rows="10" class="float-right ui-user-textarea" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-between ui-user-dialog-btn-group">
          <q-btn v-close-popup label="取消" class="bg-primary ui-user-dialog-btn" />
          <q-btn label="确认" class="bg-primary ui-user-dialog-btn" @click="submitForm" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="fileDialogOpen" persistent>
    <q-card class="flex justify-center">
      <q-card-section>
        <q-markup-table separator="horizontal" class="bg-secondary ui-user-dialog-table">
          <tbody>
            <tr>
              <td>用户信息文件</td>
              <td>
                <q-file v-model="file" standout class="float-right ui-user-text" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
      <q-card-section>
        <div class="flex justify-between ui-user-dialog-btn-group">
          <q-btn v-close-popup label="取消" class="bg-primary ui-user-dialog-btn" />
          <q-btn label="确认" class="bg-primary ui-user-dialog-btn" @click="submitFile" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// TODO: 导入api
import { QTableProps } from "quasar";

// import api, { User } from "~/api";
import { User } from "~/api";

const rows = ref([] as User[]);
const columns = [
  {
    name: "id",
    label: "ID",
    field: "id",
    align: "center",
  },
  {
    name: "role",
    label: "身份",
    field: "role",
    align: "center",
  },
  {
    name: "username",
    label: "账号",
    field: "username",
    align: "center",
  },
  {
    name: "name",
    label: "姓名",
    field: "name",
    align: "center",
  },
  {
    name: "gender",
    label: "性别",
    field: "gender",
    align: "center",
  },
  {
    name: "jobNum",
    label: "学/工号",
    field: "jobNum",
    align: "center",
  },
] as QTableProps["columns"];
const filter = ref("");
const pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

rows.value = [
  {
    id: 1,
    role: "管理员",
    username: "hh",
    name: "测试",
    gender: "男",
    jobNum: "17375433",
  },
  {
    id: 0,
    role: "学生",
    username: "hh",
    name: "测试",
    gender: "男",
    jobNum: "17375433",
  },
]; // 测试数据

const $q = useQuasar();

const selected = ref([] as User[]);
function deleteUser() {
  if (selected.value.find((e) => e.role === "管理员")) {
    $q.notify({
      type: "warning",
      message: "无法删除管理员",
    });
  } else {
    $q.notify({
      type: "ask",
      message: "您确定要删除选中的用户吗？",
      actions: [
        {
          label: "确定",
          color: "accent",
          handler: async () => {
            try {
              /* await api.user.deleteUsers(selected.value.map((e) => e.id!)); */
              selected.value.forEach((item) => {
                let index = rows.value.findIndex((e) => e.id === item.id);
                if (index >= 0) {
                  rows.value.splice(index, 1);
                }
              });
              selected.value = [];
            } catch (e) {
              if (e instanceof Error) {
                $q.notify({
                  type: "error",
                  message: "删除用户时出错：" + e.message,
                });
              }
            }
          },
        },
        {
          label: "取消",
          color: "positive",
        },
      ],
    });
  }
}

const formDialogOpen = ref(false);
const form = reactive({
  id: -1,
  role: "",
  username: "",
  password: "",
  name: "",
  gender: "",
  jobNum: "",
  class: "",
  title: "",
  major: "",
  email: "",
  resume: "",
});

function createUser() {
  type FormKey = Exclude<keyof User, "id">;
  form.id = -1;
  for (const k in form) {
    if (k !== "id") {
      form[k as FormKey] = "";
    }
  }
  formDialogOpen.value = true;
}
function updateUser() {
  Object.assign(form, selected.value[0]);
  formDialogOpen.value = true;
}
async function submitForm() {
  try {
    if (form.id < 0) {
      /* const res = await api.user.createUser(form);
      form.id = res.data; */
      rows.value.push(form);
    } else {
      /* await api.user.updateUser(form.id, form); */
      Object.assign(selected.value[0], form);
    }
    selected.value = [];
    formDialogOpen.value = false;
    $q.notify({
      type: "info",
      message: "新建或修改用户成功啦",
    });
  } catch (e) {
    if (e instanceof Error) {
      $q.notify({
        type: "error",
        message: "网络出错了(*꒦ິ⌓꒦ີ)",
      });
    }
  }
}

const fileDialogOpen = ref(false);
const file = ref(null as File | null);
function importUser() {
  file.value = null;
  fileDialogOpen.value = true;
}
async function submitFile() {
  try {
    // TODO: 没时间实现了...
    console.log(file.value);
    file.value = null;
    fileDialogOpen.value = false;
    $q.notify({
      type: "info",
      message: "导入用户成功啦",
    });
  } catch (e) {
    if (e instanceof Error) {
      $q.notify({
        type: "error",
        message: "网络出错了(*꒦ິ⌓꒦ີ)",
      });
    }
  }
}
</script>

<style scoped lang="scss">
.ui-user-main {
  height: 800px;
  padding: 0 5rem;
  background-color: var(--q-secondary);
}
.ui-user-search {
  width: 500px;
  height: 36px;
  margin: 0.5rem 0;
  border: 1px solid var(--q-positive);
  border-radius: 18px;
  :deep(.q-field__prepend),
  :deep(.q-field__control) {
    height: 36px;
  }
}
.ui-user-btn {
  width: 8rem;
  height: 2rem;
  margin-left: 2rem;
  border: 1px solid var(--q-positive);
  border-radius: 1rem;
}
.ui-user-table {
  :deep(table) {
    border: 1px solid var(--q-negative);
  }
  :deep(.q-table__top),
  :deep(.q-table__bottom) {
    border: 0;
    padding: 1rem 0;
  }
  :deep(th),
  :deep(td) {
    font-size: 1rem;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.ui-user-nodata {
  height: 600px;
  font-size: 18px;
}
</style>
<style scoped lang="scss">
.ui-user-dialog-table {
  width: 500px;
  :deep(tbody td) {
    min-height: 3rem;
    padding: 0.5rem 1.5rem;
    border-color: var(--q-negative);
  }
}

@mixin ui-user-input {
  width: 320px;
  border-radius: 4px;
  :deep(input),
  :deep(textarea) {
    color: var(--q-positive) !important;
  }
  :deep(.q-field__control) {
    background-color: var(--q-negative) !important;
  }
}
.ui-user-text {
  @include ui-user-input;
  height: 2rem;
  :deep(.q-field__control),
  :deep(.q-field__native),
  :deep(.q-field__append) {
    min-height: 0;
    height: 2rem;
  }
}
.ui-user-textarea {
  @include ui-user-input;
}
.ui-user-dialog-btn-group {
  width: 500px;
}
.ui-user-dialog-btn {
  width: 160px;
}
</style>
<route lang="yaml">
alias: user
</route>
