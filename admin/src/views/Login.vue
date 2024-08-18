<template>
  <div id="app">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        style="max-width: 400px"
        :model="loginForm"
        status-icon
        :rules="loginrules"
        label-width="auto"
        class="loginform"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="loginForm.username"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm()"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { loadSlim } from 'tsparticles-slim' // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadSlim(engine)
}
const loginForm = reactive({
  username: '',
  password: ''
}) // 绑定的响应式对象
const loginFormRef = ref()

const loginrules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})
const router = useRouter()
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    console.log(valid)
    if (valid) {
      axios.post('/adminapi/user/login', loginForm).then(res => {

        if (res.data.ActionType === 'OK') {
          store.commit("changeUserInfo", res.data.data)
          router.push('/index')
        } else {
          ElMessage.error('用户名和密码不匹配')
        }
      })
    }
  })
}

// 粒子库 options 配置
const options = {
  background: {
    color: {
      value: '#2d3a4b'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 1,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  detectRetina: true
}
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
  padding: 20px;
}

.formContainer::v-deep(.el-form-item__label) {
  color: white;
}
.el-button {
  margin: auto;
}
h3 {
  font-size: 30px;
}
.loginform {
  margin-top: 30px;
}
</style>

