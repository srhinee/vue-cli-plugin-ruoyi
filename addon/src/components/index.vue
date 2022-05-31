<template>
<div class="container">
	<Table :data="data" path="api"></Table>
</div>
</template>

<script>
import Table from "@/components/table.vue"

export default {
	name: "Index",
	components: {Table},
	sharedData () {
		return {
			data: "org.ruoyi.sourceMap",
		}
	}
}
</script>

<style>
.container {
	padding: 20px;
	overflow: auto !important;
	--color: #666;
}

.directory {
	display: flex;
	align-items: center;
}

.directory span {
	font-size: 1.5em;
	font-weight: bolder;
	line-height: 1.5em;
	margin: 0 20px 0 10px;
	text-transform: uppercase;
}

.directory .divider {
	flex: 1;
	height: 1px;
	width: 80%;
	left: 10px;
	margin-right: 20px;
	background: linear-gradient(to right, #99CCCC, #CCCCFF, #FFCC99, #FFCCCC)
}

.list {
	margin: 0 20px;
	transition: all linear 300ms;
}

.cell {
	display: flex;
	margin-left: 10px;
}

.cell .left {
	width: 20px;
}

.cell .left .dot {
	height: 10px;
	width: 10px;
	border-radius: 50%;
	margin-top: 7px;
	background: #99CCCC;
}

.cell .left .line {
	width: 1px;
	margin-left: 4px;
	height: calc(100% - 40px);
	background: linear-gradient(to bottom, #99CCCC, #CCCCFF, #FFCC99, #FFCCCC);
}

.cell .right {
	flex: 1;
}

.cell .right .filename {
	font-size: 1.2em;
	text-transform: capitalize;
	line-height: 1.2em;
	margin-bottom: 10px;
}

.filename .icon {
	float: right;
	margin-right: 10px;
	cursor: pointer;
	transition: all linear 200ms;
}

.filename .icon.expand {
	transform: rotate(90deg);
}

.item {
	border-left: 8px solid var(--color);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	padding: 20px;
	border-radius: 5px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	transition: all linear 300ms;
}

.hidden {
	max-height: 0;
	opacity: 0;
	overflow: hidden;
	padding-top: 0;
	padding-bottom: 0;
	margin-top: 0;
	margin-bottom: 0;
}

.item .func {
	display: flex;
}

.item .req {
	margin-top: 10px;
	display: flex;
	align-items: center;
}

.item .url {
	font-size: 1.3em;
	font-weight: bold;
}

.item .method {
	margin-left: 10px;
	border: 1px solid var(--color);
	color: var(--color);
	padding: 0 7px;
	text-transform: uppercase;
	font-size: .6em;
}

.item .timeout {
	margin-left: 10px;
	font-size: .8em;
	color: #999;
}

.item .comment {
	margin-top: 10px;
	color: #999;
}

.item .tag {
	border: 1px solid var(--color);
	display: flex;
	font-size: .8em;
	margin: -1px;
}

.item .tag .label {
	padding: 2px 10px;
	background: var(--color);
	color: white;
	font-weight: bold;
}

.item .tag .value {
	position: relative;
	padding: 2px 10px;
	border-left: 1px solid var(--color);
}

.item .tag .value::before {
	content: "";
	position: absolute;
	left: -1px;
	top: 11px;
	background: white;
	height: 10px;
	width: 10px;
	z-index: 2;
	border-left: 1px solid var(--color);
	border-bottom: 1px solid var(--color);
	transform: translateX(-50%) translateY(-50%) rotate(45deg);
}


.item.get {
	--color: #99CCCC;
}

.item.post {
	--color: #CCCCFF;
}

.item.put {
	--color: #FFCC99;
}

.item.delete {
	--color: #FFCCCC;
}


.item .title {
	margin: -1px;
	border: 1px solid var(--color);
	padding: 2px 10px;
	color: var(--color);
	font-weight: bold;
	text-align: center;
	font-size: .8em;

}
</style>
