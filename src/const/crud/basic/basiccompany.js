export const tableOption = {
  column: [
    {
      type: "input",
      label: "公司名称",
      prop: "cname",
      display: true,
      required: true,
      rules: [
        {
          required: true,
          message: "公司名称必须填写"
        }
      ]
    },
    {
      type: "input",
      label: "公司地址",
      prop: "caddr",
      rules: []
    },
    {
      type: "input",
      label: "负责人",
      prop: "manager"
    },
    {
      type: "input",
      label: "联系电话",
      prop: "phone"
    },
    {
      type: "input",
      label: "公司账户",
      prop: "account",
      display: true,
      required: false,
      rules: []
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
  labelWidth: 120,
  gutter: 0,
  menuBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  submitBtn: true,
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
  searchMenuSpan: 6
};
