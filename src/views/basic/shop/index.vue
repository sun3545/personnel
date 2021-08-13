<template>
  <div class="app-container pull-auto">
    <basic-container>
      <header
        class="search"
        style="font-size: 14px;
    color: #606266;line-height:30px;"
      >
        <el-row :span="24" type="flex" justify="space-around" align="center">
          <el-col :span="4">
            <el-row>
              <el-col :span="6">品牌：</el-col>
              <el-col :span="18">
                <avue-input-table
                  :props="mySearchBrandProps"
                  :column="mySearchBrandColumn"
                  :on-load="mySearchOnLoad"
                  v-model="mySearch.brandId"
                  placeholder="请选择品牌"
                ></avue-input-table
              ></el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="6">省份：</el-col>
              <el-col :span="18">
                <avue-select
                  v-model="mySearch.province"
                  placeholder="请选择省份"
                  type="tree"
                  :dic="provinceDic"
                  :props="myProps"
                ></avue-select
              ></el-col> </el-row></el-col
          ><el-col :span="4">
            <el-row>
              <el-col :span="6">城市：</el-col>
              <el-col :span="18">
                <avue-select
                  v-model="mySearch.city"
                  placeholder="请选择城市"
                  type="tree"
                  :dic="cityDic"
                  :props="myProps"
                ></avue-select
              ></el-col> </el-row></el-col
          ><el-col :span="4">
            <el-row>
              <el-col :span="6">区域：</el-col>
              <el-col :span="18">
                <avue-select
                  v-model="mySearch.district"
                  placeholder="请选择区域"
                  type="tree"
                  :dic="districtDic"
                  :props="myProps"
                ></avue-select
              ></el-col> </el-row
          ></el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="6">门店：</el-col>
              <el-col :span="18">
                <avue-input
                  v-model="mySearch.shopName"
                  placeholder="请输入门店"
                ></avue-input>
              </el-col> </el-row
          ></el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" icon="el-icon-search" @click="topSearch()"
            >搜索</el-button
          >
          <el-button icon="el-icon-delete-solid" @click="topColse()"
            >清空</el-button
          >
        </el-row>
      </header>

      <avue-crud
        ref="crud"
        v-model="form"
        :search.sync="search"
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
            v-if="permissions.shop_clientshop_add"
            >新 增</el-button
          >
          <br /><br />
        </template>
        <template slot="province" slot-scope="scope">
          <el-tag>{{ scope.row.province ? scope.row.provinceStr : "" }}</el-tag>
        </template>
        <template slot="city" slot-scope="scope">
          <el-tag>{{ scope.row.city ? scope.row.cityStr : "" }}</el-tag>
        </template>
        <template slot="district" slot-scope="scope">
          <el-tag>{{ scope.row.district ? scope.row.districtStr : "" }}</el-tag>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            type="primary"
            v-if="permissions.shop_clientshop_edit"
            icon="el-icon-check"
            size="small"
            plain
            @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            v-if="permissions.shop_clientshop_del"
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
} from "@/api/basic/clientshop";
import { tableOption } from "@/const/crud/basic/clientshop";
import { fetchList as brandFetchList } from "@/api/basic/clientbrand";
import { getCity } from "@/api/basic/china";
import { mapGetters } from "vuex";
export default {
  name: "clientshop",
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
      search: {},
      cityOptions: [],
      cityProps: {
        label: "name",
        value: "id"
      },
      areaOptions: [],
      areaProps: {
        label: "name",
        value: "id"
      },
      //   自定义搜索
      mySearch: {
        brandId: "",
        province: "",
        city: "",
        district: "",
        shopName: ""
      },
      provinceDic: [],
      cityDic: [],
      districtDic: [],
      myProps: {
        label: "name",
        value: "id"
      },
      shopProps: {
        label: "name",
        value: "id"
      },

      mySearchBrandColumn: {
        children: {
          border: true,
          column: [
            {
              label: "品牌",
              search: true,
              searchSpan: 24,
              prop: "name"
            },
            {
              label: "备注",
              prop: "notes"
            }
          ]
        }
      },
      mySearchBrandProps: {
        label: "name",
        value: "id"
      }
    };
  },
  created() {
    this.getList();
    getCity(0).then(res => {
      this.provinceDic = res.data.data;
    });
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
    "mySearch.province": {
      handler() {
          this.cityDic = []
          this.districtDic = []
        this.handleGetCity(this.mySearch.province, "cityDic");
      }
    },
    "mySearch.city": {
      handler() {
        this.handleGetCity(this.mySearch.city, "districtDic");
      }
    }
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    topSearch() {
      let parmas = {};
      for (const key in this.mySearch) {
        if (Object.hasOwnProperty.call(this.mySearch, key)) {
          const element = this.mySearch[key];
          if (element) {
            parmas[key] = element;
          }
        }
      }
      this.getList(parmas);
    },
    topColse() {
      this.mySearch.brandId = "";
      this.mySearch.province = "";
      this.mySearch.city = "";
      this.mySearch.district = "";
      this.mySearch.shopName = "";
    },
    formatter(row) {
      if (!row.name) return "";
      return row.name;
    },
    mySearchOnLoad({ page, value, data }, callback) {
      //首次加载去查询对应的值
      if (value) {
        console.log("首次查询" + value);
        return;
      }
      // 如果搜索条件不为空
      if (data) {
        brandFetchList(Object.assign(data, page)).then(response => {
          callback({
            total: response.data.data.total,
            data: response.data.data.records
          });
        });
        return;
      }
      // 如果分页信息不为空
      if (page) {
        if (data) {
          return;
        }
        brandFetchList(page).then(response => {
          callback({
            total: response.data.data.total,
            data: response.data.data.records
          });
        });
      }
      //分页查询信息
      //   callback({
      //     total: 0,
      //     data: []
      //   });
    },
    handleGetCity(val, args) {
      if (!val) {
        return;
      }
      getCity(val).then(res => {
        this[args] = res.data.data;
      });
    },
    getList(pramas) {
      this.tableLoading = true;
      fetchList({ ...this.listQuery, ...pramas }).then(response => {
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
      console.log("param", param);
      //   if(param.workDate) {
      //     param.searchWorkDate = param.workDate;
      //     param.workDate = undefined;
      //   }
      console.log(JSON.stringify(param));
      this.handleGetCity(param.province, "cityOptions");
      this.page.currentPage = 1;
      this.listQuery.current = 1;
      this.getList(param);
      done();
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
      console.log(JSON.stringify(row));
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
