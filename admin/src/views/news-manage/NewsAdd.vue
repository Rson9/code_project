<template>
  <div>
    <el-card>
      <el-page-header
        content="创建新闻"
        icon=""
        title="新闻管理"
      />

      <el-form
        ref="newsFormRef"
        :model="newsForm"
        :rules="newsFormRules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="newsForm.title" />
        </el-form-item>

        <el-form-item
          label="内容"
          prop="content"
        >
          <editor @event="handleChange" />
        </el-form-item>
        <el-form-item
          label="类别"
          prop="category"
        >
          <el-select
            v-model="newsForm.category"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="封面"
          prop="cover"
        >
          <Upload
            :avatar="newsForm.cover"
            @kerwinchange="coverhandleChange"
          />
        </el-form-item>

        <el-button
          type="primary"
          @click="submitForm()"
        > 添加新闻 </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import editor from '@/components/editor/Editor';
import Upload from '@/components/upload/Upload';
import upload from '@/util/upload';
import { useRouter } from 'vue-router';
const router = useRouter();
const newsFormRef = ref();
const newsForm = reactive({
  title: '',
  content: '',
  category: 1, //1最新动态  2典型案例   3通知公告
  cover: '',
  file: null,
  isPublish: 0, //0未发布  1已发布
});

const newsFormRules = reactive({
  title: {
    required: true,
    message: '请输入标题',
    trigger: 'blur',
  },
  content: {
    required: true,
    message: '请输入内容',
    trigger: 'blur',
  },
  category: {
    required: true,
    message: '请输入类别',
    trigger: 'blur',
  },
  cover: {
    required: true,
    message: '请输入标题',
    trigger: 'blur',
  },
});

const handleChange = (data) => {
  console.log(data);
  newsForm.content = data;
};

const coverhandleChange = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};

const options = [
  {
    label: '最新动态',
    value: 1,
  },
  {
    label: '典型案例',
    value: 2,
  },
  {
    label: '通知公告',
    value: 3,
  },
];

const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(newsForm);
      await upload('/adminapi/news/add', newsForm);
      router.push('/news-manage/newslist');
    }
  });
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
