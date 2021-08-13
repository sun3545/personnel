<template>
  <div>
    
    <!-- <div class="menual_main">
      <div class="menual_main_header">
        年份：<avue-select
          v-model="year"
          placeholder="请选择年份"
          type="tree"
          :dic="yearData.years"
        ></avue-select>
        月份：<avue-select
          v-model="month"
          placeholder="请选择月份"
          type="tree"
          :dic="yearData.months"
        ></avue-select>
        <el-button @click="search(year,month)" type="primary">搜索</el-button>
      </div>
      <div
        class="menual_main_body"
        :style="{ left: containerWidth }"
        ref="menual_main_body"
      > -->
        <!-- <Table :works="works" :brandMap="brandMap" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "./tables.vue";
import { getHomeSum } from "@/api/basic/clientwork.js";
import yearData from "./data";

export default {
  name: "wel",
  data() {
    return {
      yearData,
      year: "",
      month: "",
      containerWidth: window.innerWidth,
      works: [],
      brandMap: [],
      filterDateCom: [],
      activeNames: ["1", "2", "3", "4"],
      DATA: [],
      text: "",
      actor: "",
      count: 0,
      isText: false,

      form: {},
      option: {
        column: [
          {
            label: "姓名",
            prop: "name",
            span: 8
          },
          {
            label: "性别",
            prop: "sex",
            span: 8
          }
        ]
      },

      option1: {
        excelBtn: false,
        menu: false,
        border: true,
        headerAlign: "center",
        align: "center",
        tree: true,
        labelWidth: 100,
        column: [
          {
            label: "区域",
            prop: "area",
            width: 140
          },
          {
            label: "门店",
            prop: "store",
            width: 140
          },
          {
            label: "复杂表头",
            children: [
              {
                label: "信息",
                prop: "age"
              }
            ]
          }
        ]
      },
      data: []
    };
  },
  components: {
    Table
  },
  computed: {
    ...mapGetters(["website"])
  },
  created() {
      
    const myDate = new Date();
    const tYear = myDate.getFullYear() + "";
    const tMonth =
      myDate.getMonth() + 1 < 10
        ? "0" + (myDate.getMonth() + 1)
        : myDate.getMonth() + 1;
    this.search(tYear, tMonth);
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return (this.containerWidth < 893 ? 0 : 240) + "px";
    }
  },
  methods: {
    search(year, month) {
      if (!year) {
        this.$message.error("请选择年份");
        return
      }
      if (!month) {
        this.$message.error("请选择月份");
        return
      }
      getHomeSum(year, month).then(res => {
        this.works = res.data.data.works;
        // console.log(this.works)
        this.brandMap = res.data.data.brandMap;
          console.log(JSON.stringify(this.brandMap))

      });
    },
    handleResize() {
      this.containerWidth = window.innerWidth;
    },
    getData() {
      if (this.count < this.DATA.length - 1) {
        this.count++;
      } else {
        this.count = 0;
      }
      this.isText = true;
      this.actor = this.DATA[this.count];
    },
    setData() {
      let num = 0;
      let count = 0;
      let active = false;
      let timeoutstart = 5000;
      let timeoutend = 1000;
      let timespeed = 10;
      setInterval(() => {
        if (this.isText) {
          if (count == this.actor.length) {
            active = true;
          } else {
            active = false;
          }
          if (active) {
            num--;
            this.text = this.actor.substr(0, num);
            if (num == 0) {
              this.isText = false;
              setTimeout(() => {
                count = 0;
                this.getData();
              }, timeoutend);
            }
          } else {
            num++;
            this.text = this.actor.substr(0, num);
            if (num == this.actor.length) {
              this.isText = false;
              setTimeout(() => {
                this.isText = true;
                count = this.actor.length;
              }, timeoutstart);
            }
          }
        }
      }, timespeed);
    }
  }
};
</script>

<style scoped lang="scss">
.wel-contailer {
  position: relative;
}

.banner-text {
  position: relative;
  padding: 0 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
  height: 30%;
  z-index: 100;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: none;
}

.actor {
  height: 250px;
  overflow: hidden;
  font-size: 18px;
  color: #333;
}

.actor:after {
  content: "";
  width: 3px;
  height: 25px;
  vertical-align: -5px;
  margin-left: 5px;
  background-color: #333;
  display: inline-block;
  animation: blink 0.4s infinite alternate;
}

.typeing:after {
  animation: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}
.menual_main {
  padding: 0 10px;
}
.menual_main_header {
  position: relative;
  z-index: 100;
  font-size: 18px;
}
.menual_main_body {
  background: #fff;
  position: fixed;
  top: 160px;
  bottom: 0;
  width: calc(100% - 240px);
//   height: calc(100% - 160px);
  overflow: scroll;
  z-index: 0;
}
.el-button{
    margin-left: 40px;
}
</style>
