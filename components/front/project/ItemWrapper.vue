<template>
    <Dialog v-model:open="isDialogOpen">
        <CarouselItem class="basis-[21rem]">
            <button
                class="rounded-2xl w-80 aspect-[320/448]"
                tabindex="0"
                role="region"
                aria-roledescription="carousel-content"
                @click="openDialog"
            >
                <slot name="carousel" />
            </button>
        </CarouselItem>
        <slot name="dialog" />
    </Dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const isDialogOpen = ref(false)

    const openDialog = () => {
        setTimeout(() => {
            isDialogOpen.value = true
        }, 400)
    }
</script>
