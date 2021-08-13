<template>
  <div class="scroll_wrapper">
    <div class="table_container">
      <div class="table_header">
        <div class="fixed_w">区域</div>
        <div class="fixed_w">品牌</div>
        <div class="fixed_w">门店</div>
        <div v-for="(item, index) in works" :key="index">
          <p>{{ item.date }}</p>
          <p>{{ item.week }}</p>
        </div>
      </div>
      <ul class="table_content">
        <li class="disFlex area" v-for="(item, area) in brandMap" :key="area">
          <p>{{ area }}</p>
          <ul>
            <li v-for="(brandItem, brand) in item" :key="brand">
              <div class="brand ">
                <p>{{ brandItem.brandName }}</p>
                <ul class="">
                  <li
                    class="disFlex store"
                    v-for="(storeItem, store) in brandItem.shopMap[
                      brandItem.brandId
                    ]"
                    :key="store"
                  >
                    <p>{{ storeItem.shopName }}</p>
                    
                      <div class="user"
                        v-for="clientUserId in storeItem.workMap[
                          storeItem['shopId']
                        ]"
                      >
                      <div class="peopleNum">
                        {{clientUserId.count?clientUserId.count:""  }}
                      </div>
                        <ul
                          class="user_con"
                          v-for="user in clientUserId.clientMap[
                            clientUserId['date']
                          ]"
                        >
                          <li>
                            {{
                                 user.clientUserName
                            }}
                            <span style="color:red;">{{user.workCount?user.workCount:""}}</span>
                          </li>
                        </ul>
                      </div>
                    <!-- <div
                      class="user"
                      v-for="(monthLength, i) in works.length"
                      :key="monthLength"
                    >
                      {{storeItem}}
                      <div class="perpleNum">
                        {{ filterDate(storeItem)[0].count }}
                      </div>
                      <template
                        v-for="clientUserId in storeItem.workMap[
                          storeItem['shopId']
                        ]"
                      >
                        <ul
                          class="user_con"
                          v-for="user in clientUserId.clientMap[
                            clientUserId['date']
                          ]"
                        >
                          <li>
                            {{
                              clientUserId.date.split("-")[2] == i + 1
                                ? user.clientUserName
                                : ""
                            }}
                          </li>
                        </ul>
                      </template>
                    </div> -->
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["works", "brandMap"],
  data() {
    return {
      oldData: []
    };
  },

  methods: {
    getRandom() {
      return (Math.random() * 1000000).toString(16);
    },
    filterDate(value) {
      var one = value.workMap[value["shopId"]];
      return one;
    }
  }
};
</script>

<style lang="less" scoped>
@color: gray;
@areaWidth: 150px;
@userWidth: 130px;
@userHeight: 30px;
@peopleNumHeight: 30px;
.workCount {
  color: red;
}
*,
:after,
:before {
  -webkit-box-sizing: content-box !important;
  box-sizing: content-box !important;
}
ul,
li,
div,
p {
  padding: 0;
  margin: 0;
}
.table_container {
  //   overflow: hidden;
  //   position: relative;
  height: 100%;
  font-size: 16px;
}
.scroll_wrapper {
  //   padding-top: 74px;
  //   position: relative;
  //   overflow: scroll;
  padding: 10px 10px 0;
  height: 100%;
  margin-bottom: -19px;
  margin-right: -19px;
}
.table_content .area:last-child {
  border-bottom: 1px solid @color;
}
.table_header {
  display: flex;
}
.table_header div {
  flex: 0 0 auto;
  width: @userWidth;
  line-height: 60px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid @color;
  border-bottom: 1px solid @color;
  border-right: 0px;
}
.table_header div:last-child {
  border-right: 1px solid @color;
}
.fixed_w {
  width: @areaWidth !important;
}
.table_header div > p:not(:nth-child(1)) {
  border-top: 1px solid @color;
}

.table_header div > p {
  line-height: 30px;
}

.disFlex {
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  border-bottom: 1px solid @color;
  border-left: 1px solid @color;
}

.brand:last-child {
  border-bottom: 0px solid @color;
}

.table_content {
  padding-bottom: 20px;

  text-align: center;
  display: inline-block;
}
.table_content li {
  list-style: none;
  overflow: hidden;
}

.table_content p {
  width: @areaWidth;
}

.area {
  border: 1px solid @color;
  border-bottom: 0px solid @color;
}

.user {
  width: 130px;
  border-left: 1px solid @color;
}

.user_con > li {
  border-top: 1px solid @color;
  width: @userWidth;
  height: @userHeight;
  line-height: @userHeight;
}

.store {
  border-left: 1px solid @color;
}

.store:not(:first-child) {
  border-top: 1px solid @color;
}
.peopleNum {
  height: @peopleNumHeight;
  line-height: @peopleNumHeight;
}
.peopleNum:not(:first-child) {
  border-top: 1px solid @color;
}
</style>
