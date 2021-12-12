// import api, { User, Topic as TopicBase } from "~/api";
import { User, Topic as TopicBase } from "~/api";
import { getTimeString } from "~/utils";

// import { useUserStore } from "../user";

// const uS = useUserStore();
export interface Topic extends TopicBase {
  teacher: User;
}

export const useTopicStore = defineStore("topic-student", {
  state: () => ({
    list: [] as Topic[],
    chosen: {} as Topic | null,
  }),
  actions: {
    async getTopicList() {
      /* const res1 = await api.topic.getTopics([]);
      const res2 = await api.user.getUsers(res1.data.map((e) => e.teacherId!));
      this.list = res1.data.map((e, i) => ({
        ...e,
        teacher: res2.data[i],
      })); */
      this.list = [
        {
          id: 0,
          teacherId: 0,
          studentId: -1,
          title: "基于xxx的xxx",
          difficulty: "难",
          description: "这是一个测试课题~",
          requirement: "希望学生踏实能干，不要拖延",
          createTime: getTimeString(),
          updateTime: getTimeString(),
          teacher: {
            id: 0,
            role: "教师",
            username: "02121",
            password: "",
            name: "李四",
            gender: "男",
            jobNum: "02121",
            class: "",
            title: "教授",
            major: "无人机集群控制",
            email: "02121@buaa.edu.cn",
            resume: "这是一个测试账号哟~",
          },
        },
        {
          id: 1,
          teacherId: 1,
          studentId: -1,
          title: "基于xxxx的xxxx",
          difficulty: "中等",
          description: "这是另一个测试课题~",
          requirement: "希望学生踏实能干，不要拖延",
          createTime: getTimeString(Date.now() - 6 * 60 * 60 * 1000),
          updateTime: getTimeString(),
          teacher: {
            id: 1,
            role: "教师",
            username: "03456",
            password: "",
            name: "王五",
            gender: "女",
            jobNum: "03456",
            class: "",
            title: "讲师",
            major: "先进飞行器仿真",
            email: "03456@buaa.edu.cn",
            resume: "这是一个测试账号哟~",
          },
        },
      ];
    },
    async getChosenTopic() {
      /* const res1 = await api.topic.getChosenTopic({
        userId: uS.id,
      });
      const res2 = await api.user.getUser(res1.data.teacherId!);
      this.chosen = {
        ...res1.data,
        teacher: res2.data,
      }; */
      this.chosen = {
        id: 0,
        teacherId: 0,
        studentId: -1,
        title: "基于xxx的xxx",
        difficulty: "难",
        description: "这是一个测试课题~",
        requirement: "希望学生踏实能干，不要拖延",
        createTime: getTimeString(),
        updateTime: getTimeString(),
        teacher: {
          id: 0,
          role: "教师",
          username: "02121",
          password: "",
          name: "李四",
          gender: "男",
          jobNum: "02121",
          class: "",
          title: "教授",
          major: "无人机集群控制",
          email: "02121@buaa.edu.cn",
          resume: "这是一个测试账号哟~",
        },
      };
    },
    async setChosenTopic(topicId: number) {
      /* await api.topic.setChosenTopic({
        userId: uS.id,
        topicId: topicId,
      }); */
      this.chosen = this.list.find((e) => e.id === topicId)!;
    },
  },
});
