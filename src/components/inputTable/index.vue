<template>
  <div class="input-table-container">
      <input type="text" :disabled='isInputDisabled' v-model="inputData" @focus="handleFocus()">
  </div>
</template>

<script>
export default {
    data(){
        return {
            inputData:0,
            isInputDisabled:false
        }
    },
    methods:{
        handleFocus(){
            console.log(12345)
            // this.isInputDisabled =true
            this.$emit("handleFocus")
        }
    }
}
</script>

<style lang="less" scoped>
.input-table-container{
    z-index: 999;
}
</style>