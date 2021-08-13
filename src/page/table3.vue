<template>
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
                  <div class="user" v-for="monthLength in fillData(1, 2)">
                    <!-- v-for="(monthLength, i) in 31"
                    :key="monthLength" -->
                    <div class="peopleNum">人数：12</div>

                    <!-- <template
                      v-for="(clientUser, index) in storeItem.workMap[
                        storeItem['shopId']
                      ]"
                      
                    > -->
                    <!-- {{clientUser.date}} -->
                    <!-- clientUser.clientMap[clientUser['date']] -->
                    <!-- {{ monthLength }} -->
                    <!-- {{monthLength.clientMap}} -->
                    <ul
                      class="user_con"
                      v-for="(user, userIndex) in monthLength.clientMap[
                        monthLength['date']
                      ](Math.ceil(Math.random()*2))"
                    >
                      <li :key="'user' + getRandom()">
                        {{ user.clientUserName }}
                        <!-- {{
                            clientUser.date.split("-")[2] == i + 1
                              ? user.clientUserName
                              : ""
                          }} -->
                      </li>
                    </ul>
                    <!-- </template> -->
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["works", "brandMap"],
  data() {
    return {};
  },
  methods: {
    getRandom() {
      return (Math.random() * 1000000).toString(16);
    },
    fillData() {
      const newArr = new Array(3).fill({
        clientUserId: "",
        clientUserName: "1",
        workCount: 1
      });
      return (function() {
        const date = [];
        for (let i = 1; i < 32; i++) {
          date.push({
            date: "2021-07-" + (i < 10 ? "0" + i : i),
            count: 1,
            clientMap: {
              ["2021-07-" + (i < 10 ? "0" + i : i)](index) {
               return newArr.map((item, i) => {
                  if (i == index) {
                    return {
                      clientUserId: "dfs",
                      clientUserName: "1234567890",
                      workCount: 1
                    };
                  }
                  return item;
                });
              }
            }
          });
        }
        return date;
      })();
    }
  }
};
</script>

<style lang="less" scoped>
@color: red;
@areaWidth: 150px;
@userWidth: 130px;
@userHeight: 50px;
@peopleNumHeight: 20px;
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
  font-size: 16px;
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
  border-bottom: 0px solid @color;
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
  text-align: center;
  display: inline-block;
}
.table_content li {
  list-style: none;
}

.table_content p {
  width: @areaWidth;
}

.area {
  border: 1px solid @color;
  border-bottom: 0px solid @color;
}

.user {
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
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
  width: @userWidth;
  line-height: @peopleNumHeight;
}
.peopleNum:not(:first-child) {
  border-top: 1px solid @color;
}
</style>
