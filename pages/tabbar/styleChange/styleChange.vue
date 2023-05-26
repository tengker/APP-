<template>
	<view class="content">
		<div class="img">
			<image :src="temp.replace(/[\r\n]/g,'')" class="image" mode="aspectFit"></image>
		</div>
		<div class="button">
			<button @click="save">保存图片</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				temp:""
			}
		},
		onLoad(opinion) {
			const that = this
			uni.request({
				url:"http://10.69.5.97:8080/styledownload",
				data:{
					token:uni.getStorageSync('token')
				},
				success(res) {
					console.log('success')
					that.temp ='data:image/png;base64,' + res.data.image
				}
			})
		},
		methods: {
			save:function(){
				let base = this.temp.replace('data:image/png;base64,', '')
				const bitmap = new plus.nativeObj.Bitmap('test');
				bitmap.loadBase64Data(base,function(){
					const url = '_doc/' + new Date() + '.png';
					bitmap.save(url,function(){
						bitmap.clear();
					})
				})
			}
		}
	}
</script>

<style>
.content{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.img{
	height: 500px;
	width: 100%;
	text-align: center;
}
</style>
