export const tableOption = {
  column: [
    {
      type: "input",
      label: "昵称",
      prop: "name",
      search:true,
      display: true,
      required: true,
      rules: [
        {
          required: true,
          message: "昵称必须填写"
        }
      ]
    },
    {
      type: "input",
      label: "备注",
      display: true,
      overHidden:true,
      prop: "remark"
    },
    {
      type: "select",
      label: "性别",
      prop: "sex",
      search:true,
      rules: [],
      slot:true,
      dicData: [
        {
          label: "男",
          value: 1
        },
        {
          label: "女",
          value: 2
        }
      ],
      cascaderItem: [],
      display: true
    },
    {
      type: "input",
      label: "联系电话",
      prop: "phone",
      display: true
    },
    {
      type: "select",
      label: "省份",
      prop: "province",
      cascaderItem: [],
      display: true,
      slot: true,
      props: {
        label: "name",
        value: "id"
      },
      dicUrl: "/admin/common/listCity?pid=0",
      dicMethod: "get"
      //   cascaderItem: ['city', 'district'], // 级联选择的字段
    },
    {
      type: "select",
      label: "城市",
      prop: "city",
      display: true,
      slot: true,
      formslot: true
      //   props: {
      //     label: 'name',
      //     value: 'id'
      //   },
      //   dicUrl: '/admin/common/listCity?pid={{province}}',
    },
    {
      type: "select",
      label: "区域",
      prop: "district",
      display: true,
      slot: true,
      formslot: true
      //   props: {
      //     label: 'name',
      //     value: 'id'
      //   },
      //   dicUrl: '/admin/common/listCity?pid={{city}}',
    },
    {
      type: "input",
      label: "住址",
      prop: "address"
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
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
  stripe: false,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 6
};
