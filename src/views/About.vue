<template>
  <div class="about">
    <router-link :to="'/index'">目标分布</router-link>|
    <router-link :to="'/about'">上报信息</router-link>
    <h1>正在接收GPS信号...</h1>
    <el-table :data="tableData" border style="width: 90%; margin: 0 auto">
      <el-table-column prop="objNum" label="目标编号"> </el-table-column>
      <el-table-column prop="ipv6Addr" label="IPV6地址"> </el-table-column>
      <el-table-column prop="lon" label="经度"> </el-table-column>
      <el-table-column prop="lat" label="纬度"> </el-table-column>
      <el-table-column prop="createTime" label="上报日期"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  data: () => {
    return {
      height: 500,
      tableData: [
        {
          objNum: "001",
          ipv6Addr: "240e:878:385:4260:1:1:43fa:6f78:1023",
          createTime: "2021-12-30 15:58:17",
          lat: 118.558927,
          lon: 31.683617,
        },
        {
          objNum: "002",
          ipv6Addr: "240e:878:385:4260:1:1:43fa:6f78:1024",
          createTime: "2021-12-30 15:58:17",
          lat: 118.558911,
          lon: 31.683401,
        },
        {
          objNum: "003",
          ipv6Addr: "240e:878:385:4260:1:1:43fa:6f78:1025",
          createTime: "2021-12-30 15:58:19",
          lat: 118.558889,
          lon: 31.683066,
        },
      ],
    };
  },
  mounted() {},
};
</script>
<style scoped></style>
