<template>
  <div>
    <el-card>
      <el-page-header
        content="产品列表"
        icon=""
        title="产品管理"
      />

      <el-table
        :data="tableData"
        style="width: 100%"
      >

        <el-table-column
          prop="title"
          label="产品名称"
        />

        <el-table-column
          label="简要描述"
          prop="introduction"
        />

        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">

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
                @click="productdelete(scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

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
const getTableData = async () => {
  const res = await axios.get(`/adminapi/product/list`)
  //   console.log(res.data.data);
  tableData.value = res.data.data

}



const productdelete = data => {
  ElMessageBox.confirm(
    '你确认要删除产品吗?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await axios.delete(`/adminapi/product/list/${data._id}`)
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
  router.push(`/product-manage/productedit/${item._id}`)
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