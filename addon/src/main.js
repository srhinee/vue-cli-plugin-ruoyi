import VueProgress from 'vue-progress-path'
import TableView from './components/index.vue'

Vue.use (VueProgress, {
    defaultShape: 'circle'
})

ClientAddonApi.addRoutes ('org.ruoyi.view', [
    {path: '', name: 'org.ruoyi.view.index', component: TableView}
])
