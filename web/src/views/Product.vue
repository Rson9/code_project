<template>
  <div>

    <el-carousel
      height="calc(100vh - 59px)"
      direction="vertical"
      :autoplay="false"
      v-if="looplist.length"
    >

      <el-carousel-item
        v-for="item in looplist"
        :key="item._id"
      >

        <img
          :src="getImageSrc(item)"
          class="item"
        >


        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h2>
                {{ item.title }}
              </h2>
            </div>
          </template>
          <div>{{ item.introduction }}</div>
          <div class="detail">{{ item.detail }}</div>
          <div class="more">更多信息请访问：<br> <a href="http://abc:8080"> http://abc:8080</a></div>
        </el-card>

      </el-carousel-item>
    </el-carousel>
    <el-empty
      description="暂无产品"
      v-else
    />

  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
const looplist = ref([])
onMounted(async () => {
  const res = await axios.get(`/webapi/product/list`)
  looplist.value = res.data.data

})
const getImageSrc = (data) => `http://localhost:3000${data.cover}`


</script>
<style scoped lang="scss">
.item {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.box-card {
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);

  .detail .more {
    margin-top: 20px;
  }
}
</style>