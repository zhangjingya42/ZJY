//文章
<template>
    <div class="articlelist-container">
      <h1 style="font-size: 3em;margin-top: 7em">文<br/>章</h1>
        <div style=" margin:-28em 0 0 10em">
          <div class="article-list">
            <article v-for="{id, title, publishTime, content} in articles" :key="id">
              <ul>
                <li>
                  <header>
                    <h2>
                      <router-link class="title" :to="'/articles/' + id">{{ title }}</router-link>
                    </h2>
                    <h4 class="time">

                      {{ publishTime }}
                    </h4>
                  </header>

                  <footer style="margin-bottom: 3em">
                    <router-link class="read-more" :to="'/articles/' + id"> continue reading ......</router-link>
                  </footer>
                </li>
              </ul>

            </article>
          </div>
        </div>
      <div class="pagination" style="margin-top:25em">
            <span class="prev" :class="{'hide': parseInt(this.$route.query.page, 10) === 0}">←
                <a @click="prevPage">上一页</a>
            </span>
        <span class="next" :class="{'hide': parseInt(this.$route.query.page, 10) === this.maxPage - 1}">
                <a @click="nextPage">下一页</a>→</span>
      </div>
    </div>
</template>

<script>
  import moment from 'moment'
    import request from '@/utils/request'
  moment.locale('zh-CN')
  export default {
    data() {
      return {
        offset: '',
        articles: '',
        maxPage: ''
      }
    },
    created() {
      console.log(typeof this.$route.query.page)
      this.offset = this.$route.query.page * 5
      request({
        url:`/articles?isPublished=1&offset=${this.offset}&limit=5`,
        method:'get'
      }).then(res => {
        console.log(res)

        for (let article of res) {
          article.publishTime = moment(article.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')

          article.content = RegExp['$`']
        }
        this.articles = res
        console.log(res.length)
        this.maxPage = res.length
      }).catch(err =>{
        console.log(err)
          })
    },
    methods: {
      prevPage() {
        if (this.$route.query.page > 0) {
          this.$router.push({path: '/articles', query: {page: this.$route.query.page - 1}})
        }
      },
      nextPage() {
        if (this.$route.query.page < this.maxPage - 1) {
          this.$router.push({path: '/articles', query: {page: parseInt(this.$route.query.page, 10) + 1}})
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.path === '/articles') {
        this.offset = to.query.page * 5
        request({
          url:`/articles?isPublished=1&offset=${this.offset}&limit=5`,
          method:'get'
        }).then(res => {

          for (let article of res.articles) {
            article.publishTime = moment(article.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')

            article.content = RegExp['$`']
          }
          this.articles = res.articles
        }).catch(err =>{
          console.log(err)
        })
      }
      next()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";
    // 覆盖article全局样式
    h2 {
        border-bottom: none;
        padding: 0;
    }

    .title {
        color: $base;
        padding-bottom: 0.3em;
    }

    .title:hover {
        border-bottom: 2px solid #99c24d;
    }

    .read-more {
        color: #99c24d;
      padding-left: 10px;
    }

    .pagination {
        @include flex($justify: space-between);
        font-size: 1.5rem;
        margin-top: 1.5em;
    }

    .prev,
    .next {
        a {
          font-size: 1.3em;
            cursor: pointer;
            color: $base;
        }
    }

    .hide {
        opacity: 0;
    }
</style>

