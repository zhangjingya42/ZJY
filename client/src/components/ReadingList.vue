//阅读
<template>
    <div class="readinglist-container">
        <h1>阅<br/>读<br/>列<br/>表</h1>
        <table>
            <tr>
                <th>Title</th>
                <th> Author</th>
                <th>ashenのScore</th>
            </tr>
            <tr v-for="{name, author, score} in books">
                <td class="col-1">{{ name }}</td>
                <td class="col-2">{{ author }}</td>
                <td class="col-3">
                    <star :score="score"></star>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

import Star from '@/components/common/Star'
import request from '@/utils/request'

export default {
    components: {
        Star
    },
    data() {
        return {
            books: ''
        }
    },
    created() {
      request({
        url:`/books`,
        method:'get'
      }).then(res => {
        this.books = res
      }).catch(err => {
        console.log(err)
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";
  .readinglist-container{
    h1{
      font-size: 2.6em;
      margin-top: 7em;
    }
  }
table {
    width: 100%;
    border-collapse: collapse;
    margin:-31em 0 0 10em;
    th {
        font-size: 2em;
        font-weight: 400 !important;
        padding: 0.5em 0;
        color: $base;
    }
    td {
      text-align: center;
      padding: 1em 0;
      color: #99c24d;
    }

    .col-1,
    .col-2 {
        width: 25%;
    }

    .col-2 {
        border-left: 1px dotted $word;
        border-right: 1px dotted $word;
    }

    .col-3 {
        color: $base;
    }
}
</style>
