<template>
    <div class="relative min-h-screen flex flex-col-reverse items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div class="relative hidden lg:flex w-full min-h-dvh flex-col bg-gradient-to-bl from-foreground to-muted">
            <NuxtImg
                src="/images/dashboard.webp"
                alt="Code text image"
                class="absolute inset-0 w-full h-full object-cover object-left opacity-80 cover pointer-events-none select-none "
                format="webp"
                sizes="xs:700px sm:1000px md:1500px"
            />
        </div>
        <div class="relative w-full">
            <div class="absolute top-10 left-12">
                <CommonLogoWhite class="w-12 h-12" />
            </div>
            <div class="relative mx-auto flex flex-col min-h-dvh w-[350px] justify-center space-y-6 ">
                <div class="flex flex-col space-y-2 text-center">
                    <CommonTypography
                        variant="h4"
                        tag="h1"
                        class="text-2xl font-semibold tracking-tight"
                    >
                        Login to your account
                    </CommonTypography>
                    <CommonTypography
                        tag="p"
                        class="text-sm text-muted-foreground"
                    >
                        Currently, only I have access to the dashboard.
                    </CommonTypography>
                    <CommonTypography
                        tag="p"
                        class="text-sm text-muted-foreground"
                    >
                        <span class="lg:hidden whitespace-pre-wrap">
                            If you're curious, you can view it on a larger screen - a screenshot will appear on the left side.
                        </span>
                        <span class="hidden lg:inline">
                            You can see how it looks on the left side.
                        </span>
                    </CommonTypography>
                </div>
                <FrontUserAuthForm />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { urlFull, urlOrigin } = getSeoUrls()

    const title = 'Dawid Nitka | Login'
    const description = 'Login page to the Dashboard. Restricted access only.'

    useHead({
        link: [
            { rel: 'canonical', href: urlFull },
        ],
    })

    useSeoMeta({
        title: title,
        description: description,
        robots: 'noindex, nofollow',
        ogTitle: title,
        ogDescription: description,
        ogImage: `${urlOrigin}/meta/login_og.png`,
        ogUrl: urlFull,
        ogType: 'website',
        ogSiteName: title,
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: `${urlOrigin}/meta/login_twitter.png`,
        twitterCard: 'summary_large_image',
    })

    definePageMeta({
        layout: 'empty',
    })
</script>
