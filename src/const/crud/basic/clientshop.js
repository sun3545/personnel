import { fetchList } from "@/api/basic/clientbrand";

export const tableOption = {
  column: [
    {
      type: "table",
      label: "品牌",
      prop: "brandId",
    //   search: true,
      display: true,
      props: {
        label: "name",
        value: "id"
      },
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
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
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
        //   callback({
        //     total: 0,
        //     data: []
        //   });
        // fetchList(Object.assign(data, page)).then(response => {
        //     callback({
        //       total: response.data.data.total,
        //       data: response.data.data.records
        //     });
        //   });
      }
    },
    {
      type: "select",
      label: "省份",
      slot: true,
    //   search: true,
      prop: "province",
      cascaderItem: [],
      display: true,
      rules: [
        {
          required: true,
          message: "省份必须选择"
        }
      ],

      props: {
        label: "name",
        value: "id"
      },
      dicUrl: "/admin/common/listCity?pid=0",
      dicFormatter: res => {
        return res.data; //返回字典的层级结构
      },
    //   cascaderItem: ["city", "district"], // 级联选择的字段
    //   row: true
    },
    {
      type: "select",
      label: "城市",
      prop: "city",
    //   search: true,
      display: true,
      rules: [
        {
          required: true,
          message: "城市必须选择"
        }
      ],
    //   props: {
    //     label: "name",
    //     value: "id"
    //   },
      slot: true,
      formslot: true,
    },
    {
      type: "select",
      label: "区域",
    //   search: true,
      prop: "district",
      display: true,
      rules: [
        {
          required: true,
          message: "区域必须选择"
        }
      ],

      slot: true,
      formslot: true
    },

    {
      type: "input",
      label: "门店名称",
      prop: "shopName",
    //   search: true,
      display: true,
      rules: [
        {
          required: true,
          message: "门店名称必须填写"
        }
      ]
    },
    {
      type: "input",
      label: "门店地址",
      prop: "address",
      overHidden:true,
      rules: [
        {
          required: true,
          message: "门店地址必须填写"
        }
      ]
    },
    {
      type: "input",
      label: "联系人",
      prop: "shopUser",
      rules: [
        {
          required: true,
          message: "联系人必须填写"
        }
      ]
    },
    {
      type: "input",
      label: "联系方式",
      prop: "shopPhone",
      rules: [
        {
          required: true,
          message: "联系方式必须填写"
        }
      ]
    }
  ],
  labelPosition: "left",
  labelSuffix: ":",
  labelWidth: 120,
  gutter: 0,
  menuBtn: true,
  submitBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  submitText: "提交",
  emptyBtn: true,
  emptyText: "清空",
  menuPosition: "center",
  border: true,
  index: true,
  indexLabel: "序号",
  // stripe: false,
//   menuAlign: "center",
  align: "center",
  searchMenuSpan: 24,
  searchSpan: 4
};
