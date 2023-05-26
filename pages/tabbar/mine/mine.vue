<template>
	<view class="content">
		<view class="head_login">
			<image class="image" src="../../../static/img/tabbar/me.png" mode="aspectFit"></image>
			<text class="text" @click="login">立即登录</text>
		</view>
		<view class="body">
			<button class="button" @click="alert">联系客服</button>
			<button class="button">设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			login:function(){
				uni.navigateTo({
					url:'/pages/tabbar/login/login'
				});
			},
			alert:function(){
				uni.showToast({
					title:"请联系qq2207665342",
					icon:'none',
					duration:3000
				})
			}
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
		max-height: 50px;
		max-width: 50px;
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
