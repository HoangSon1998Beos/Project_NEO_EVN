<template>
  <v-breadcrumbs :items="dataBreadCrumb" style="margin-left:40px; font-size: smaller">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <div class="layout">
    <div class="flex gap-4 pr-8 pb-4 pl-8">
      <div class="search-custom" style="width: 65%">
        <SearchCustomer :items="items" @exportData="exportData"/>
      </div>
      <div class="file-custom" style="width: 35%">
        <FileCustomer/>
      </div>
    </div>
    <div class="px-8">
      <DataCustomer v-model:items="items" v-model:id-array="idArray"/>
    </div>
  </div>
</template>

<script>
import SearchCustomer from "../../components/customer/SearchCustomer.vue";
import FileCustomer from "../../components/customer/FileCustomer.vue";
import DataCustomer from "../../components/customer/DataCustomer.vue";
import { exportDataExcel } from '../../ExportExcel.js';
import Api from "../../api/api.js";

export default {
  name: "ListCustomer",
  components: {DataCustomer, FileCustomer, SearchCustomer},
  data() {
    return {
      exportDataExcel,
      idArray: [],
      dataBreadCrumb: [
        {
          title: "Trang chủ",
          disabled: false,
          href: "home",
        },
        {
          title: "Quản trị hệ thống",
        },
        {
          title: "Quản lý khách hàng",
        },
      ],
      items: [],
      header: [
        { text: 'STT', value: 'id' },
        { text: 'Mã khách hàng', value: 'cusCode' },
        { text: 'Họ và tên', value: 'cusName' },
        { text: 'Số điện thoại', value: 'cusPhoneNumber' },
        { text: 'Email', value: 'cusEmail' },
        { text: 'Địa chỉ sử dụng dịch vụ', value: 'cusAddress' },
        { text: 'ID Zalo', value: 'idChannelChatZalo' },
        { text: 'Đăng ký nhận thông báo Zalo', value: 'cusNotiChannelChatZalo' },
        { text: 'ID Facebook', value: 'idChannelChatMess' },
        { text: 'Đăng ký nhận thông báo Facebook', value: 'cusNotiChannelChatMess' },
        { text: 'Loại khách hàng', value: 'cusTypesName' },
      ],
      data: []
    }

  },
  async created() {
    this.data = await this.getInfoUser();
  },
  methods: {
    async getInfoUser() {
      return  await Api.person.indexWidthPath(`customer/export`);
    },

    exportData() {
      console.log('this.data',this.data);
      const data = this.data.data.content.filter(item => this.idArray.includes(item['id']));
      console.log('data', data);
      let dataExport = data.map(item => {
        let cusNotiChannelChatZalo = '';
        let cusNotiChannelChatMess = '';
        console.log('item.zaloInfos', item);
        if(item.zaloInfos[0].cusNotiChannel === '1'){
          cusNotiChannelChatZalo = 'Có';
        } else {
          cusNotiChannelChatZalo = 'Không';
        }

        if(item.messInfos[0].cusNotiChannel === '1'){
          cusNotiChannelChatMess = 'Có';
        } else {
          cusNotiChannelChatMess = 'Không';
        }
        return {
          ...item,
          cusNotiChannelChatZalo : cusNotiChannelChatZalo,
          cusNotiChannelChatMess : cusNotiChannelChatMess,
          idChannelChatZalo : item.zaloInfos[0].idChannelChat,
          idChannelChatMess : item.messInfos[0].idChannelChat,
          cusTypesName: item.cusTypes[0].typeName
        };
      });

      console.log('dataExport',dataExport);
      this.exportDataExcel(dataExport, this.header);
    }
  }
}
</script>

<style scoped>
:deep(.v-application__wrap) {
  min-height: 0;
}
</style>