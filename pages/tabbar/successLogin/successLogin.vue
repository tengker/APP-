<template>
	<view class="content">
		<view class="head_login">
			<image :src="temp.replace(/[\r\n]/g,'')" class="image" mode="aspectFill"></image>
			<text class="text">{{nickname}}</text>
		</view>
		<view class="body">
			<button class="button">联系客服</button>
			<button class="button">设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:"",
				temp:""
			}
		},
		onLoad() {
			const that =this
			uni.request({
				url:"http://10.69.5.97:8080/login",
				data:{
					text:"show",
					token:uni.getStorageSync("token")
				},
				method:'POST',
				success(res) {
					that.temp = 'data:image/png;base64,' + res.data.avatar
					that.nickname =  res.data.nickname
				}
			})
			console.log(this.nickname)
		},
		methods:{
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		text-align: center;
		height: 100%;
		flex-direction: column;
		justify-content: space-around;
	}
	.head_login {
		display: flex;
		justify-content: left;
		margin-top: 50px;
	}
	.image{
		max-height: 60px;
		max-width: 60px;
		margin-left: 5px;
	}
	.text{
		margin-top: 14px;
	}
	.body{
		display: flex;
		flex-direction: column;
		height: 400px;
		margin-top: 43px;
	}
	.button{
		width: 100%;
	}
</style>
