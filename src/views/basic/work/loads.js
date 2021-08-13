import { userList } from "@/api/basic/clientuser.js";
import { brandList } from "@/api/basic/clientbrand.js";
import { fetchListInTable, getShopCondition } from "@/api/basic/clientshop.js";
import { getWorkByGroup } from "@/api/basic/clientwork.js";

export default {
  methods: {
    onLoad({ page, value, data }, callback) {
      data = {
        ...data,
        province: this.cascaderForm[0],
        city: this.cascaderForm[1],
        brandId: this.brandForm
      };
      // 首次加载查询对应的值
    //   console.log("__this", this.groups);
      if (value) {
        console.log("首次查询:" + value);

        return;
      }
      // 如果搜索条件不为空
      if (data) {
        const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
        fetchListInTable(Object.assign(data, newPage)).then(response => {
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
        const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
        fetchListInTable(newPage).then(response => {
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
      //   fetchList(Object.assign(data, page)).then(response => {
      //     callback({
      //       total: response.data.data.total,
      //       data: response.data.data.records
      //     });
      //   });
    },
    userOnLoad({ page, value, data }, callback) {
      // 首次加载查询对应的值
      //   if (!this.stopForm) {
      //     this.$message.error("请选择门店");
      //     return;
      //   }
      if (value) {
        console.log("首次查询" + value);
        return;
      }
      // 如果搜索条件不为空
      if (data) {
          const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
        userList(Object.assign(data, newPage)).then(response => {
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
        const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
        userList(newPage).then(response => {
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
      //   fetchList(Object.assign(data, page)).then(response => {
      //     callback({
      //       total: response.data.data.total,
      //       data: response.data.data.records
      //     });
      //   });
    },
    brandOnLoad({ page, value, data }, callback) {
      // 首次加载查询对应的值
      if (value) {
        getShopCondition({
          provinceId: this.cascaderForm[0],
          cityId: this.cascaderForm[1],
          brandId: value
        }).then(res => {
        //   console.log(123456789, res);
        });
        getWorkByGroup({
          year: this.year,
          month: this.month,
          brandId: value,
          cityId: this.cascaderForm[1],
          provinceId: this.cascaderForm[0]
        }).then(res => {
          this.works = res.data.data.works;
          const data = res.data.data.groups;
          // console.log(JSON.stringify(data))
          if (data) {
            this.groups = this.fill(data);
            // 数据为空的情况
          } else {
            this.handleEmpty();
          }
        });
        console.log("首次查询" + value);
        return;
      }
      // 如果搜索条件不为空
      if (data) {
        
        const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
        brandList(Object.assign(data, newPage)).then(response => {
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
        const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
        brandList(newPage).then(response => {
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
      //   brandList(Object.assign(data, page)).then(response => {
      //     callback({
      //       total: response.data.data.total,
      //       data: response.data.data.records
      //     });
      //   });
    },
    lazyLoad(node, resolve) {
      let baseUrl = "/admin/common/listCity";
      let stop_level = 1;
      let level = node.level;
      let data = node.data || {};
      let code = data.id;
      let list = [];
      if (level == 1) {
        this.provinceSave = data.id;
      }
      let callback = () => {
        resolve(
          (list || []).map(ele => {
            return Object.assign(ele, {
              leaf: level >= stop_level
            });
          })
        );
      };
      if (level == 0) {
        axios.get(`${baseUrl}?pid=0`).then(res => {
          list = res.data.data;
          callback();
        });
      }
      if (level == 1) {
        axios.get(`${baseUrl}?pid=${code}`).then(res => {
          list = res.data.data;
          callback();
        });
      } else {
        callback();
      }
    }
  }
};
