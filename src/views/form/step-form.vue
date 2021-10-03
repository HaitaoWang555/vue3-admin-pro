<template>
  <div class="app-container">
    <el-card style="width: 850px; margin: auto">
      <el-steps
        :active="active"
        finish-status="success"
        process-status="finish"
        align-center
      >
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <ProForm
        ref="ProForm"
        :form-param="form"
        :form-list="formList"
        :no-footer="true"
        :layout="{ formWidth: '560px', labelWidth: '150px' }"
        style="margin-top: 24px"
        @proSubmit="onSubmit"
      >
        <template #receiver>
          <el-form-item label="收款账户 ：">
            <div class="flex">
              <el-select
                v-model="form.receiverMode"
                placeholder="请选择"
                style="width: 120px; margin-right: 24px"
              >
                <el-option value="alipay">支付宝</el-option>
                <el-option value="bank">银行账户</el-option>
              </el-select>
              <el-input
                v-model="form.receiverAccount"
                placeholder="test@example.com"
              />
            </div>
          </el-form-item>
        </template>
        <template #desinfo>
          <el-alert
            title="确认转账后，资金将直接打入对方账户，无法退回。"
            type="warning"
            style="margin-bottom: 24px"
          />
          <el-descriptions :column="1" border>
            <el-descriptions-item>
              <template #label> 付款账户 </template>
              {{ form.payAccount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> 收款账户 </template>
              {{ form.receiverAccount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> 收款人姓名 </template>
              {{ form.receiverName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> 转账金额 </template>
              {{ form.amount }}
            </el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
        </template>
        <template #result>
          <el-alert
            title="操作成功。"
            type="success"
            style="margin-bottom: 24px"
          />
          <el-descriptions :column="1">
            <el-descriptions-item label="付款账户">
              {{ form.payAccount }}
            </el-descriptions-item>
            <el-descriptions-item label="收款账户">
              {{ form.receiverAccount }}
            </el-descriptions-item>
            <el-descriptions-item label="收款人姓名">
              {{ form.receiverName }}
            </el-descriptions-item>
            <el-descriptions-item label="转账金额">
              {{ form.amount }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
        <template #footerBtn>
          <el-button v-if="active !== 0" :loading="loading" @click="goPrevious"
            >上一步</el-button
          >
          <el-button v-if="active !== 2" :loading="loading" @click="goNext"
            >下一步</el-button
          >
          <el-button
            v-if="active === 2"
            :loading="loading"
            type="primary"
            @click="complete"
            >完成</el-button
          >
        </template>
      </ProForm>
    </el-card>
  </div>
</template>

<script>
import { submit } from '@/api/public'
import { ref, reactive } from 'vue'
import { list } from './columns/step-list'
import Message from 'element-plus/lib/el-message'

export default {
  name: 'StepForm',
  setup() {
    const active = ref(0)
    const loading = ref(false)
    const form = reactive({
      payAccount: '',
      receiverName: '',
      amount: 0,
      password: '',
      receiverAccount: 'test@example.com',
      receiverMode: 'alipay',
    })
    const ProForm = ref()
    const formList = ref([])
    function goPrevious() {
      if (active.value === 0) return
      active.value -= 1
      changeFormList()
    }
    function goNext() {
      if (active.value === 2) return
      handleOk()
    }
    function complete() {
      handleOk()
    }
    function handleOk() {
      ProForm.value.handleSubmit()
    }
    function changeFormList() {
      formList.value = list.filter((i) => i.step === active.value)
    }
    changeFormList()
    function onSubmit(callback) {
      loading.value = true
      submit(form)
        .then((res) => {
          if (active.value === 2) {
            callback('fulfilled')
            active.value = 0
            changeFormList()
          } else {
            active.value += 1
            changeFormList()
          }
          Message({ message: res.msg, type: 'success' })
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      active,
      ProForm,
      loading,
      form,
      formList,
      goNext,
      goPrevious,
      complete,
      changeFormList,
      onSubmit,
    }
  },
}
</script>
