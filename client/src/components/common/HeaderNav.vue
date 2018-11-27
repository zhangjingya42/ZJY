<template>
    <header class="nav-container">
        <nav class="site-nav">
            <!--<router-link :t o="{path: '/articles', query: {page: 0}}" class="nav-title">-->
                <!--<img class="logo" src="../../assets/img/logo.png" alt="营火">-->
                <!--<span class="title">欢迎来到我的博客</span>-->
            <!--</router-link>-->
            <ul class="site-nav-list">
                <li>
                    <a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">文章</a>
                </li>
                <li>
                    <a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}"> 标签</a>
                </li>
                <li>
                    <a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">文档</a>
                </li>
                <li>
                    <a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">阅读</a>
                </li>
                <li>
                    <a name="about" @click="jump($event)" :class="{'active': $route.path === '/about'}">关于我</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
/**
 * @author
 * @file 公用的header
 */

export default {
    props: ['maskFlag'],
    data() {
        return {
            isMaskShow: false
        }
    },
    methods: {
        toggleMask() {
            this.isMaskShow = !this.isMaskShow
        },
        jump(evt) {
            const path = evt.target.name
            switch (path) {
                case 'articles':
                    this.$router.push({path: `/${path}`, query: {page: 0}})
                    break
                case 'archives':
                    this.$router.push('/archives')
                    break
                case 'tags':
                    this.$router.push('/tags')
                    break
                case 'lists':
                    this.$router.push('/lists')
                    break
                case 'about':
                    this.$router.push('/about')
                    break
                default:
                    break
            }
        }
    },
    watch: {
        maskFlag() {
            this.isMaskShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../../assets/style/variable";
.nav-container {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
   /*background-color:#DEDEDE*/
  width: 1920px;
}
.site-nav {
    position: relative;
    margin-left: 60rem;
    @include flex($justify: space-between);
    z-index: 2;
    padding: 0.5em 0;
    height: 4em;
    width: 95%;
    /*max-width: 1200px;*/
  /*min-width: 600px;*/
    font-size: 2.8rem;

    .site-nav-list {
        @include flex;
    }
    .nav-title {
        @include flex;
        .logo {
            width: 2.5em;
            height: 2.5em;
            margin-right: 0.5em;
        }
        .title {
            font: {
                size: 2rem;
                family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
            }
            letter-spacing: 0.1em;
        }
    }
    .nav-menu {
        position: absolute;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
        visibility: hidden;
        width: 1.5em;
        height: 1.5em;
        border-radius: 2px;
        fill: $base;
    }
  .icon {
    width: 1.5em;
    height: 1.5em;
  }
}

.mask-nav {
    z-index: 1;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 235px;
    font-size: 1.6rem;
    padding: 4.5em 1.5em 4em 1.5em;
    background: #f9f9f9;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.25);
    .mask-nav-list {
        li {
            font-size: 1.4rem;
            margin-bottom: 0.8em;
        }
    }
}

[class$="nav-list"] {
    padding: 0;
    list-style: none;
    a {
        padding-bottom: 0.2em;
        margin: auto 1.5em;
        cursor: pointer;
        &:hover {
            @include chosen-item;
        }
    }
    .active {
        @include chosen-item;
    }
}

.menu-chosen {
    border: 1px solid $base !important;
    fill: $base !important;
}

@media screen and (max-width: 480px) {
    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0.5em;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
        .site-nav-list {
            display: none;

        }
        .nav-menu {
            visibility: visible;
        }
    }
}
</style>
