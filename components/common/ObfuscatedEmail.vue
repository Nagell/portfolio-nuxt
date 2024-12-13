<template>
    <NuxtLink
        href="#"
        aria-label="E-Mail address"
        class="obfuscated-email hover:text-primary focus:text-primary transition-colors duration-300"
        data-name="dawidnitka"
        data-domain="gmail"
        data-tld="com"
        rel="noopener noreferrer"
        @click="openEmail"
    />
</template>

<script lang="ts" setup>
    /** Open the default mail client using the obfuscated email as the recipient. */
    function openEmail(event: MouseEvent) {
        const email = event.target as HTMLElement
        const name = email.getAttribute('data-name')
        const domain = email.getAttribute('data-domain')
        const tld = email.getAttribute('data-tld')

        window.open(`mailto:${name}@${domain}.${tld}`, '_blank')
    }
</script>

<style scoped>
    .obfuscated-email:after {
        content: attr(data-name) "@" attr(data-domain) "." attr(data-tld);
    }
</style>
