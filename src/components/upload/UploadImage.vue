<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      :action="uploadUrl"
      list-type="picture-card"
      :accept="imgType"
      :before-upload="beforeUploadHandle"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 8">
        <div style="margin-top: 8px">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        alt="example"
        style="width: 100%"
        :src="previewImage"
      >
    </a-modal>
  </div>
</template>
<script setup>
import Cookies from 'js-cookie';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const emits = defineEmits(['update:value', 'fileList']);

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  maxUploadCount: {
    type: Number,
    default: 9
  },
  maxSize: {
    type: Number,
    default: 2048
  },
  imgType: {
    type: String,
    default: '.jpg,.png,.jpeg'
  }
});

const { imgType, maxSize, value } = toRefs(props);

const uploadUrl = `${import.meta.env.VITE_PROXY_DOMAIN_REAL}/upload/file?token=${Cookies.get('MEMBER_TOKEN')}`;

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([]);
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const beforeUploadHandle = (file) => {
  const isLt2M = file.size / 1024 < maxSize.value;
  if (!isLt2M) {
    console.error(`文件大小不能超过${maxSize.value / 1024}MB!`);
  }
  return isLt2M;
};

const handleChange = ({ fileList }) => {
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].response && fileList[i].response.code === 0) {
      fileList[i].url = fileList[i].response.data.src;
    }
  }
  // 类型不符合要求，移除元素 -----------------------------------------------------------------
  for (let index = fileList.length; index >= 0; index--) {
    if (
      (fileList[index] && fileList[index].type && !checkImgType(fileList[index].type))
      || (fileList[index] && fileList[index].size / 1024 > maxSize.value)
    ) {
      fileList.splice(index, 1);
    }
  }
  // -----------------------------------------------------------------------------------------
  // 判断fileList中每个item的url是否存在，当都存在时，说明上传完成，此时将fileList中的url提取出来传递给父组件
  for (let index = 0; index < fileList.length; index++) {
    // 只要存在一个url为空值的情况，就直接返回结束函数
    if (!fileList[index].url) {
      return;
    }
  }
  // 数据回传父组件
  const images = fileList.map((item) => item.url).join(';');
  emits('update:value', images);

  const fileInfoList = fileList.map((file) => ({
    name: file.name.substr(0, file.name.lastIndexOf('.')),
    size: file.size,
    url: file.url,
    suffix: file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length)
  }));
  emits('fileList', fileInfoList);
};

const checkImgType = (type) => {
  const typeArr = imgType.value.split(',');
  for (let i = 0; i < typeArr.length; i++) {
    const imgType = typeArr[i].replace('.', 'image/');
    if (imgType === type) {
      return true;
    }
  }
  console.error('文件类型格式不符合规范');
  return false;
};

watch(value, (newValue) => {
  if (newValue) {
    console.info(newValue);
    const newFileList = [];
    const images = newValue.split(';');
    console.info(images);
    for (let i = 0; i < images.length; i++) {
      const file = {
        uid: (i + 1).toString(),
        name: (i + 1).toString(),
        status: 'done',
        url: images[i].toString()
      };
      newFileList.push(file);
    }
    console.log(newFileList);
    fileList.value = newFileList;
  } else {
    fileList.value = [];
  }
}, { immediate: true });
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
