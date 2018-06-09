<template>
    <div id="main">
        <Header></Header>
        <div class="content">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './Header.vue'
    import Footer from './Footer.vue'

    export default {
        name: 'main-app',
        components: {
            Header,
            Footer
        }
    }
</script>
