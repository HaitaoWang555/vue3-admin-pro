<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
        <h2 class="my-4">你没有权限去该页面</h2>
        <h6 class="my-4">如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard"> 回首页 </router-link>
          </li>
          <li class="link-type">
            <a href="https://www.taobao.com/">随便看看</a>
          </li>
          <li>
            <a href="#" @click.prevent="dialogVisible = true">点我看图</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
    <ProDialog
      v-model:value="dialogVisible"
      :append-to-body="false"
      title="随便看"
      :no-footer="true"
    >
      <img :src="ewizardClap" class="pan-img" />
    </ProDialog>
  </div>
</template>

<script>
import errGifUrl from '@/assets/401_images/401.gif'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Page401',
  setup() {
    const errGif = ref(errGifUrl)
    const ewizardClap = ref(
      'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
    )
    const dialogVisible = ref(false)

    const router = useRouter()
    const route = useRoute()

    function back() {
      if (route.query.noGoBack) {
        router.push({ path: '/dashboard' })
      } else {
        router.go(-1)
      }
    }

    return {
      errGif,
      ewizardClap,
      dialogVisible,
      back,
    }
  },
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
