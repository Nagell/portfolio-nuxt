<template>
    <div class="absolute top-0 left-0 w-screen h-screen pointer-events-none select-none">
        <div class="absolute inset-0 contain-strict isolate -z-10">
            <div class="spotlight_1 rounded-full top-0 left-0 absolute h-[85rem] w-[35rem]" />
            <div class="spotlight_2 rounded-full top-0 left-0 absolute h-[85rem] w-[15rem]" />
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="css">
    .spotlight_1 {
        transform: translateY(-350px) rotate(-45deg);
        background: radial-gradient(65% 65% at 55% 30%, hsla(0, 0%, 85%, .08) 0, hsla(0, 0%, 45%, .02) 50%, hsla(0, 0%, 0%, 0) 80%);
    }
    .spotlight_2 {
        transform-origin: top left;
        transform: rotate(-45deg) translate(5%, -50%);
        background: radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 85%, .06) 0, hsla(0, 0%, 45%, .02) 80%, transparent 100%);
    }
</style>
