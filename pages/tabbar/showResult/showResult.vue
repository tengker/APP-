<template>
	<view class="content">
		<image :src="temp.replace(/[\r\n]/g,'')" class="image" mode="aspectFit"></image>
		<button @click="save">保存结果</button>"
	</view>
</template>

<script>
	export default {
		data() {
			return {
				temp:''
			}
		},
		onLoad(opinion) {
			const that = this
			uni.request({
				url:"http://10.69.5.97:8080/cartonDownload",
				data:{
					token:uni.getStorageSync('token')
				},
				success(res) {
					console.log('success')
					that.temp = 'data:image/png;base64,'+res.data.image
					console.log(that.temp)
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
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
		width: 100%;
	}
</style>
