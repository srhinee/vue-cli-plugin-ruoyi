<template>
<div>
	<div class="directory">
		<span>{{ path }}</span>
		<div class="divider"></div>
	</div>
	<div class="list">
		<template v-for="(v,k) in data">
			<template v-if="Array.isArray(v)">
				<div class="cell">
					<div class="left">
						<div class="dot"></div>
						<div class="line" :class="page[k]?'':'hidden'"></div>
					</div>
					<div class="right">
						<div class="filename">
							{{ k }}
							<img src="@/assets/arrow.svg"
							     @click="handleExpand(k)"
							     :class="page[k]?'expand':''"
							     class="icon"/>
						</div>
						<div class="item" :class="[item.method,page[k]?'':'hidden']" v-for="item in v">
							<div>
								<div class="func">
									<div class="tag">
										<div class="label">ID</div>
										<div class="value">{{ item.id }}</div>
									</div>
									<div class="tag" v-if="item.parameter.length">
										<div class="label">parameter</div>
										<div class="value" v-for="p in item.parameter">{{ p }}</div>
									</div>
									<div class="tag">
										<div class="label">line</div>
										<div class="value">{{ item.line }}</div>
									</div>
								</div>
								<div class="req">
									<div class="url">{{ item.url }}</div>
									<div class="method">{{ item.method }}</div>
									<div v-if="item.timeout" class="timeout">{{ item.timeout }}ms</div>
								</div>
								<div class="comment">{{ item.comment }}</div>
							</div>

							<div v-if="Object.values(item.headers).length">
								<div class="headers">
									<div class="title">headers</div>
									<div class="tag" v-for="(i,j) in item.headers">
										<div class="label">{{ j }}</div>
										<div class="value">{{ i }}</div>
									</div>
								</div>
							</div>

							<div v-if="Object.values(item.params).length">
								<div class="params">
									<div class="title">params</div>
									<div class="tag" v-for="(i,j) in item.params">
										<div class="label">{{ j }}</div>
										<div class="value">{{ i }}</div>
									</div>
								</div>
							</div>

							<div v-if="Object.values(item.data).length">
								<div class="data">
									<div class="title">data</div>
									<div class="tag" v-for="(i,j) in item.data">
										<div class="label">{{ j }}</div>
										<div class="value">{{ i }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</template>
			<template v-else>
				<v-table :data="v" :path="`${path}/${k}`"></v-table>
			</template>
		</template>
	</div>
</div>


</template>

<script>
export default {
	name: "vTable",
	props: ["data", "path"],
	data () {
		return {
			page: {}
		}
	},
	methods: {
		handleExpand (name) {
			if (this.page.hasOwnProperty (name)) this.$set (this.page, name, !this.page[name])
			else this.$set (this.page, name, true)
		}
	}
}

</script>
