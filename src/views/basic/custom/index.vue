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
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
         @search-change="handleFilter"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            @click="handleAdd"
            size="small"
            v-if="permissions.custom_clientuser_add"
            >新 增</el-button
          >
          <br /><br />
        </template>
        <template slot="province" slot-scope="scope">
          <el-tag>{{ scope.row.city ? scope.row.provinceStr : "" }}</el-tag>
        </template>
        <template slot="city" slot-scope="scope">
          <el-tag>{{ scope.row.city ? scope.row.cityStr : "" }}</el-tag>
        </template>
        <template slot="district" slot-scope="scope">
          <el-tag>{{ scope.row.city ? scope.row.districtStr : "" }}</el-tag>
        </template>
        <template slot="sex" slot-scope="scope">
          <span>{{ scope.row.sex==1 ? "男" : scope.row.sex==2 ? "女": "" }}</span>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            type="primary"
            v-if="permissions.custom_clientuser_edit"
            icon="el-icon-check"
            size="small"
            plain
            @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            v-if="permissions.custom_clientuser_del"
            icon="el-icon-delete"
            size="small"
            plain
            @click="handleDel(scope.row, scope.index)"
            >删除</el-button
          >
        </template>

        <template slot="cityForm" slot-scope="scope">
          <avue-select
            v-model="form.city"
            placeholder="请选择城市"
            :dic="cityOptions"
            :props="cityProps"
          ></avue-select>
        </template>

        <template slot="districtForm" slot-scope="scope">
          <avue-select
            v-model="form.district"
            placeholder="请选择地区"
            :dic="areaOptions"
            :props="areaProps"
          ></avue-select>
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
} from "@/api/basic/clientuser";
import { tableOption } from "@/const/crud/basic/clientuser";
import { mapGetters } from "vuex";
import { getCity } from "@/api/basic/china";

export default {
  name: "clientuser",
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      listQuery: {
        current: 1,
        size: 20
      },
      tableLoading: false,
      tableOption: tableOption,
      form: {},
      cityOptions: [],
      cityProps: {
        label: "name",
        value: "id"
      },
      areaOptions: [],
      areaProps: {
        label: "name",
        value: "id"
      }
    };
  },
  created() {
    this.getList();
  },
  watch: {
    "form.province": {
      handler(val) {
        this.handleGetCity(val, "cityOptions");
      }
    },
    "form.city": {
      handler(val) {
        this.handleGetCity(val, "areaOptions");
      }
    },
  },
  mounted: function() {},
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    handleGetCity(val, args) {
      if (!val) {
        return;
      }
      getCity(val).then(res => {
        this[args] = res.data.data;
      });
    },
    getList(params) {
      this.tableLoading = true;
      fetchList({...this.listQuery,...params}).then(response => {
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
    handleFilter(param, done) {
    //   if(param.workDate) {
    //     param.searchWorkDate = param.workDate;
    //     param.workDate = undefined;
    //   }
      console.log(JSON.stringify(param))
      this.page.currentPage = 1;
      this.listQuery.current = 1;
      this.getList(param);
      done()
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
      addObj(row).then(data => {
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
