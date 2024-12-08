<template>
    <CommonSection
        heading="Legal notice"
        tag="h1"
    >
        <div class="mt-9">
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
                <NuxtLink
                    href="#"
                    aria-label="E-Mail address"
                    class="cryptedmail"
                    data-name="dawidnitka"
                    data-domain="gmail"
                    data-tld="com"
                    @click="obfuscateEmail"
                />
            </CommonTypography>
        </div>
    </CommonSection>
</template>

<script lang="ts" setup>
    const url = 'https://www.dawidnitka.com/legal-notice'
    const title = 'Dawid Nitka | Legal Notice'
    const description = 'Legal notice of Dawid Nitka portfolio website.'

    useHead({
        link: [
            { rel: 'canonical', href: url },
        ],
    })

    useSeoMeta({
        title: title,
        description: description,
        robots: 'noindex, nofollow',
    })

    /** Open the default mail client with the obfuscated email */
    function obfuscateEmail(event: MouseEvent) {
        const email = event.target as HTMLElement
        const name = email.getAttribute('data-name')
        const domain = email.getAttribute('data-domain')
        const tld = email.getAttribute('data-tld')

        window.open(`mailto:${name}@${domain}.${tld}`, '_blank')
    }
</script>

<style scoped>
    .cryptedmail:after {
        content: attr(data-name) "@" attr(data-domain) "." attr(data-tld);
    }
</style>
