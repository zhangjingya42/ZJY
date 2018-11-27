//标签
<template>
    <div class="tag-container">
        <h1>标<br>签</h1>
        <div style=" margin:-28em 0 0 10em">
          <nav>
            <ul class="tags">
              <li v-for="tag in tags">
                <span href="javascript:void(0)" @click="goAnchor(tag)">{{ tag }}</span>
              </li>
            </ul>
          </nav>
          <ul class="tag-list">
            <li v-for="tag in tags">
              <p :id="tag" :name="tag">{{ tag }}</p>
              <ul>
                <li v-for="intro in introductions[tag]">
                  <router-link :to="'/articles/' + intro.id">{{ intro.title }}</router-link>
                  <span class="time"> {{ intro.publishTime }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
//获取事件
  import moment from 'moment'
import request from '@/utils/request'

moment.locale('zh-CN')
export default {
    data() {
        return {
            introductions: {},
            tags: []
        }
    },
    created() {
      request({
        url:`/introductions`,
        method:'get'
      }).then(res => {
        for (let intro of res) {
          intro.tags = intro.tags ? intro.tags.split(',') : []
          intro.publishTime = moment(intro.publishTime).format('MM-DD')
          for (let tag of intro.tags) {
            if (this.tags.indexOf(tag) === -1) {
              this.tags.push(tag)
              this.introductions[tag] = []
            }
            this.introductions[tag].push(intro)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
        goAnchor(id) {
            const anchor = document.getElementById(id)
            if (window.innerWidth > 480) {
                document.documentElement.scrollTop = anchor.offsetTop
                document.body.scrollTop = anchor.offsetTop
            }
            else {
                document.documentElement.scrollTop = anchor.offsetTop - 64
                document.body.scrollTop = anchor.offsetTop - 64
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";
.tag-container {
  h1{
    font-size: 3em;
    margin-top: 7em;
  }
    .tags {
      padding-left: 3em;
        list-style: none;
        li {
          display: inline;
          margin-right: 0.8em;
        }
      span{
        font-size: 1.5em;
        color: #99c24d;
        font-weight: 500;
        border: 1px solid rgba(255,255,255,0.3);
        background-color: rgba(255,255,255,0.3);
        border-radius: 35%;
      }
    }

    .tag-list {
      margin-top: 8em;
      padding-left: 3em;
      list-style: none;
      li {
        margin: 0.8em 0;
      }
      p{
        font-size: 1.4em;
        color: #c2ab50;

      }
    }

    a {
        color: $base;
    }
}
</style>
