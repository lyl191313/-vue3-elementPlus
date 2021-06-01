<template>
  <div>
    <div class="header">
      <div class="header-content">
        <div class="header-content-left">
          <el-avatar shape="circle" :size="60" :src="url"></el-avatar>
          <div class="header-content-left-introduce">
            <p class="header-content-left-greet">上午好，LUIS，准备吃什么呢</p>
            <p class="header-content-left-position">
              产品分析师 | 蚂蚁金服-计算服务事业群-IOS平台部
            </p>
          </div>
        </div>
        <div class="header-content-right">
          <div>
            <p>项目数</p>
            <p>56</p>
          </div>
          <div>
            <p>团队排名</p>
            <p>8/24</p>
          </div>
          <div>
            <p>项目访问</p>
            <p>2234</p>
          </div>
        </div>
      </div>
    </div>
    <Card>
      <div class="main">
        <div class="main-left">
          <div class="main-left-project">
            <div class="main-left-project-title">
              <span>进行中的项目</span>
              <span>全部项目</span>
            </div>
            <ul>
              <li v-for="i in 6" :key="i">
                <p>
                  <el-avatar shape="circle" :size="25" :src="url"></el-avatar>
                  <span class="project-name">Alipay</span>
                </p>
                <p>
                  那时候我只会想自己想要什么，从不想自己拥有什么
                </p>
                <p>
                  <em>山口组</em>
                  <span>7小时前</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="main-left-dynamic">
            <div class="main-left-dynamic-title">
              <span>动态</span>
            </div>
            <ul>
              <li v-for="i in 10" :key="i">
                <el-avatar shape="circle" :size="35" :src="url"></el-avatar>
                <div>
                  <p>
                    张家豪在<span>高逼格设计天团</span>新建项目<span
                      >六月迭代</span
                    >
                  </p>
                  <p>9小时前</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-right">
          <div class="main-right-nav">
            <div class="main-right-nav-title">
              <span>快捷开始/便捷导航</span>
            </div>
            <ul>
              <li v-for="i in 6" :key="i">操作{{ i }}</li>
              <li>
                <button><i class="el-icon-plus"></i> 添加</button>
              </li>
            </ul>
          </div>
          <div class="main-right-index">
            <div class="main-right-index-title">
              <span>工作指标</span>
            </div>
            <div class="radar" ref="radar"></div>
          </div>
          <div class="main-right-team">
            <div class="main-right-team-title">
              <span>团队</span>
            </div>
            <ul>
              <li v-for="i in 6" :key="i">
                <el-avatar shape="circle" :size="25" :src="url"></el-avatar>
                <span>658设计天团</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
  onMounted
} from "vue";
import Card from "../../components/layouts/Card";
export default {
  components: {
    Card
  },
  setup(props, context) {
    const { proxy, appContext } = getCurrentInstance();
    const url = ref(
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    );
    const { $echarts } = appContext.config.globalProperties;

    const option = {
      title: {
        // text: "基础雷达图"
      },
      legend: {
        data: ["计划指标", "实际进度"]
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "引用", max: 650 },
          { name: "热度", max: 1600 },
          { name: "贡献", max: 3000 },
          { name: "产量", max: 3800 },
          { name: "口碑", max: 5200 },
          { name: "质量", max: 2500 }
        ]
      },
      series: [
        {
          name: "计划 vs 实际",
          type: "radar",
          data: [
            {
              value: [420, 300, 2000, 3500, 5000, 1800],
              name: "计划指标"
            },
            {
              value: [500, 1400, 2800, 2600, 4200, 2100],
              name: "实际进度"
            }
          ]
        }
      ]
    };
    onMounted(() => {
      const myChart = $echarts.init(proxy.$refs.radar);
      myChart.setOption(option);

      //   console.log(123, proxy.$refs.radar);
    });
    return {
      proxy,
      url,
      //   myChart,
      option
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      //   width: 400px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      margin-left: 20px;
      .header-content-left-introduce {
        display: flex;
        justify-content: center;
        // align-items: center;
        flex-direction: column;
        margin-left: 15px;
        .header-content-left-greet {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
        }
        .header-content-left-position {
          font-size: 14px;
        }
        p {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    &-right {
      //   width: 400px;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        height: 60px;
        padding: 0px 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &:nth-child(2) {
          border-left: 1px solid rgba(98, 98, 98, 0.2);
          border-right: 1px solid rgba(98, 98, 98, 0.2);
        }
        p {
          &:first-child {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
          }
          &:last-child {
            font-size: 24px;
            margin-top: 15px;
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
}
.main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  &-left {
    width: 70%;
    display: flex;
    flex-direction: column;
    &-project {
      height: 340px;
      background-color: #fff;
      &-title {
        height: 24px;
        line-height: 24px;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        span {
          &:first-child {
            font-weight: bold;
          }
          &:last-child {
            color: #13c2c2;
            font-size: 14px;
          }
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        li {
          width: 25%;
          flex-grow: 1;
          height: 100px;
          padding: 20px;
          border-top: 0.5px solid rgba(98, 98, 98, 0.2);
          border-right: 0.5px solid rgba(98, 98, 98, 0.2);
          &:nth-child(3n) {
            border-right: none !important;
          }
          &:hover {
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
          }
          p {
            &:first-child {
              display: flex;
              height: 25px;
              line-height: 25px;
              .project-name {
                display: block;
                height: 25px;
                line-height: 25px;
                padding-left: 10px;
                color: rgba(0, 0, 0, 0.85);
                font-weight: bold;

                // margin-left: 10px;
              }
            }
            &:nth-child(2) {
              line-height: 22px;
              font-size: 14px;
              margin: 10px 0;
              overflow: hidden;
              color: rgba(0, 0, 0, 0.45);
            }
            &:last-child {
              display: inline-block;
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              em {
                color: rgba(0, 0, 0, 0.85);
              }
              span {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
      }
    }
    &-dynamic {
      height: 540px;
      margin: 20px 0;
      background-color: #fff;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      &-title {
        height: 24px;
        line-height: 24px;
        padding: 16px;
        border-bottom: 0.5px solid rgba(98, 98, 98, 0.2);

        span {
          font-weight: bold;
        }
      }
      ul {
        list-style: none;
        padding: 24px;
        li {
          padding: 12px 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 0.5px solid rgba(98, 98, 98, 0.2);
          div {
            margin-left: 20px;
            p {
              padding: 3px 0;
              &:first-child {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                span {
                  color: #13c2c2;
                  margin: 0 5px;
                }
              }
              &:last-child {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
      }
    }
  }
  &-right {
    width: 29%;
    display: flex;
    flex-direction: column;
    &-nav {
      height: 150px;
      background-color: #fff;
      &-title {
        height: 24px;
        line-height: 24px;
        padding: 16px;
        border-bottom: 0.5px solid rgba(98, 98, 98, 0.2);

        span {
          font-weight: bold;
        }
      }
      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        li {
          //   padding: 12px 0;
          width: 25%;
          text-align: center;
          padding: 10px 0;
          font-size: 14px;
          button {
            color: #13c2c2;
            background-color: #fff;
            border: 1px solid #13c2c2;
            padding: 2px 10px;
            border-radius: 4px;
          }
        }
      }
    }
    &-index {
      height: 461px;
      margin: 20px 0;
      background-color: #fff;
      &-title {
        height: 24px;
        line-height: 24px;
        padding: 16px;
        border-bottom: 0.5px solid rgba(98, 98, 98, 0.2);

        span {
          font-weight: bold;
        }
      }
      .radar {
        padding: 20px;
        width: 85%;
        height: 85%;
        margin: 0 auto;
      }
    }
    &-team {
      height: 250px;
      background-color: #fff;
      &-title {
        height: 24px;
        line-height: 24px;
        padding: 16px;
        border-bottom: 0.5px solid rgba(98, 98, 98, 0.2);

        span {
          font-weight: bold;
        }
      }
      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 20px;
        li {
          //   padding: 12px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          text-align: center;
          padding: 10px 0;
          font-size: 14px;
          .el-avatar {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
