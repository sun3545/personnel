import { fetchList } from "@/api/basic/clientuser";
import { fetchListInTable } from "@/api/basic/clientshop";
import { fetchUsersInTable } from "@/api/admin/user";
import { fetchList as brandFetchList } from "@/api/basic/clientbrand";
import { Select } from "element-ui";
import {brandOption} from './clientbrand'
export const tableOption = {
  sumColumnList: [
    {
      label: "工时:",
      name: "workCount",
      type: "sum",
      decimals: 1
    },
    {
      label: "工资:",
      name: "payCount",
      type: "sum",
      decimals: 1
    }
  ],
  column: [
    {
      type: "tree",
      label: "品牌",
      prop: "brandId",
      search: true,
      display: true,
      addDisabled: true,
      editDisabled: true,
      slot: true,
      formslot: true,
      props: {
        label: "name",
        value: "id"
      },
      dicUrl: "/admin/clientbrand/listAll"
    },
    {
      type: "table",
      label: "门店",
      prop: "shopId",
      readonly: false,
      display: true,
      required: true,
      //   slot: true,
      search: true,
      props: {
        label: "shopName",
        value: "id"
      },
      rules: [
        {
          message: "请选择门店",
          trigger: "blur",
          required: true
        }
      ],
      children: {
        border: true,
        column: [
          {
            label: "品牌",
            // search: true,
            searchSpan: 12,
            prop:"name"
            // prop: "brandId",
            // formslot:true,
            // props:{
            //     label:"name",
            //     value:"brandId"
            // }
          },
          {
            label: "门店名称",
            search: true,
            searchSpan: 24,
            prop: "shopName"
          },
          {
            label: "省份",
            prop: "provinceStr",
          },
          {
            label: "城市",
            prop: "cityStr",
            // search: true
          },
          {
            label: "区域",
            prop: "districtStr",
            // search: true
          },
          {
            label: "门店位置",
            prop: "address"
          }
        ]
      },
      // 匹配值
      formatter(row) {
        //   console.log(this.form)
        if (!row.shopName) {
          return "";
        }
        return row.shopName;
      },
      onLoad({ page, value, data }, callback) {
        // 首次加载查询对应的值
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
          console.log("data2", data);
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
        // callback({
        //   total: 0,
        //   data: []
        // });
        // fetchList(Object.assign(data={}, page)).then(response => {
        //   callback({
        //     total: response.data.data.total,
        //     data: response.data.data.records
        //   });
        // });
      }
    },
    // {
    //   type: "table",
    //   label: "品牌",
    //   prop: "brandId",
    //   addDisabled: true,
    //   editDisabled: true,
    //   search: true,
    //   display: true,
    //   props: {
    //     label: "name",
    //     value: "id"
    //   },
    //   children: {
    //     border: true,
    //     column: [
    //       {
    //         label: "品牌",
    //         search: true,
    //         searchSpan: 24,
    //         prop: "name"
    //       },
    //       {
    //         label: "备注",
    //         prop: "notes"
    //       }
    //     ]
    //   },
    //   // 匹配值
    //   formatter: row => {
    //     // console.log(JSON.stringify(row));
    //     console.log("没有")
    //     if (!row.name) {
    //       return "";
    //     }
    //     return row.name;
    //   },
    //   onLoad: ({ page, value, data }, callback) => {
    //     // 首次加载查询对应的值
    //     if (value) {
    //       console.log("首次查询" + value);
    //       return;
    //     }
    //     // 如果搜索条件不为空
    //     if (data) {
    //       brandFetchList(Object.assign(data, page)).then(response => {
    //         callback({
    //           total: response.data.data.total,
    //           data: response.data.data.records
    //         });
    //       });
    //       return;
    //     }
    //     // 如果分页信息不为空
    //     if (page) {
    //       if (data) {
    //         return;
    //       }
    //       brandFetchList(page).then(response => {
    //         callback({
    //           total: response.data.data.total,
    //           data: response.data.data.records
    //         });
    //       });
    //     }
    //     //分页查询信息
    //     //   callback({
    //     //     total: 0,
    //     //     data: []
    //     //   });
    //     // fetchList(Object.assign(data, page)).then(response => {
    //     //     callback({
    //     //       total: response.data.data.total,
    //     //       data: response.data.data.records
    //     //     });
    //     //   });
    //   }
    // },

    {
      type: "table",
      label: "客户",
      prop: "clientUserId",
      readonly: false,
      display: true,
      required: true,
      slot: true,
      search: true,
      props: {
        label: "name",
        value: "id"
      },
      rules: [
        {
          message: "请选择客户",
          trigger: "blur",
          required: true
        }
      ],
      children: {
        border: true,
        // addBtn: true,
        column: [
          {
            label: "昵称",
            search: true,
            searchSpan: 8,
            prop: "name"
          },
          {
            label: "备注",
            search: true,
            searchSpan: 8,
            prop: "remark"
          },
          {
            type: "select",
            label: "性别",
            prop: "sex",
            search: true,
            searchSpan: 8,
            dicData: [
              {
                label: "男",
                value: 1
              },
              {
                label: "女",
                value: 2
              }
            ]
          },
          {
            label: "联系电话",
            prop: "phone"
          },
          {
            label: "省份",
            prop: "provinceStr"
          },
          {
            label: "城市",
            prop: "cityStr"
          },
          {
            label: "区域",
            prop: "districtStr"
          },
          {
            label: "住址",
            prop: "address"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        if (!row.name) {
          return "";
        }
        return row.name;
      },
      onLoad: ({ page, value, data }, callback) => {
        // 首次加载查询对应的值
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
          fetchList(Object.assign(data, newPage)).then(response => {
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
          fetchList(newPage).then(response => {
            callback({
              total: response.data.data.total,
              data: response.data.data.records
            });
          });
        }
        //分页查询信息
        // callback({
        //   total: 0,
        //   data: []
        // });
        // fetchList(Object.assign(data, page)).then(response => {
        //     callback({
        //       total: response.data.data.total,
        //       data: response.data.data.records
        //     });
        //   });
      }
    },
    {
      type: "date",
      label: "工作日期",
      prop: "workDate",
      display: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      dateDefault: true,
      search: true,
      searchRange: true, // 搜索条件中是否显示日期范围
      searchSpan: 8, // 搜索条件所占用的宽度
      searchClearable: true, // 是否可清除搜索条件
      rules: [
        {
          required: true,
          message: "工作日期必须填写"
        }
      ]
    },
    {
      label: "工作时间段",
      prop: "workTimeInterval",
      type: "timerange",
      formslot:true,
      slot:true,
      showColumn: false,
      format: "HH:mm",
      valueFormat: "HH:mm",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    },
    {
      type: "input",
      label: "实际工作时长",
      prop: "workCount",
      display: true,
      showWordLimit: false,
      controls: true
    },
    {
      type: "input",
      label: "实发工资",
      prop: "payCount",
      display: true,
      showWordLimit: false,
      controls: true
    },
    {
        type: "tree",
        label: "付款公司",
        prop: "companyId",
        display: true,
        slot:true,
        props: {
            label: "cname",
            value: "id",
            desc: "caddr"
          },
        dicUrl:'/admin/basiccompany/list'
      },
    {
      type: "table",
      label: "排工员工",
      prop: "createBy",
      readonly: false,
      display: false,
      slot: true,
      search: true,
      props: {
        label: "username",
        value: "userId"
      },
      children: {
        border: true,
        column: [
          {
            label: "用户名",
            search: true,
            searchSpan: 24,
            prop: "username"
          },
          {
            label: "手机号",
            prop: "phone"
          },
          {
            label: "角色",
            prop: "role"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        if (!row.username) {
          return "";
        }
        return row.username;
      },
      onLoad: ({ page, value, data }, callback) => {
        // 首次加载查询对应的值
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
          fetchUsersInTable(Object.assign(data, newPage)).then(response => {
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
          fetchUsersInTable(newPage).then(response => {
            callback({
              total: response.data.data.total,
              data: response.data.data.records
            });
          });
        }
        //分页查询信息
        // callback({
        //   total: 0,
        //   data: []
        // });
        // fetchList(Object.assign(data, page)).then(response => {
        //     callback({
        //       total: response.data.data.total,
        //       data: response.data.data.records
        //     });
        //   });
      }
    }
  ],
  labelPosition: "left",
  labelSuffix: ":",
  labelWidth: 120,
  gutter: 0,
  showSummary: true, // 显示汇总字段
  menuBtn: true,
  submitBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  submitText: "提交",
  emptyBtn: true,
  emptyText: "暂无数据",
  menuPosition: "center",
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: false,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 24,
  searchSpan: 8
};
