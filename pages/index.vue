<template>
    <div>
        <CommonSection>
            <CommonTypography
                tag="h1"
                class="flex gap-1.5"
            >
                <span class="opacity-0 transition-all animate-[text-blur_1s_forwards_400ms] inline-block will-change-transform">
                    Dawid
                </span>
                <span class="opacity-0 transition-all animate-[text-blur_1s_forwards_450ms] inline-block will-change-transform">
                    Nitka
                </span>
            </CommonTypography>
            <CommonTypography
                tag="h2"
                variant="h3"
                class="text-muted-foreground mt-1.5 flex gap-[0.3rem]"
            >
                <span class="opacity-0 transition-all animate-[text-blur_1s_forwards_600ms] inline-block will-change-transform">
                    Senior
                </span>
                <span class="opacity-0 transition-all animate-[text-blur_1s_forwards_650ms] inline-block will-change-transform">
                    Front
                </span>
                <span class="opacity-0 transition-all animate-[text-blur_1s_forwards_700ms] inline-block will-change-transform">
                    End
                </span>
                <span class="opacity-0 transition-all animate-[text-blur_1s_forwards_750ms] inline-block will-change-transform">
                    Engineer
                </span>
            </CommonTypography>
            <CommonTypography
                tag="p"
                class="mt-5"
            >
                <span class="text-muted-foreground opacity-0 transition-all animate-[text-blur_1s_forwards_900ms] inline-block will-change-transform">
                    I’m a seasoned Frontend Developer passionate about creating scalable, user-focused web applications that balance elegant design with robust technology. With expertise in Vue, Nuxt, and TypeScript, I deliver high-performing, maintainable solutions. My experience spans startups and established companies, where I’ve honed skills in responsive design, accessibility, and web performance. Beyond coding, I enjoy mentoring, knowledge sharing, and exploring new technologies to drive innovation.
                </span>
            </CommonTypography>
            <div class="text-muted text-9xl">
                Image Placeholder
            </div>
        </CommonSection>

        <CommonSection>
            <CommonTypography
                tag="h2"
            >
                Projects
            </CommonTypography>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <FrontProjectCard
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </div>
        </CommonSection>
    </div>
</template>

<script setup lang="ts">

    const { data: projects } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })
</script>
