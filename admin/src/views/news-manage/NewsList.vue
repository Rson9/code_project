<template>
  <div>
    <el-card>
      <el-page-header
        content="新闻列表"
        icon=""
        title="新闻管理"
      />

      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          prop="title"
          label="标题"
        />
        <el-table-column label="分类">
          <template #default="scope">
            {{categoryFormat(scope.row.category)}}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            {{formatTime.getTime(scope.row.editTime)}}
          </template>
        </el-table-column>

        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value=1
              :inactive-value=0
              @change='hangleSwitchChange(scope.row)'
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip
              content="预览"
              placement="top"
            >
              <el-button
                circle
                :icon="View"
                @click="handlePreview(scope.row)"
              />
            </el-tooltip>

            <el-tooltip
              content="编辑"
              placement="top"
            >
              <el-button
                circle
                :icon="Edit"
                @click="handleEdit(scope.row)"
              />
            </el-tooltip>

            <el-tooltip
              content="删除"
              placement="top"
            >
              <el-button
                circle
                :icon="Delete"
                @click="newsdelete(scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="预览"
      width="500"
    >
      <div>
        <h2>{{previewData.title}} </h2>
        <div style="font-size:12px;color:gray">
          {{formatTime.getTime(previewData.editTime)}}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>

        <div
          v-html="(previewData.content)"
          class="htmlcontent"
        >
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import formatTime from '@/util/formatTime'
import { View, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  getTableData()
})
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
const getTableData = async () => {
  const res = await axios.get(`/adminapi/news/list`)
  //   console.log(res.data.data);
  tableData.value = res.data.data

}
const categoryFormat = (category) => {
  const options = ['最新动态', '典型案例', '通知公告']
  return options[category - 1]
}

//开关回调
const hangleSwitchChange = async (item) => {
  //   console.log(item);
  await axios.put(`/adminapi/news/publish`, {
    _id: item._id,
    isPublish: item.isPublish
  })
  await getTableData()
}


//预览回调
const handlePreview = (data) => {
  // console.log(data);
  previewData.value = data

  dialogVisible.value = true
}

const newsdelete = data => {
  ElMessageBox.confirm(
    '你确认要删除文章吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await axios.delete(`/adminapi/news/list/${data._id}`)
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
      await getTableData()

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const handleEdit = (item) => {
  router.push(`/news-manage/editnews/${item._id}`)
}
</script>


<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
::v-deep .htmlcontent {
  img {
    max-width: 100%;
  }
}
</style>
