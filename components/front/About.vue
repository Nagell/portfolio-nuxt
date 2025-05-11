<template>
    <CommonSection id="about">
        <CommonTypography
            tag="h1"
            class="flex gap-1.5"
            :data-testid="testIds.index.about.header"
        >
            <span class="opacity-0 transition-all animate-[hero-text-blur_1s_forwards_400ms] inline-block will-change-transform">
                Dawid
            </span>
            <span class="opacity-0 transition-all animate-[hero-text-blur_1s_forwards_450ms] inline-block will-change-transform">
                Nitka
            </span>
        </CommonTypography>
        <CommonTypography
            tag="h2"
            variant="h3"
            class="text-muted-foreground mt-1.5 flex gap-[0.3rem]"
            :data-testid="testIds.index.about.subHeader"
        >
            <span class="opacity-0 transition-all animate-[hero-text-blur_1s_forwards_600ms] inline-block will-change-transform">
                Senior
            </span>
            <span class="opacity-0 transition-all animate-[hero-text-blur_1s_forwards_650ms] inline-block will-change-transform">
                Frontend
            </span>
            <span class="opacity-0 transition-all animate-[hero-text-blur_1s_forwards_750ms] inline-block will-change-transform">
                Engineer
            </span>
        </CommonTypography>
        <div class="grid grid-cols-3">
            <div class="col-span-3 md:col-span-2">
                <CommonTypography
                    tag="p"
                    class="mt-5"
                    :data-testid="testIds.index.about.description"
                >
                    <span class="text-foreground opacity-0 transition-all animate-[hero-text-blur_1s_forwards_900ms] inline-block will-change-transform">
                        I’m a seasoned Frontend Engineer passionate about creating scalable, user-focused web applications that balance elegant design with robust technology.
                    </span>
                    <span class="text-muted-foreground opacity-0 transition-all animate-[hero-text-blur_1s_forwards_900ms] inline-block will-change-transform mt-3">
                        With expertise in
                        <span class="text-foreground">
                            Vue, Nuxt, and TypeScript,
                        </span>
                        I deliver high-performing, maintainable solutions. My experience spans startups and established companies, where I’ve polished my skills in responsive design, accessibility, and web performance.
                    </span>
                    <span class="text-muted-foreground opacity-0 transition-all animate-[hero-text-blur_1s_forwards_900ms] inline-block will-change-transform mt-3">
                        Beyond coding, I enjoy mentoring, knowledge sharing, and exploring new technologies to drive innovation.
                    </span>
                </CommonTypography>
                <CommonSocial
                    class="opacity-0 transition-all animate-[hero-text-blur_1s_forwards_900ms] inline-block will-change-transform mt-6"
                    :data-testid="testIds.index.about.socialButtons"
                />
            </div>
        </div>
    </CommonSection>
</template>

<script setup lang="ts">
    import testIds from '~/pages/__tests__/testIds'
</script>
