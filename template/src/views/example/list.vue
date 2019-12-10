<template>
  <div class="app-container">
    <div class="search-container">
      <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
      <el-date-picker v-model="dateValue" type="date" placehoder="选择日期"></el-date-picker>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"></el-option>
      </el-select>
      <el-button type="primary">查询</el-button>
      <el-button type="success" @click="openNew">新增</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="80"
        align="center"
        label="ID"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="Date"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="Author"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="105px"
        label="Importance"
      >
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            name="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | articleStatusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        min-width="300px"
        label="Title"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Actions"
        width="120"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="openEdit(row)"
          >
            Edit
          </el-button>
<!--          <router-link :to="'/example/edit/'+scope.row.id">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              size="small"-->
<!--              icon="el-icon-edit"-->
<!--            >-->
<!--              Edit-->
<!--            </el-button>-->
<!--          </router-link>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="isEdit ? '编辑' : '新建'" v-if="dialogFormVisible">
      <article-detail :is-edit="isEdit" :vo="vo" @doneEvent="dialogFormVisible = false, getList(), vo = null"/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
import ArticleDetail from './components/ArticleDetail.vue'

@Component({
  name: 'ArticleList',
  components: {
    Pagination,
    ArticleDetail
  }
})
export default class extends Vue {
  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20
  }

  options: Array<any> = [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }]

  value = '';
  dateValue = '';
  inputValue = '';
  dialogFormVisible = false;
  formLabelWidth = '120px';
  vo: any = null;
  isEdit = false
  form = {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  };

  created() {
    this.getList()
  }

  openEdit(row: any) {
    this.isEdit = true
    this.vo = row
    this.dialogFormVisible = true
  }

  openNew() {
    this.isEdit = false
    this.vo = null
    this.dialogFormVisible = true
  }

  getDialogTitle() {
    return this.isEdit ? '编辑' : '新建'
  }

  submit() {
    this.dialogFormVisible = false
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
