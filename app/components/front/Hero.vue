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
                    class="hero opacity-[0.01] absolute inset-0"
                >
                    <img
                        src="/images/window.webp"
                        alt="IDE window image"
                        class="w-full"
                        fetchpriority="high"
                        :data-testid="testIds.index.hero.imageBackground"
                    >
                </div>
                <img
                    ref="imageText"
                    src="/images/text.webp"
                    alt="Code text image"
                    class="hero opacity-[0.01] absolute inset-0 w-full"
                    fetchpriority="high"
                    :data-testid="testIds.index.hero.imageText"
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import testIds from '~/utils/testIds'

    const animationFrame = useTemplateRef<HTMLDivElement>('animationFrame')
    const imageBackground = useTemplateRef<HTMLDivElement>('imageBackground')
    const imageText = useTemplateRef<HTMLImageElement>('imageText')

    onMounted(() => {
        let animated = false

        const triggerAnimation = (delay1: number, delay2: number) => {
            if (animated) return
            animated = true
            if (imageBackground.value) {
                imageBackground.value.style.animation = `image-hero-blur 1s var(--ease-out-expo) ${delay1}ms forwards`
            }
            if (imageText.value) {
                imageText.value.style.animation = `image-hero-blur 1s var(--ease-out-expo) ${delay2}ms forwards`
            }
        }

        const isDesktop = window.matchMedia('(min-width: 768px)').matches

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    triggerAnimation(
                        isDesktop ? 1000 : 0,
                        isDesktop ? 1500 : 300,
                    )
                    observer.disconnect()
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: isDesktop ? '0px' : '0px 0px 200px 0px',
        })

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
