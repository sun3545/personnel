export const  shopSelectProps= {
    label: "shopName",
    value: "id"
}
export const shopColumn = {
    children: {
        border: true,
        column: [{
                label: "门店",
                search: true,
                searchSpan: 6,
                prop: "shopName"
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
                label: "位置",
                prop: "address"
            },
            {
                label: "创建人",
                prop: "shopUser"
            }
        ]
    }
}
// export const shopForm = ""
// export const shopSelectDic= []
export const userSelectProps= {
    label: "name",
    value: "id"
}
export const userColumn= {
    children: {
        border: true,
        column: [{
                label: "姓名",
                prop: "name",
                search: true,
                searchSpan: 6
            },
            {
                label: "备注",
                display: true
            },
            {
                label: "性别",
                prop: "sex"
            },
            {
                label: "联系电话",
                prop: "phone"
            },
            {
                label: "省份",
                prop: "province"
            },
            {
                label: "城市",
                prop: "city"
            },
            {
                label: "区域",
                prop: "district"
            },
            {
                label: "住址",
                prop: "address"
            }
        ]
    }
}
// export const userForm= ""
// export const userSelectDic= []
export const brandSelectProps= {
    label: "name",
    value: "id"
}
export const brandColumn= {
    children: {
        border: true,
        column: [{
                label: "品牌名称",
                prop: "name",
                search: true,
                searchSpan: 24
            },
            {
                label: "备注",
                prop: "notes"
            }
        ]
    }
}
// export const brandForm= ""
// export const brandSelectDic= []
// export const treeForm= ""
// export const treeDic= []
export const treeProps= {
    label: "name",
    value: "id",
    desc: "notes"
}