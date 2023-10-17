<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    :action="uploadUrl"
    :accept="videoType"
    :max-count="maxUploadCount"
    @change="handleChange"
  >
    <a-button>
      上传视频
    </a-button>
  </a-upload>
</template>
<script setup>
import Cookies from 'js-cookie';
import { message } from 'ant-design-vue';

const uploadUrl = `${import.meta.env.VITE_PROXY_DOMAIN_REAL}/upload/file?token=${Cookies.get('MEMBER_TOKEN')}`;

const videoType = '.avi,.mov,.rmvb,.rm,.FLV,.mp4,.3GP';

const emits = defineEmits(['update:value', 'fileList']);

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  maxUploadCount: {
    type: Number,
    default: 1
  }
});

const { value } = toRefs(props);

const handleChange = (info) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    const { fileList } = info;
    const newFileList = [];
    fileList.forEach((item) => {
      if (item.response) {
        newFileList.push(item.response.data.src);
      }
    });
    emits('update:value', newFileList.join(';'));
    emits('fileList', newFileList);
    message.success(`${info.file.name} 上传成功.`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上传失败.`);
  }
};
const fileList = ref([]);

watch(value, (newValue) => {
  if (newValue) {
    const newFileList = [];
    const video = newValue.split(';');
    for (let i = 0; i < video.length; i++) {
      const file = {
        uid: (i + 1).toString(),
        name: (i + 1).toString(),
        status: 'done',
        url: video[i].toString()
      };
      newFileList.push(file);
    }
    fileList.value = newFileList;
  } else {
    fileList.value = [];
  }
}, { immediate: true });

</script>
