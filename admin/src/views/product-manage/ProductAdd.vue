<template>
  <div>
    <el-card>
      <el-page-header
        content="添加产品"
        icon=""
        title="产品管理"
      />

      <el-form
        ref="productFormRef"
        :model="productForm"
        :rules="productFormRules"
        label-width="auto"
        class="demo-ruleForm"
      >

        <el-form-item
          label="产品名称"
          prop="title"
        >
          <el-input v-model="productForm.title" />
        </el-form-item>

        <el-form-item
          label="产品简要描述"
          prop="introduction"
        >
          <el-input
            v-model="productForm.introduction"
            type="textarea"
          />
        </el-form-item>

        <el-form-item
          label="产品详细描述"
          prop="detail"
        >
          <el-input
            v-model="productForm.detail"
            type="textarea"
          />
        </el-form-item>

        <el-form-item
          label="产品图片"
          prop="cover"
        >
          <Upload
            :avatar="productForm.cover"
            @kerwinchange="handleChange"
          />
        </el-form-item>

        <el-button
          type="primary"
          @click="submitForm()"
        >
          添加产品
        </el-button>

      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'
const productFormRef = ref()
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
})
const productFormRules = reactive({
  title: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入简要描述', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请选择详细描述', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请上传产品图片', trigger: 'blur' },
  ],
})

//选择图片后的回调
const handleChange = file => {
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}

const router = useRouter()
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      //提交
      await upload("/adminapi/product/add", productForm)
      router.push(`/product-manage/productlist`)
    }
  })
}
</script>


<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>