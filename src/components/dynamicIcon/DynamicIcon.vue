<template>
  <component
    :is="iconComponent"
    style="margin-right: 10px"
  />
</template>

<script setup>
import {
  HomeOutlined, BarsOutlined, CalendarOutlined, ProjectOutlined, CaretDownOutlined, DownOutlined, UpOutlined, WechatOutlined, IdcardOutlined, PhoneOutlined
} from '@ant-design/icons-vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});

const iconComponent = computed(() => {
  switch (props.type) {
    case 'HomeOutlined':
      return HomeOutlined;
    case 'BarsOutlined':
      return BarsOutlined;
    case 'CalendarOutlined':
      return CalendarOutlined;
    case 'ProjectOutlined':
      return ProjectOutlined;
    case 'CaretDownOutlined':
      return CaretDownOutlined;
    case 'DownOutlined':
      return DownOutlined;
    case 'UpOutlined':
      return UpOutlined;
    case 'wechat':
      return WechatOutlined;
    case 'idcard':
      return IdcardOutlined;
    case 'phone':
      return PhoneOutlined;
    default:
      return HomeOutlined;
  }
});
</script>
