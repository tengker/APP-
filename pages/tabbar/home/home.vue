<template>
	<view class="content">
				<view class="flex diygw-col-24 swiper-clz">
					<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" circular="true" style="height: 150px">
						<swiper-item>
							<image src="../../../static/img/tabbar/ocr.png" class="slide-image" mode="scaleToFill"></image>
							<view class="swiper-slider-title"> 滑块一 </view>
						</swiper-item>
						<swiper-item>
							<image src="../../../static/img/tabbar/super.png" class="slide-image" mode="scaleToFill"></image>
							<view class="swiper-slider-title"> 滑块二 </view>
						</swiper-item>
						<swiper-item>
							<image src="../../../static/img/tabbar/more.png" class="slide-image" mode="scaleToFill"></image>
							<view class="swiper-slider-title"> 滑块三 </view>
						</swiper-item>
					</swiper>
				</view>
				<view class="function">
					<button class="button" @click="camera">中文文字识别</button>
					<button class="button" @click="open">图像风格转换</button>
				</view>
				<view class="function2">
					<button class="button" @click="baseColor">证件照换底色</button>
					<button class="button" @click="carton">人像动漫化</button>
				</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title:''
		};
	},
	onLoad() {},
	methods: {
		camera:function(){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function (res) {
					uni.uploadFile(
					{
						url:'http://10.69.5.97:8080/deal',
						filePath:res.tempFilePaths[0],
						formData:{
							token:uni.getStorageSync('token')
						},
						name:'file',
						success() {
							console.log('success')
						},
						fail(err) {
							console.log(err)
						}
					})
					uni.showToast({
						title:"识别中",
						duration:20000
					})
					setTimeout(function(){
						uni.navigateTo({
							url:'/pages/tabbar/ocrResult/ocrResult'
						})
					},20000)
					
				}
			});

		},
		open:function() {
			uni.showActionSheet({
				itemList:["转为梵高风","转为水墨风","转为动漫风"],
				success(res) {
					let choice = res.tapIndex;
					uni.chooseImage({
						count:1,
						sizeType:['original', 'compressed'],
						success(res) {
							uni.uploadFile(
							{
								url:'http://10.69.5.97:8080/style',
								filePath:res.tempFilePaths[0],
								formData:{
									token:uni.getStorageSync('token'),
									choice:choice
								},
								name:'file',
								success(res) {
									uni.showToast({
										title:"处理中",
										icon:'loading',
										duration:20000
									})
									setTimeout(function(){
										uni.navigateTo({
											url:'/pages/tabbar/styleChange/styleChange'
										})
									},20000)
								},
								fail(err) {
									console.log(err)
								}
							})
						}
					})
				}
			})
		},
		baseColor:function(){
			uni.showActionSheet({
				itemList:["转为蓝底","转为红底","转为白底"],
				success(res) {
					let choice = res.tapIndex;
					uni.chooseImage({
						count:1,
						sizeType:['original', 'compressed'],
						success(res) {
							uni.uploadFile(
							{
								url:'http://10.69.5.97:8080/baseColor',
								filePath:res.tempFilePaths[0],
								formData:{
									token:uni.getStorageSync('token'),
									choice:choice
								},
								name:'file',
								success(res) {
									uni.showToast({
										title:"处理中",
										icon:'loading',
										duration:30000
									})
									setTimeout(function(){
										uni.navigateTo({
											url:'/pages/tabbar/changColor/changColor'
										})
									},30000)
								},
								fail(err) {
									console.log(err)
								}
							})
						}
					})
				}
			})
		},
		carton:function(){
			uni.chooseImage({
				count:1,
				sizeType:['original', 'compressed'],
				success(res) {
					uni.uploadFile(
					{
						url:'http://10.69.5.97:8080/carton',
						filePath:res.tempFilePaths[0],
						formData:{
							token:uni.getStorageSync('token'),
							temp:''
						},
						name:'file',
						success(res) {
							uni.showToast({
								title:"处理中",
								icon:'loading',
								duration:20000
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/tabbar/showResult/showResult'
								})
								
							},20000)
						}
					})
				}
			})
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	width: 100%;
	margin-top: 200upx;
}
.function{
	display: flex;
	justify-content: center;
	margin-bottom: 26px;
	height: 100px;
}
.function2{
	display: flex;
	justify-content: center;
	height: 100px;
}
.button{
	width: 40%;
	max-height: 100px;
	background-color: azure;
	margin-top: 30px;
}
</style>
