<template>
  <el-row>
    <el-col
      :span="17"
      :offset="1"
    >
      <h2>{{ currentNews.title }}</h2>
      <div class="time">{{ momentTime.getTime(currentNews.editTime) }}</div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="currentNews.content">
      </div>
    </el-col>

    <el-col
      :span="4"
      :offset=1
      :pull="1"
    >
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
          </div>
        </template>
        <p
          v-for="item in topNews"
          :key="item._id"
          class="text item"
          style="padding: 14px;"
          @click="handleChange(item._id)"
        >
          <span>{{ item.title }}</span>
        <div class="bottom">
          <time class="time"> {{ momentTime.getTime(item.editTime) }}</time>
        </div>
        </p>
      </el-card>
    </el-col>

  </el-row>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import momentTime from '@/util/momentTime'
import { StarFilled } from '@element-plus/icons-vue'
const route = useRoute()
const currentNews = ref({})
const topNews = ref([])
onMounted(async () => {
  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`)

  topNews.value = res2.data.data


  currentNews.value = res1.data.data[0];
})
const router = useRouter()
watch(() => route.params.id, (to, from) => {
  if (to != from) {
    router.go(0)
  }
})
const handleChange = id => {
  router.push(`/news/${id}`)

}
</script>


<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}

.time {
  font-size: 13px;
  color: gray;

}
</style>