<template>
  <div class="app-container pull-auto">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @current-change="currentChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @search-change="handleFilter"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            @click="handleAdd"
            size="small"
            v-if="permissions.work_clientwork_add"
            >新 增</el-button
          >
          <br /><br />
        </template>
        <template slot="shopId" slot-scope="scope">{{
          scope.row.shopName
        }}</template>
        <template slot="clientUserId" slot-scope="scope">{{
          scope.row.clientUsername
        }}</template>
        <template slot="createBy" slot-scope="scope">{{
          scope.row.username
        }}</template>
        <template slot="brandNameForm" slot-scope="scope"
          ><avue-select
            v-model="braa"
            placeholder="请选择内容"
            type="tree"
            :dic="brandDic"
            :props="brandProps"
            disabled
          ></avue-select
        ></template>
        <template slot="brandName" slot-scope="scope">{{
          scope.row.brandName
        }}</template>
        <template slot="workTimeIntervalForm" slot-scope="scope">
          <div style="display:flex;">
            <avue-select
              v-model="startTime"
              placeholder="请选择开始时间"
              :dic="startOptions"
            ></avue-select>
            <span style="padding: 0 20px;">至</span>
            <avue-select
              v-model="endTime"
              placeholder="请选择结束时间"
              :dic="startOptions"
            ></avue-select>
          </div>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            type="primary"
            v-if="permissions.work_clientwork_edit"
            icon="el-icon-check"
            size="small"
            plain
            @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            v-if="permissions.work_clientwork_del"
            icon="el-icon-delete"
            size="small"
            plain
            @click="handleDel(scope.row, scope.index)"
            >删除</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj
} from "@/api/basic/clientwork";
import { getObj as getShopObj } from "@/api/basic/clientshop";
import { getObj as getBrandObj } from "@/api/basic/clientbrand";
import { tableOption } from "@/const/crud/basic/clientwork";
import { mapGetters } from "vuex";
export default {
  name: "clientwork",
  data() {
    return {
      braa: "",
      tableData: [],
      brandDic: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      listQuery: {
        current: 1,
        size: 10
      },
      tableLoading: false,
      tableOption,
      form: {},
      brandProps: {
        label: "name",
        value: "id"
      },
      startTime: "00:00",
      endTime: "00:30",
      startOptions: [],
      endOptions: []
    };
  },
  created() {
    this.getList();
    this.getSelectTime();
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  watch: {
    "form.shopId": {
      handler(e) {
        if (e) {
          getShopObj(e).then(res => {
            const brandId = res.data.data.brandId;
            getBrandObj(brandId).then(response => {
              this.brandDic.push(response.data.data);
              this.braa = response.data.data.id;
              this.form.brandId = response.data.data.id;
            });
          });
        }
      }
    },
    // startTime: {
    //   handler() {
    //     for (let i = 0; i < this.endOptions.length; i++) {
    //       const element = this.endOptions[i];
    //       if (element.value == this.startTime) break;
    //       this.endOptions[i] = {
    //         ...element,
    //         disabled: true
    //       };
    //     }
    //   }
    // }
  },
  methods: {
    getSelectTime() {
      for (let i = 0; i < 24; i++) {
        const str = i < 9 ? "0" + i : i;
        this.startOptions.push(
          {
            label: `${str}:00`,
            value: `${str}:00`
          },
          {
            label: `${str}:30`,
            value: `${str}:30`
          }
        );
        this.endOptions.push(
          {
            label: `${str}:00`,
            value: `${str}:00`
          },
          {
            label: `${str}:30`,
            value: `${str}:30`
          }
        );
      }
    },
    getList(params) {
      this.tableLoading = true;
      var req = this.listQuery;
      if (
        params !== undefined &&
        params !== null &&
        JSON.stringify(params) != "{}"
      ) {
        // 特别注意：这里params和req的顺序不能颠倒
        req = Object.assign(params, req);
      }
      fetchList(req).then(response => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    currentChange(val) {
      this.page.current = val;
      this.listQuery.current = val;
      this.getList();
    },
    sizeChange(val) {
      this.page.size = val;
      this.listQuery.size = val;
      this.getList();
    },
    handleFilter(params, done) {
      console.log(123, params);
      if (params.workDate) {
        params.searchDate = params.workDate;
        params.workDate = undefined;
      }
      console.log(JSON.stringify(params));
      this.page.currentPage = 1;
      this.listQuery.current = 1;
      this.getList(params);
      done();
    },
    dateChange(date) {
      this.$message.success(date);
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd: function() {
      this.$refs.crud.rowAdd();
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index);
    },
    rowDel: function(row, index) {
      var _this = this;
      this.$confirm("是否确认删除ID为" + row.id + "的记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.id);
        })
        .then(data => {
          _this.tableData.splice(index, 1);
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function(err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      putObj(row).then(data => {
        this.tableData.splice(index, 1, Object.assign({}, row));
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success"
        });
        done();
      });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      const obj = {
        ...row,
        workTimeInterval: this.startTime + "-" + this.endTime
      };
      addObj(obj).then(data => {
        this.tableData.push(Object.assign({}, row));
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success"
        });
        this.getList(this.page);
        done();
      });
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
