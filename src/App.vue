<template>
    <!-- todo routerview -->
    <div class="bodybody">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style scoped>
.bodybody {
    height: 100vh;
    overflow: hidden;
}
</style>
