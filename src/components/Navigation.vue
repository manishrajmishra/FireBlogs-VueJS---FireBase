<template>
<header>
    <nav class="container">
        <div class="branding">
            <router-link class="header" :to="{ name: 'Home' }">FireBlogs</router-link>
        </div>
        <div class="nav-links">
            <ul>
                <router-link class="link" to="#">Home</router-link>
                <router-link class="link" to="#">Blogs</router-link>
                <router-link class="link" to="#">Create Post</router-link>
                <router-link class="link" to="#">Login</router-link>
                <router-link class="link" to="#">Register</router-link>
            </ul>
        </div>
    </nav>
</header>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
</style>