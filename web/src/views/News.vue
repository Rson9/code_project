<template>
  <div class="container">
    <img
      class="news-header"
      src="@/assets/newsbg.jpg"
    >

    <div class="search">
      <el-popover
        placement="bottom"
        title="检索结果"
        width="50%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchnewslist.length">
          <div
            v-for="data in searchnewslist"
            :key="data._id"
            class="search-item"
            @click="handleChangepage(data._id)"
          >{{
            data.title }}</div>
        </div>
        <div v-else>
          <el-empty
            description="暂无新闻"
            :image-size="50"
          ></el-empty>
        </div>
      </el-popover>
    </div>

    <div class="topnews">
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="item in topNewsList"
          :key="item._id"
        >
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click="handleChangepage(item._id)"
          >
            <img
              :src="getImageSrc(item)"
              style="width: 100%"
              class="image"
            />
            <div style="padding: 14px;">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time"> {{ momentTime.getTime(item.editTime) }}</time>
              </div>

            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-tabs
      style="margin: 20px;"
      v-model="whitchTab"
      class="demo-tabs"
    >

      <el-tab-pane
        :key="item.name"
        v-for="item in tablist"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div
              :key="data._id"
              v-for="data in tabnews[item.name]"
              style="padding: 10px;"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                shadow="hover"
                @click="handleChangepage(data._id)"
              >
                <img
                  :src="getImageSrc(data)"
                  class="tab-image"
                />
                <div style="padding: 14px;float: left;">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="time"> {{ momentTime.getTime(data.editTime) }}</time>
                  </div>

                </div>
              </el-card>
            </div>
          </el-col>


          <el-col :span="6">
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(data, index) in tabnews[item.name]"
                :key="index"
                :timestamp="momentTime.getTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>

        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :visibility-height="100" />
  </div>

</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import momentTime from '@/util/momentTime'
import _ from 'lodash'
const searchText = ref("")
const visible = ref(false)
const newslist = ref([])
const whitchTab = ref(1)
onMounted(async () => {
  const res = await axios.get("/webapi/news/list")
  newslist.value = res.data.data

})
const searchnewslist = computed(() => searchText.value ?
  newslist.value.filter(items => items.title.includes(searchText.value)) : []
)
const topNewsList = computed(() =>
  newslist.value.slice(0, 4)
)

const getImageSrc = item => `http://localhost:3000${item.cover}`
const tablist = [
  {
    label: "最新动态",
    name: 1
  },
  {
    label: "典型案例",
    name: 2
  },
  {
    label: "通知公告",
    name: 3
  }
]
const tabnews = computed(() => _.groupBy(newslist.value, item => item.category))
const router = useRouter()
const handleChangepage = id => {
  router.push(`/news/${id}`)

}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}

.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;

  .el-input {
    width: 50%;
  }


}

.search-item {
  height: 50px;
  line-height: 50px;

  &:hover {
    background: whitesmoke;
    color: red;
  }
}

.topnews {
  margin: 20px;

  .image {
    background-size: cover;
  }
}

.time {
  font-size: 13px;
  color: gray;

}

.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
</style>