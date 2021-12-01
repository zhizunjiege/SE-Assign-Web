import { useUserStore } from "../user";

const userStore = useUserStore();

export const useTopicStore = defineStore("topic", {
  state: () => ({
    list: [
      {
        id: -1,
        title: "测试课题",
        difficulty: "难",
        description: "",
        requirement: "",
        createTime: "",
        teacher: {} as Partial<typeof userStore>,
      },
    ],
  }),
  actions: {
    async getTopicList() {},
    async getSelectedTopicId() {
      return -1;
    },
    async setSelectedTopicId(id: number) {},
  },
});
