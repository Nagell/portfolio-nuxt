<template>
    <div
        class="hero__wrapper -z-10 w-screen relative pointer-events-none select-none"
    >
        <div
            class="hero__wrapper-inner w-full h-full relative"
            aria-hidden="true"
        >
            <div
                ref="animationFrame"
                class="hero__animation-frame absolute inset-0"
            >
                <div
                    ref="imageBackground"
                    class="hero opacity-0 absolute inset-0"
                >
                    <img
                        src="/images/window.webp"
                        alt="IDE window image"
                        class="w-full"
                        :data-testid="testIds.index.hero.imageBackground"
                    >
                </div>
                <img
                    ref="imageText"
                    src="/images/text.webp"
                    alt="Code text image"
                    class="hero opacity-0 absolute inset-0 w-full"
                    :data-testid="testIds.index.hero.imageText"
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import testIds from '~/utils/testIds'

    const animationFrame = useTemplateRef('animationFrame')
    const imageBackground = useTemplateRef('imageBackground')
    const imageText = useTemplateRef('imageText')

    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    imageBackground.value?.classList.add('animate-[image-hero-blur_1s_forwards_1000ms]')
                    imageText.value?.classList.add('animate-[image-hero-blur_1s_forwards_1500ms]')
                    observer.disconnect()
                }
            })
        }, { threshold: 0.1 })

        if (animationFrame.value) {
            observer.observe(animationFrame.value)
        }
    })
</script>

<style scoped lang="css">
    .hero__wrapper {
        --hero-width: 900px;
        --height: 600px;

        height: var(--height);
        margin: -6.25rem  0;

        &::after {
            content: "";
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 2;
            background: linear-gradient(to bottom, transparent 50%, var(--color-background) 85%);
        }
    }

    @media screen and (min-width: 48rem) {
        .hero__wrapper {
            --hero-width: 1500px;
            --height: 800px;
        }
    }

    .hero__wrapper-inner {
        contain: strict;
        perspective: 4000px;
        perspective-origin: 100% 0;
        transform-style: preserve-3d;
    }

    .hero__animation-frame {
        width: var(--hero-width);
        margin: 150px auto auto;
        transform: translateX(2%) scale(1.2) rotateX(47deg) rotateY(33deg) rotate(324deg);
        transform-origin: top left;
        transform-style: preserve-3d;
    }

    .hero {
        &::after {
            content: "";
            pointer-events: none;
            position: absolute;
            inset: -8px;
            background: linear-gradient(to right, transparent 70%, var(--color-background) 85%);
        }
    }
</style>
