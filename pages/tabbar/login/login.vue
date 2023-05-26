<template>
	<view class="content">
		<view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" value="" @input="onInput" placeholder="请输入帐号"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" value="" @input="passwordInput" placeholder="请输入密码"/>
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="login">登录</text>
			</view>
		</view>
		<view class="forgotBtn">
			<navigator url="../register/register"><text>- 注册 -</text></navigator>
		</view>
		
	</view>
</template>



<script>
	export default {
		data() {
			return{
				account:"",
				password:""
			}
		},
		onLoad() {

		},
		methods: {
			onInput(e){
				this.account = e.detail.value;
			},
			passwordInput(e){
				this.password = e.detail.value;
			},
			login:function(){
				uni.request({
					url:"http://10.69.5.97:8080/login",
					method:'POST',
					data:{
						text:"login",
						account:this.account,
						password:this.password
					},
					success(res) {
						console.log(res.data)
						if(res.data.code == 1){
							uni.setStorageSync("token", res.data.token)
							uni.showToast({
								title:"登陆中",
								icon:'loading',
								duration:1000
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/tabbar/successLogin/successLogin'
								})
							},1000)
						}else{
							uni.showToast({
								title:"账号或密码错误",
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
