<template>
	<view class="content"> 
		<div class="img">
			<image :src="temp.replace(/[\r\n]/g,'')" class="image" mode="aspectFill"></image>
		</div>
		<div class="button">
			<button @click="save">保存图片</button>
			<button @click="textResult">查看文字结果</button>
		</div>
	</view>
</template> 

<script>
export default {
	data() {
		return{
			temp:'',
			text:''
		}
	},
	methods: {
		save:function(){
			let base = this.temp;
			const bitmap = new plus.nativeObj.Bitmap('test');
			bitmap.loadBase64Data(base,function(){
				const url = '_doc/' + new Date() + '.png';
				bitmap.save(url,function(){
					console.log('success')
					bitmap.clear();
				},function(e){
					onsole.log('保存图片失败：'+JSON.stringify(e));
					bitmap.clear();
				})
			})
		},
		textResult:function(){
			uni.navigateTo({
				url:'/pages/tabbar/showText/showText?text=' + this.text
			})
		}
	},
	onLoad() {
		let that = this
		uni.request({
			url:"http://10.69.5.97:8080/download",
			data:{
				token:uni.getStorageSync("token")
			},
			success(res){
				console.log(res.data.text)
				that.temp = 'data:image/png;base64,'+ res.data.image
				that.text = res.data.text
			}
		})
	},
	onShow() {
		// setTimeout(() => {
		// }, 500);
	},
	
};
</script>

<style>
.content{
	
	height: 100%;
}
.img{
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 50px;
}
.button{
	display: flex;
	justify-content: space-around;
	height: 50px;
	margin-top: 300px;
}
.image{
	
}
</style>
