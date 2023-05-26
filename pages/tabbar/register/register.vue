<template>
	<view class="content">
		<h1 class="title">注册</h1>
		<view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" value="" @input="onInput" placeholder="请输入手机号"/>
			</view>
			<view class="inputWrapperOfTwo">
				<input class="input" type="text" value="" @input="captchaInput" placeholder="请输入验证码"/>
				<button class="button" @click="sendSms">发送验证码</button>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" value="" @input="passwordInput" placeholder="请输入密码"/>
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="register">注册</text>
			</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return{
				account:"",
				password:"",
				captcha:""
			}
		},
		onLoad() {

		},
		methods: {
			onInput(e){
				this.account = e.detail.value
			},
			passwordInput(e){
				this.password = e.detail.value
			},
			captchaInput(e){
				this.captcha = e.detail.value
			},
			sendSms:function(){
				uni.request({
					url:"http://10.69.5.97:8080/login",
					data:{
						text:"sendSms",
						account:this.account
					},
					method:'POST'
			})},
			register:function(){
				uni.request({
					url:"http://10.69.5.97:8080/login",
					data:{
						text:"register",
						account:this.account,
						password:this.password,
						captcha:this.captcha
					},
					method:'POST',
					success(res) {
						if(res.data.code == 'ok'){
							uni.showToast({
								title:"注册成功，五秒后跳转至登陆界面",
								icon:'success',
								duration:5000
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/tabbar/login/login'
								})
							},5000)
						}
						else{
							uni.showToast({
								title:'验证码错误',
								icon:'error',
								duration:2000
							})
						}
					}
				})
			}
						
		}
	}
</script>



<style>
	.content {
		width: 100vw;
		height: 100vh;
	}
	.title{
		margin-left: 50px;
		margin-top: 30px;
	}
	.avatorWrapper {
		margin-top: 16px;
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	
	.avator {
		width: 300upx;
		height: 300upx;
		overflow: hidden;
	}
	
	.avator .img {
		width: 100%
	}
	
	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}
	
	.input {
		flex: 1;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		padding: 10px;
	}
	.inputWrapperOfTwo{
		display: flex;
		justify-content: space-around;
	}
	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #a3a3a3;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	
	}
	
	.loginBtn .btnValue {
		color: white;
	}
	
	.forgotBtn {
		text-align: center;
		color: #8d8d8d;
		font-size: 15px;
		margin-top:20px;
	}
</style>
