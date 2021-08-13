<template>
  <div class="bullet_f_container" @click.self="handleBack()">
    <div class="bullet_f_select" :style="getStyle">
      <div v-if="isShowTime">
        开始时间：<el-time-select
          class=""
          placeholder="开始时间"
          v-model="time.startTime"
          :picker-options="{
            start: '00:00',
            end: '23:30'
          }"
        >
        </el-time-select>
        <br />
        结束时间：<el-time-select
          placeholder="结束时间"
          :disabled="!time.startTime"
          v-model="time.endTime"
          :picker-options="{
            start: '00:00',
            end: '23:30',
            minTime: time.startTime
          }"
        >
        </el-time-select>
      </div>
      <div v-if="isDetails" class="details">
        <form action="" method="post">
          <p>
            <label for="manHour">实际工时：</label>
            <input
              type="number"
              autocomplete="off"
              v-model="statistics.manHour"
              placeholder="0"
              name="manHour"
              class="el-input__inner myInput"
            />
          </p>
          <p>
            <label for="wage">实发工资：</label>
            <input
              type="number"
              autocomplete="off"
              v-model="statistics.wage"
              placeholder="0"
              name="wage"
              class="el-input__inner myInput"
            />
          </p>
          <p>
            <label for="company">实际付款公司：</label>
            <avue-select
              v-model="statistics.companyForm"
              placeholder="请选择内容"
              type="tree"
              :dic="companySelectDic"
              :props="companySelectProps"
            ></avue-select>
          </p>
        </form>
      </div>
      <footer class="roster_footer">
        <el-button size="medium" @click="handleCancle()">取消</el-button>

        <el-button size="medium" type="primary" @click="handleSubmitTime()"
          >提交</el-button
        >
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bottom", "isShowTime", "isDetails", "companySelectDic"],
  data() {
    return {
      companySelectProps: {
        label: "cname",
        value: "id",
        desc: "caddr"
      },
      time: {
        startTime: "",
        endTime: ""
      },
      statistics: {
        companyForm: "",
        manHour: "",
        wage: ""
      }
    };
  },
  computed: {
    getStyle() {
      if (this.isShowTime) {
        return {
          height: "275px",
          width: "600px"
        };
      } else {
        return {
          height: "360px",
          width: "600px"
        };
      }
    }
  },

  methods: {
    handleSubmitTime() {
      this.$emit("handleSubmitTime", {
        time: {
          startTime: this.time.startTime,
          endTime: this.time.endTime
        },
        statistics: this.statistics
      });
      this.time = {
        startTime: "",
        endTime: ""
      };
      this.statistics = {
        companyForm: "",
        manHour: "",
        wage: ""
      };
    },
    handleBack() {
      this.$emit("isSelf");
    },
    handleCancle() {
      this.$emit("handleCancle");
    },
    handleStartTime() {
      console.log(this.startTime);
      this.$emit("handleStartTime", this.startTime);
    },
    handleEndTime() {
      this.$emit("handleEndTime", this.endTime);
    }
  }
};
</script>

<style scoped>
.bullet_f_container {
  position: fixed;
  left: 0;
  /* right: -100%; */
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: bottom 0.3s;
  z-index: 999;
}
.bullet_f_select {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 50%;
  background: #fff;
}
.el-input {
  margin: 20px 15px;
}
.roster_footer {
  padding: 20px 0;
}
/* .details form{
    padding:20px 0;
} */
.details label {
  display: inline-block;
  width: 120px;
}
.myInput {
  height: 32px;
  width: 215px;
  line-height: 32px;
  padding-right: 30px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/* chrome */

input[type="number"] {
  -moz-appearance: textfield; /* firefox */
}
</style>
