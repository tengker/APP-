<template>
	<view class="content">
		<text selectable="true" v-text="text"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:''
			}
		},
		onLoad(opinion) {
			const that = this
			that.text = opinion.text
		},
		methods: {
			
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
