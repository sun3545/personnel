export const tableOption = {
  column: [
    {
      type: "select",
      label: "省份",
      prop: "province",
      cascaderItem: [],
      display: true,
      slot: true,
      // formslot:true,
      props: {
        label: "name",
        value: "id"
      },
      dicUrl: "/admin/common/listCity?pid=0",
      dicMethod: "get"
    },
    {
      type: "select",
      label: "城市",
      prop: "city",
      display: true,
      slot: true
    },
    {
      type: "select",
      label: "区域",
      prop: "district",
      display: true,
      slot: true
    },
    {
      label: "日期",
      prop: "date",
      type: "date",
      span: 12,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      mock: {
        type: "datetime",
        format: "yyyy-MM-dd"
      }
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
