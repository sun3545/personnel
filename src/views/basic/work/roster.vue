<template>
  <div class="roster_container app-container pull-auto">
    <header class="roster_header">
      省市：<avue-cascader
        lazy
        :lazy-load="lazyLoad"
        :props="props"
        v-model="cascaderForm"
      ></avue-cascader>
      品牌：<avue-input-table
        :props="brandSelectProps"
        placeholder="请选择品牌"
        :column="brandColumn"
        :on-load="brandOnLoad"
        v-model="brandForm"
      ></avue-input-table>
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
      <el-button
        @click="
          search({
            provinceId: cascaderForm[0],
            cityId: cascaderForm[1],
            brandId: brandForm,
            year,
            month
          })
        "
        type="primary"
        >搜索</el-button
      >
      <el-button type="info" @click="handleExport($event)">导出</el-button>
    </header>

    <main class="roster_main" v-show="works.length">
      <div class="roster_place"></div>
      <div class="main_top" :style="{ width: `${180 * works.length}px` }">
        <div class="fixed_w">门店</div>
        <div v-for="(item, index) in works" :key="index">
          <p>{{ item.date }}</p>
          <p>{{ item.week }}</p>
        </div>
      </div>
      <div class="scroll_content" :style="{ width: `${180 * works.length}px` }">
        <div
          class="main_content"
          v-for="(item, groupIndex) in groups"
          :key="groupIndex"
        >
          <ul :class="[groupIndex === 0 ? 'lastUl' : '', 'content_row']">
            <div class="row_left" v-if="item.shopName || item.empty">
              <!-- <p class="row_del" @click="handleRowDel(item, groupIndex)">-</p> -->
              <p class="row_add" @click="handleRowAdd(item, groupIndex)">
                <span>+</span>
              </p>
            </div>
            <div class="row_left" v-else>
              <p class="row_del" @click="customDel(item, groupIndex)">
                <span>-</span>
              </p>
            </div>
            <li class="row_Select">
              <span>{{ item.shopName }}</span>
              <avue-input-table
                @input="handleAddIndex($event, groupIndex, 1000)"
                :disabled="!brandForm"
                v-if="!item.shopName || item.empty || !item.shopId"
                :props="shopSelectProps"
                :column="shopColumn"
                :on-load="onLoad"
                v-model="shopForm"
              >
              </avue-input-table>
            </li>
            <li v-for="(workItem, index) in item.dateGroups" :key="index">
              <div
                v-for="(clientWork, clientIndex) in workItem.clientWorks"
                :key="clientIndex"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="clientWork.clientUsername"
                  placement="top"
                  :disabled="clientWork.clientUsername.trim().length<7?true:false"
                >
                  <p
                    class="timeExpired"
                    ref="handleHoverTextShow"
                    v-show="
                      new Date().getDate() > index + 1 ||
                        new Date().getMonth() + 1 > month ||
                        !brandForm
                    "
                    @click="
                      handleExpiredUser(
                        clientWork,
                        clientWork.clientUsername,
                        groupIndex,
                        index
                      )
                    "
                  ></p>
                </el-tooltip>

                <button
                  :data-index="clientIndex"
                  @click.stop="
                    handleUserTime('18px', true, groupIndex, index, $event)
                  "
                >
                  {{ clientWork.workTimeInterval }}
                </button>
                <button class="btnTextOver">
                  <!-- v-if="
                    new Date().getDate() - 1 < index + 1 &&
                      !clientWork.clientUsername
                  " -->
                  {{ clientWork.clientUsername }}
                  <avue-input-table
                    :disabled="time.startTime"
                    v-if="
                      new Date().getDate() - 1 < index + 1 &&
                        !clientWork.clientUsername
                    "
                    :props="userSelectProps"
                    :column="userColumn"
                    :on-load="userOnLoad"
                    v-model="userForm"
                  >
                  </avue-input-table>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer class="roster_footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button>取消</el-button>
    </footer>
    <!-- 定义弹窗 开始时间，结束时间 实际工资等 -->
    <BulletFrame
      :style="{ bottom: timeBottom }"
      @handleSubmitTime="handleTime($event)"
      @isSelf="handleCancle('100%')"
      @handleCancle="handleCancle('100%')"
      @handleEndTime="endTime = $event"
      :isShowTime="isShowTime"
      :isDetails="isDetails"
      :companySelectDic="companySelectDic"
    />
  </div>
