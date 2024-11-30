<template>
    <Carousel
        ref="carouselContainerRef"
        class="relative w-full"
        :opts="{
            align: 'start',
            watchResize: true,
            slidesToScroll: 'auto'
        }"
    >
        <CarouselContent>
            <FrontProjectItem
                v-for="(_, index) in 5"
                :key="index"
                class="sm:basis-1/2 lg:basis-1/3"
            />
            <!-- <CarouselItem
                v-for="(_, index) in 5"
                :key="index"
                class="sm:basis-1/2 lg:basis-1/3"
            >
                <div class="p-1">
                    <Card>
                        <CardContent class="flex aspect-square items-center justify-center p-6">
                            <span class="text-3xl font-semibold">
                                {{ index + 1 }}
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem> -->
        </CarouselContent>
        <div class="relative mt-10 flex justify-center gap-6">
            <CarouselPrevious class="relative inset-0 translate-y-0 enabled:bg-muted" />
            <CarouselNext class="relative inset-0 translate-y-0 enabled:bg-muted" />
        </div>
    </Carousel>
</template>

<script setup lang="ts">

</script>
