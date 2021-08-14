export const tableOption = {
  column: [
    {
      type: 'input',
      label: '品牌名称',
      prop: 'name',
      search:true,
      display: true,
      required: true,
      rules: [
        {
          required: true,
          message: '品牌名称必须填写'
        }
      ]
    },
    {
      type: 'input',
      label: '备注',
      prop: 'notes',
      rules: []
    }
  ],
  labelPosition: 'left',
  labelSuffix: ': ',
  labelWidth: 120,
  gutter: 0,
  menuBtn: true,
  submitBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  submitText: '提交',
  emptyBtn: true,
  emptyText: '暂无数据',
  menuPosition: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: false,
//   menuAlign: 'center',
  align: 'center',
  searchMenuSpan: 6
}
