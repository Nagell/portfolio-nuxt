<template>
    <CommonSection
        heading="Legal notice"
        tag="h1"
        variant="h2"
    >
        <div class="mt-9 [&_p]:text-muted-foreground [&_ul]:text-muted-foreground [&_a]:text-foreground [&_a:hover]:text-primary [&_a:focus]:text-primary [&_a]:duration-300 [&_a]:transition-colors">
            <CommonTypography
                variant="h3"
                tag="h2"
            >
                Contact
            </CommonTypography>
            <CommonTypography tag="p">
                Dawid Nitka<br>
                M&uuml;nchener Stra&szlig;e 157<br>
                45145 Essen
            </CommonTypography>
            <CommonTypography tag="p">
                E-Mail:
                <CommonObfuscatedEmail />
            </CommonTypography>
        </div>
    </CommonSection>
</template>

<script lang="ts" setup>
    const { urlFull } = getSeoUrls()

    const title = 'Dawid Nitka | Legal Notice'
    const description = 'Legal notice of Dawid Nitka portfolio website.'

    useHead({
        link: [
            { rel: 'canonical', href: urlFull },
        ],
    })

    useSeoMeta({
        title: title,
        description: description,
        robots: 'noindex, nofollow',
    })
</script>
