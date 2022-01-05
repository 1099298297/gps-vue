<template>
  <div class="home">
    <router-link :to="'/index'">目标分布</router-link>|
    <router-link :to="'/about'">上报信息</router-link>
    <!-- <h1 id="status" @click="startMockSet()">正在接收GPS信号...</h1> -->
	<h1 v-if="!isGetLocation" id="status" @click="getLocation()">正在接收GPS信号...</h1>
	<h1 v-else id="status" @click="getLocation()">已接收GPS信号，点击刷新</h1>
    <p id="aa" @click="removeMark()"></p>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!--地图容器-->
    <div
      :style="{ 'min-height': height + 'px', width: '90%' }"
      id="XSDFXPage"
      class="map"
    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  data: () => {
    return {
      height: 500,
      gpsArr: [
        {
          lat: 118.558927,
          lon: 31.683617,
        },
        {
          lat: 118.558911,
          lon: 31.683401,
        },
        {
          lat: 118.558889,
          lon: 31.683066,
        },
      ],
      startMock: true,
	  isGetLocation:false
    };
  },
  methods: {
	getLocation() {
		console.log("=== GET ===")
		this.$axios.request({url:'http://localhost:80/gps/getLocation.php',method:'GET'}).then(res=>{
			if (res.status == 200) {
				let _res = res.data
				console.log(_res)
				this.gpsArr = [];
				let that = this;
				_res.forEach(function(i){
					if(i.lat != null && i.lon != null){
						let temp = {
							lat: null,
							lon: null
						}
						temp.lat = i.lat;
						temp.lon = i.lon;
						that.gpsArr.push(temp);
					}
				})
				console.log("==============");
				console.log(this.gpsArr);
				console.log("==============");
				this.initMap();
				this.isGetLocation = true;
			} else {
				console.error("网络错误")
			}
		})
	},
    startMockSet() {
      this.startMock = !this.startMock;
    },
    initMap() {
      //创建Map实例
      var map = new BMap.Map("XSDFXPage");
      // 初始化地图,设置中心点坐标
      var point = new BMap.Point(118.558927, 31.683617); // 创建点坐标
      map.centerAndZoom(point, 18);
      //添加鼠标滚动缩放
      map.enableScrollWheelZoom();

      //添加缩略图控件
      map.addControl(
        new BMap.OverviewMapControl({
          isOpen: false,
          anchor: 3, // BMAP_ANCHOR_BOTTOM_RIGHT
        })
      );
      //添加缩放平移控件
      map.addControl(new BMap.NavigationControl());
      //添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      //添加地图类型控件
      //map.addControl(new BMap.MapTypeControl());

      //设置标注的图标
      var icon = new BMap.Icon(
        "https://img.webpro.ltd/picbed/img/marker-ss.png", // marker.png
        new BMap.Size(30, 30)
      );

      // var gpsArr = [
      //   {
      //     lat: 118.558927,
      //     lon: 31.683617,
      //   },
      //   {
      //     lat: 118.558911,
      //     lon: 31.683401,
      //   },
      //   {
      //     lat: 118.558889,
      //     lon: 31.683066,
      //   },
      // ];

      // console.log(gpsArr);

      var marker = [];
      var infowindow = [];
      var content = [];

      for (var i = 0; i < this.gpsArr.length; i++) {
        //设置标注的经纬度
        marker[i] = new BMap.Marker(
          new BMap.Point(this.gpsArr[i].lat, this.gpsArr[i].lon),
          {
            icon: icon,
          }
        );
		console.log(marker[i]);
		map.addOverlay(marker[i]);
      }
		
      // var mock = window.setInterval(() => {
      //   if (this.startMock) {
      //     // 把标注添加到地图上
      //     map.addOverlay(marker[j]);
      //     j++;
      //     if (j >= 3) {
      //       clearInterval(mock);
      //     }
      //     // content[j] = "<table>";
      //     // content[j] =
      //     //   content[j] +
      //     //   "<tr><td> " +
      //     //   this.gpsArr[j].lat +
      //     //   ", " +
      //     //   this.gpsArr[j].lon +
      //     //   "</td></tr>";
      //     // content[j] += "</table>";
      //     // infowindow[j] = new BMap.InfoWindow(content[i]);
      //     // marker[j].addEventListener("click", function () {
      //     //   this.openInfoWindow(infowindow[j]);
      //     // });
      //   }
      // }, 1000);

      //设置标注的经纬度
      // var marker = new BMap.Marker(new BMap.Point(118.558927, 31.683617), {
      //   icon: icon,
      // });
      // var marker1 = new BMap.Marker(new BMap.Point(118.558911, 31.683401), {
      //   icon: icon,
      // });
      // //把标注添加到地图上
      // map.addOverlay(marker);
      // map.addOverlay(marker1);

      // var content = "<table>";
      // content = content + "<tr><td> 编号：001</td></tr>";
      // content =
      //   content + "<tr><td> 地点：上海汉得信息技术股份有限公司</td></tr>";
      // content = content + "<tr><td> 时间：2018-1-3</td></tr>";
      // content += "</table>";
      // var infowindow = new BMap.InfoWindow(content);
      // marker.addEventListener("click", function () {
      //   this.openInfoWindow(infowindow);
      // });

      //点击地图，获取经纬度坐标
      map.addEventListener("click", function (e) {
        document.getElementById("aa").innerHTML =
          "经度坐标：" + e.point.lng + " &nbsp;纬度坐标：" + e.point.lat;
      });
    },
    removeMark() {
      var map = new BMap.Map("XSDFXPage");
      var overlays = map.getOverlays();
      for (var i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
      }
      this.startMock = false;
      this.initMap();
      document.getElementById("aa").innerHTML = "";
      document.getElementById("status").innerHTML = "目标信号已断开";
    },
  },
  mounted() {
    // 设置地图大小
    var height = window.screen.height - 330;
    this.height = height;
    // 渲染
    this.getLocation();

  },
};
</script>
<style scoped>
html,
body,
.XSDFXPage {
  width: 50%;
  height: 50%;
  overflow: hidden;
  margin: 0px auto;
  font-family: "微软雅黑";
}
.map {
  margin: 0 auto;
}
</style>