</template>
<script>
import { getWorkByGroup, saveBatch, putObj } from "@/api/basic/clientwork.js";
import { companyList } from "@/api/basic/basiccompany.js"; // 公司
import BulletFrame from "./bulletFrame";
import yearData from "@/page/data";
import { getExport } from "@/api/basic/china";
import {
  shopSelectProps,
  shopColumn,
  userSelectProps,
  userColumn,
  brandSelectProps,
  brandColumn,
  treeProps
} from "./optios";
import mixinLoads from "./loads";
export default {
  mixins: [mixinLoads],
  components: {
    BulletFrame
  },
  data() {
    return {
      // 溢出文字的父元素是否显示
      isShowText: false,
      // 定义点击添加时，必要的数据
      myIdForm: {
        id: "",
        clientUserId: "",
        shopId: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        workDate: "",
        workTimeInterval: "",
        payCount: "",
        companyId: ""
      },
      // 记录过期后所点击对象
      companyFormData: {},
      // 配置
      shopForm: "",
      shopSelectDic: [],
      userForm: "",
      userSelectDic: [],
      brandForm: "",
      treeForm: "",
      treeDic: [],
      brandSelectDic: [],
      shopSelectProps,
      shopColumn,
      userSelectProps,
      userColumn,
      brandSelectProps,
      brandColumn,
      treeProps,
      storageIndex: {
        index: 0,
        subIndex: 0
      },
      companyForm: "",
      companySelectDic: [],
      provinceSave: 0,
      yearData,
      year: new Date().getFullYear(),
      month: "0" + (new Date().getMonth() + 1),
      cascaderForm: ["310000", "310100"],
      props: {
        label: "name",
        value: "id"
      },
      isBulletFrame: true,
      time: {
        startTime: "",
        endTime: ""
      },
      timeBottom: "100%",
      isShowTime: false,
      isDetails: false,
      works: [],
      groups: [],
      newGroups: [],
      oldSearch: {},
      loadEmpty: "",
      addIndex: 0,
      colIndex: 0,
      recordIndex: 0,
      subHtml: {},
      lastTime: 0,
      firstTime: 0,
      isShopIdChange: false,
      isCompanySelect: false
    };
  },
  created() {
    // 首次请求数据
    getWorkByGroup({
      year: this.year,
      month: this.month,
      brandId: "-",
      cityId: this.cascaderForm[1],
      provinceId: this.cascaderForm[0]
    }).then(res => {
      this.works = res.data.data.works;
      const data = res.data.data.groups;
      if (data) {
        this.groups = this.fill(data);
      } else {
        console.log("没有数据");
        this.handleEmpty();
      }
    });
  },
  // 监听 clientUserId brandId shopId companyId,更新后重新赋值
  watch: {
    userForm: function() {
      this.groups[this.storageIndex.index].dateGroups[
        this.storageIndex.subIndex
      ].clientWorks.forEach(item => {
        item.clientUserId = this.userForm;
      });
      // this.time.startTime = true
    },
    brandForm: function() {
      this.groups[this.storageIndex.index].dateGroups[
        this.storageIndex.subIndex
      ].clientWorks.forEach(item => {
        item.brandId = this.brandForm ? this.brandForm : this.myIdForm.brandId;
      });
    },
    shopForm: function() {
      console.log("watch:shopName");
      this.isShopIdChange = true;
    },
    companyFrom: function() {
      this.groups[this.storageIndex.index].dateGroups[
        this.storageIndex.subIndex
      ].clientWorks.forEach(item => {
        item.companyId = this.companyForm
          ? this.companyForm
          : this.myIdForm.companyId;
      });
    }
  },
  methods: {
    //导出
    handleExport(event) {
      if (!this.brandForm) {
        this.$message.error("请选择品牌");
        return;
      }
      getExport({
        year: this.year,
        month: this.month,
        brandId: this.brandForm,
        cityId: this.cascaderForm[1],
        provinceId: this.cascaderForm[0]
      }).then(res => {
        // console.log("res", res);
        // const oldName =
        //   res
        //     .getResponseHeader("content-disposition")
        //     .split(";")[1]
        //     .split("=")[1] || "";
        // let name = decodeURI(oldName);
        // console.log("name", name);
        // const iconv = require("iconv-lite");
        // iconv.skipDecodeWarning = true; //忽略警告
        // let name1 = iconv.decode(oldName, "utf-8");
        // console.log("fileName_", name1);

        let blob = new Blob([res.data], {
          type: "application/octet-stream;charset=UTF-8"
        });
        // let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        const date = new Date();
        let fileName = `排班计划表${date.getFullYear()}${date.getMonth() +
          1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.xlsx`;
        downLoadFile(blob, fileName);
      });

      function downLoadFile(blob, fileName) {
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = URL.createObjectURL(blob); //创建一个指向该参数对象的URL
        link.download = fileName;
        link.click(); // 触发下载
        URL.revokeObjectURL(link.href); // 释放通过 URL.createObjectURL() 创建的 URL
      }
    },
    // 处理添加
    handleAddIndex(event, index, wait) {
      this.firstTime = +new Date();
      if (this.firstTime - this.lastTime < wait || !this.isShopIdChange) return;
      console.log("handleAddIndex");

      this.lastTime = this.firstTime;
      this.isShopIdChange = false;
      this.groups[index].dateGroups.forEach(groupItem => {
        groupItem.clientWorks.forEach(item => {
          item.shopId = this.shopForm;
        });
      });
    },
    // 自定义删除按钮
    customDel(item, index) {
      var subIndex = 0;
      item.dateGroups.forEach(groupItem => {
        groupItem.clientWorks.forEach(clientItem => {
          if (!clientItem.clientUserId || !clientItem.workTimeInterval) {
            subIndex++;
          }
        });
      });
      if (subIndex == this.works.length) {
        this.groups.splice(index, 1);
        subIndex = 0;
      } else {
        this.$message.error("没有可删除项");
        subIndex = 0;
      }
    },
    // 点击外层元素去除弹幕 / 点击取消
    isSelf() {
      if (this.isCompanySelect) return;
      this.timeBottom = "100%";
      this.isDetails = false;
      this.isShowTime = false;
    },
    // 子组件点击提交按钮
    handleTime(e) {
      this.subHtml = e;
      this.judgeAlter(e);
      if (this.isCompanySelect) return;
      this.timeBottom = "100%";
      this.isShowTime = false;
      this.isDetails = false;
    },
    judgeAlter(e) {
      // 拿取更改的数据
      let works = this.groups[this.storageIndex.index].dateGroups;
      // 判断更改的是：实际工作开始与结束时间 还是实际工作时长
      if (e.time.startTime && e.time.endTime) {
        this.time.startTime = false;
        // 获取当前时间：年月日
        const date = `${this.year}-${this.month}-${
          this.storageIndex.subIndex + 1 < 10
            ? "0" + (this.storageIndex.subIndex + 1)
            : this.storageIndex.subIndex + 1
        }`;
        works.forEach(item => {
          item.clientWorks.forEach((clientItem, index) => {
            // 更新必要数据
            // console.log(clientItem.workDate , date,clientItem.htmlIndex,this.colIndex)
            if (
              clientItem.workDate == date &&
              clientItem.htmlIndex == this.colIndex
            ) {
              clientItem.clientUserId = this.userForm;
              clientItem.brandId = this.brandForm;
              // clientItem.shopId = this.shopForm?this.shopForm:this.myIdForm.shopId;
              clientItem.provinceId = this.cascaderForm[0];
              clientItem.cityId = this.cascaderForm[1];
              clientItem.companyId = this.companyForm;
              clientItem.workTimeInterval = `${e.time.startTime}-${e.time.endTime}`;
            }
          });
        });
      }
      if (
        e.statistics.companyForm &&
        e.statistics.wage &&
        e.statistics.manHour
      ) {
        // 提交
        putObj({
          companyId: e.statistics.companyForm,
          workCount: e.statistics.manHour,
          payCount: e.statistics.wage,
          id: this.companyFormData.id
        }).then(res => {
          this.$message.success("提交成功");
          e.statistics.companyForm = "";
          e.statistics.manHour = "";
          e.statistics.wage = "";
        });
      } else if (!e.statistics.manHour) {
        this.$message.error("请填写实际工时");
        this.isCompanySelect = true;
        return;
      } else if (!e.statistics.wage) {
        this.$message.error("请填写实发工资");
        this.isCompanySelect = true;
        return;
      } else if (!e.statistics.companyForm) {
        this.$message.error("请填写实际付款公司");
        this.isCompanySelect = true;
        return;
      }
      this.isCompanySelect = false;
    },
    // 开始与结束时间,提交后的处理
    handleUserTime(position, isShow, index, subIndex, event) {
      this.colIndex = event.target.getAttribute("data-index");
      //    if(!this.shopForm||this.loadEmpty){
      //        this.$message.error('请选择门店')
      //        return
      //    }
      this.timeBottom = position;
      this.isShowTime = isShow;
      this.isDetails = false;
      // 存取当前更改的下标
      this.storageIndex = {
        index,
        subIndex
      };
      this.loadEmpty = "";
    },
    // 过期后的处理
    handleExpiredUser(item, userName, index, subIndex) {
      if (!this.brandForm) {
        this.$message.error("请先选择品牌");
        return;
      }
      if (!userName) return;

      this.timeBottom = "18px";
      this.isShowTime = false;
      this.isDetails = true;
      // 更新下标
      this.companyFormData = item;
      //   console.log(item)
      //   console.log("前", this.storageIndex)

      //   this.storageIndex = {
      //     index,
      //     subIndex
      //   };
      //   console.log("后", this.storageIndex)

      // 发送请求: 实际付款公司的信息
      companyList().then(res => {
        this.companySelectDic = res.data.data;
      });
    },
    // 点击取消
    handleCancle() {
      this.isCompanySelect = false;
      this.timeBottom = "100%";
      this.isShowTime = false;
      this.isDetails = false;
    },

    // 添加行
    handleRowAdd(item, inde) {
      if (!this.brandForm) {
        this.$message.error("请先选择品牌");
        return;
      }
      // this.userForm = ''
      let dateArr = [];
      // 获取当前的必要信息
      let workData = {};
      for (let i = 0; i < item.dateGroups.length; i++) {
        const shop = item.dateGroups[i].clientWorks[0];
        if (
          shop.clientUserId &&
          shop.provinceId &&
          shop.cityId &&
          shop.workDate &&
          shop.workTimeInterval &&
          shop.shopId
        ) {
          workData = shop;
          break;
        }
      }
      if (workData.shopId) {
        this.myIdForm.shopId = workData.shopId;
        this.myIdForm.brandId = workData.brandId;
        this.myIdForm.districtId = workData.districtId;
      }
      dateArr = workData.workDate.split("-");
      // 生成添加行的数据
      const fill = {
        shopId: workData.shopId,
        shopName: "",
        dateGroups: []
      };
      for (let i = 1; i <= this.works.length; i++) {
        fill.dateGroups.push({
          date: "",
          week: "",
          clientWorks: [
            {
              shopId: workData.shopId,
              htmlIndex: 0,
              id: "",
              clientUserId: "",
              provinceId: this.myIdForm.provinceId,
              cityId: this.myIdForm.cityId || this.cascaderForm[1],
              districtId: this.myIdForm.districtId || this.cascaderForm[0],
              companyId: "",
              brandId: workData.brandId,
              workTimeInterval: "",
              workCount: "",
              payCount: "",
              workDate: `${dateArr[0]}-${dateArr[1]}-${i > 9 ? i : "0" + i}`,
              createBy: "",
              createTime: "",
              provinceName: null,
              cityName: null,
              districtName: null,
              brandName: null,
              shopName: null,
              clientUsername: "",
              clientUserPhone: null,
              username: null,
              searchWorkDate: null
            }
          ]
        });
      }
      // console.log('fill', fill)
      // this.addIndex += inde
      // console.log("add",this.addIndex)
    //   console.log("inde", inde);
      const groupItemShopId = this.groups[inde].shopId;
      let newItemIndex = 0;
      for (let i = 0; i < this.groups.length; i++) {
        const element = this.groups[i];
        if (element.shopId == groupItemShopId) {
          newItemIndex = i;
        }
      }
    //   console.log(newItemIndex);
      this.groups.splice(newItemIndex + 1, 0, fill);
    },

    // 删除行
    handleRowDel(item, index) {
      return;
      let count = false;
      this.groups[this.addIndex].dateGroups.forEach(gropItem => {
        gropItem.clientWorks.forEach((groupsItem, index) => {
          if (groupsItem.clientUserId && groupsItem.workTimeInterval) {
            count = true;
            return;
          }
        });
      });
      if (count) {
        this.$message.error("没有可以删除的了");
      } else {
        this.groups.splice(this.addIndex + index, 1);
        this.addIndex--;
      }
    },
    // 搜索
    search(obj) {
      if (!Object.keys(this.cascaderForm).length) {
        this.$message.error("请选择省份");
        return;
      }
      if (!obj.year) {
        this.$message.error("请选择年份");
        return;
      }
      if (!obj.month) {
        this.$message.error("请选择月份");
        return;
      }
      if (!this.brandForm) {
        this.$message.error("请选择品牌");
        return;
      }
      // 根据搜索条件发送请求
      getWorkByGroup(obj).then(res => {
        this.works = res.data.data.works;
        const data = res.data.data.groups;
        if (data) {
          this.groups = this.fill(data);
          // 数据为空的情况
        } else {
          this.handleEmpty();
        }
      });
    },
    // 数据为空
    handleEmpty() {
      this.groups = [];
      this.loadEmpty = "首次加载为空";
      const fill = {
        shopId: "",
        shopName: "",
        empty: "空",
        dateGroups: []
      };
      for (let i = 1; i <= this.works.length; i++) {
        fill.dateGroups.push({
          date: "",
          week: "",
          clientWorks: [
            {
              htmlIndex: 0,
              id: "",
              clientUserId: "",
              provinceId: "",
              cityId: "",
              districtId: "",
              companyId: "",
              brandId: "",
              shopId: "",
              workTimeInterval: "",
              workCount: "",
              payCount: "",
              workDate: `${this.year}-${this.month}-${i > 9 ? i : "0" + i}`,
              createBy: "",
              createTime: "",
              provinceName: null,
              cityName: null,
              districtName: null,
              brandName: null,
              shopName: null,
              clientUsername: "",
              clientUserPhone: null,
              username: null,
              searchWorkDate: null
            }
          ]
        });
      }
      this.groups.splice(0, 0, fill);
    },
    // 数据提交
    submit() {
      const arr = [];
      this.groups.forEach(item => {
        item.dateGroups.forEach((groupsItem, indd) => {
          groupsItem.clientWorks.forEach((subItem, index) => {
            if (
              subItem.clientUserId &&
              subItem.provinceId &&
              subItem.cityId &&
              subItem.workDate &&
              subItem.workTimeInterval &&
              subItem.shopId
            ) {
              arr.push({
                id: subItem.id,
                clientUserId: subItem.clientUserId,
                brandId: subItem.brandId,
                shopId: subItem.shopId,
                provinceId: subItem.provinceId,
                cityId: subItem.cityId,
                districtId: subItem.districtId,
                workDate: subItem.workDate,
                workTimeInterval: subItem.workTimeInterval,
                payCount: subItem.payCount,
                companyId: subItem.companyId
              });
            }
          });
        });
      });
      console.log("submit", JSON.stringify(arr));
      saveBatch(arr).then(res => {
        this.$message.success("提交成功");
        getWorkByGroup({
          year: this.year,
          month: this.month,
          brandId: this.brandForm,
          cityId: this.cascaderForm[1],
          provinceId: this.cascaderForm[0]
        }).then(res => {
          this.works = res.data.data.works;
          const data = res.data.data.groups;
          if (data) {
            // console.log(JSON.stringify(data))
            this.groups = this.fill(data);
          } else {
            // 数据为空
            console.log("没有数据");
            this.handleEmpty();
          }
          // location.reload();
        });
      });
      this.userForm = "";
    },

    // 数据请求之后进行填充
    fill(data) {
      data.forEach(groupItem => {
        let maxLength = 0;
        const dateArr = [];
        let currCount = [];
        groupItem.dateGroups.forEach(clientItem => {
          const length = clientItem.clientWorks.length;
          dateArr.push(Number(clientItem.date.split("-")[2]));
          currCount.push(length);
          if (length > maxLength) {
            maxLength = length;
          }
        });
        dateArr.sort((a, b) => a - b);
        currCount.sort((a, b) => a - b);
        // let oldShopId = groupItem.shopId
        for (let i = 1; i <= this.works.length; i++) {
          if (dateArr.includes(i)) {
            continue;
          } else {
            const obj = {
              date: `${this.year}-${this.month}-${i > 9 ? i : "0" + i}`,
              week: "",
              clientWorks: []
            };
            for (let j = 0; j < maxLength; j++) {
              obj.clientWorks.push({
                htmlIndex: j,
                id: "",
                clientUserId: "",
                brandId: "",
                shopId: groupItem.shopId,
                provinceId: "",
                cityId: "",
                districtId: "",
                workTimeInterval: "",
                workCount: "",
                payCount: "",
                companyId: null,
                workDate: `${this.year}-${this.month}-${i > 9 ? i : "0" + i}`,
                createBy: "",
                createTime: "",
                provinceName: null,
                cityName: null,
                districtName: null,
                brandName: null,
                shopName: null,
                clientUsername: "",
                clientUserPhone: null,
                username: null,
                searchWorkDate: null
              });
            }
            // obj.clientWorks
            groupItem.dateGroups.push(obj);
          }
        }
        groupItem.dateGroups.sort(
          (a, b) => a.date.split("-")[2] - b.date.split("-")[2]
        );

        dateArr.forEach(item => {
          // console.log(item,groupItem.dateGroups[item-1])
          const len = groupItem.dateGroups[item - 1].clientWorks.length;
          if (len !== maxLength) {
            for (let i = 0; i < maxLength - len; i++) {
              groupItem.dateGroups[item - 1].clientWorks.push({
                htmlIndex: i + len,
                id: "",
                clientUserId: "",
                brandId: "",
                shopId: groupItem.shopId,
                provinceId: "",
                cityId: "",
                districtId: "",
                workTimeInterval: "",
                workCount: "",
                payCount: "",
                companyId: null,
                workDate: `${this.year}-${this.month}-${
                  item > 10 ? item : "0" + item
                }`,
                createBy: "",
                createTime: "",
                provinceName: null,
                cityName: null,
                districtName: null,
                brandName: null,
                shopName: null,
                clientUsername: "",
                clientUserPhone: null,
                username: null,
                searchWorkDate: null
              });
            }
          }
        });
      });
      return data;
    }
  }
};
</script>

<style lang="less" scoped src="../../../styles/roster.less"></style>
