<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import type { MarkerFormData } from '@/types/type'
import catalogData from '@/mocks/catalog-data'
import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()

const props = defineProps<{
  modelValue: boolean
  coordinates: { x?: number | undefined, y?: number | undefined } | null
  gameMapId: number
  gameMapName: string
}>()
const visible = defineModel('modelValue', { type: Boolean, default: false })

const emit = defineEmits(['update:modelValue', 'submit'])

const formRef = ref<FormInstance>()
const form = reactive<MarkerFormData>({
  name: '',
  description: '',
  landmark: {
    name: '',
    iconUrl: '',
    id: {}
  },
  x: 0,
  y: 0,
  z:400,
  iconUrl: '/YunInteractMap/icons/origin_8204994_925852.png', // 默认图标
  gameMapId: props.gameMapId,
  gameMapName: props.gameMapName
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入标记点名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入描述信息', trigger: 'blur' }
  ],
  landmark: [
    { required: true, message: '请选择标记点类型', trigger: 'change' }
  ]
}

// 监听坐标变化
watch(() => props.coordinates, (newVal) => {
  if (newVal) {
    form.x = newVal.x || 0
    form.y = newVal.y || 0
  }
})

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  
  await formEl.validate((valid, fields) => {
    if (valid) {
      const id = form.landmark?.id[commonStore.mapId]
      const markerData = {
        ...form,
        createTime: new Date().toISOString(),
        createUserName: '用户', 
        iconSelectedUrl: form.landmark?.iconUrl,
        landmarkCatalogGroupName: form.landmark?.name,
        landmarkCatalogId: id,
        landmarkCatalogType: 0,
      }
      emit('submit', markerData)
      emit('update:modelValue', false)
      formEl.resetFields()
    }
  })
}

// 关闭弹窗
const handleClose = () => {
  formRef.value?.resetFields()
  emit('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    top="20vh"
    title="添加标记点"
    v-model="visible"
    width="500px"
    :close-on-click-modal="false"
    @close="handleClose"
    style="background-color: #17171a;"
    class="marker-form"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="right"
    >
      <el-form-item label="坐标" prop="coordinates">
        <el-input 
          :model-value="`X: ${form.x.toFixed(4)}, Y: ${form.y.toFixed(4)}`"
          disabled
        />
      </el-form-item>

      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入标记点名称"/>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述"/>
      </el-form-item>
      

      <el-form-item label="类型" prop="landmark">
        <div class="selected">
          <img :src="form.landmark?.iconUrl" alt="">{{ form.landmark?.name }}
        </div>
        <div class="mark-list" v-for="it in catalogData" :key="it.groupName">
          <p class="mark-groupName" >{{ it.groupName }}</p>
          <div class="icon-list" v-for="item in it.catalogs" :key="item.name" @click="form.landmark = item">
            <div class="icon-item flex-center">
              <img :src="item.iconUrl" alt=""/>{{ item.name }}
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div class="footer">
      <div class="footer-button" @click="submitForm(formRef)">添加标点</div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.marker-form {
  :deep(.el-dialog__header) {
    color: #fff !important;
  }
  :deep(.el-dialog__body){
    color: #fff!important;
  }
  :deep(.el-dialog__title){
    color: #fff!important;
  }
  :deep(.el-input__wrapper){
    background-color: #222226 !important;
  }
  .selected{
    width: 100%;
    height: 32px;
    display: flex;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgb(228 231 237) inset;
    padding: 1px 11px;
    border-radius: 4px;
  }
  .mark-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .mark-groupName{
      width: 100%;
    }
    .icon-list {
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      .icon-item{
        margin-right: 10px;
        img {
          width: 30px;
          height: 30px;
          margin-right: 2px;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 20px;
    .footer-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #b09971;
      color: #222222;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: #d7bb8b;
      }
    }
  }
}
</style>