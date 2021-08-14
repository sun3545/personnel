<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.showText .menual_main_header .avue-form__group {
  padding-top: 29px;
}
.menual_main_header .avue-form__menu--center {
  width: 22% !important;
  margin-bottom: 0px !important;
  padding-top: 0;
}

.avue-tags {
  z-index: 0;
}

.content_row li .el-input__inner {
  width: 100%;
  border: 0px solid;
  padding: 0 !important;
  text-align: center !important;
}

.el-table__body tr.current-row > td {
  background-color: rgba($color: #f56c6c, $alpha: 0.5) !important;
}

// .el-table__row{
//    background: linear-gradient(left, #3a90f5 0%, #4bc9fd 100%)!important;
//    transform-style:normal !important;
// }
// .el-table--enable-row-transition .el-table__body td {
//     transition: background-color 2.25s ease!important;
// }
</style>
