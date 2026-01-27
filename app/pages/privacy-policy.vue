<template>
    <div>
        <CommonSection
            heading="Privacy Policy"
            tag="h1"
            variant="h2"
        >
            <div class="grid grid-cols-3 gap-12 [&>*]:col-span-3 [&>*]:md:col-span-2 [&_p]:text-muted-foreground [&_ul]:text-muted-foreground [&_a]:text-foreground [&_a:hover]:text-primary [&_a:focus]:text-primary [&_a]:duration-300 [&_a]:transition-colors">
                <div class="mt-4">
                    <CommonTypography
                        tag="p"
                        class="text-muted-foreground"
                    >
                        <strong>Last updated: December 8, 2024</strong>
                    </CommonTypography>
                    <CommonTypography tag="p">
                        This Privacy Policy describes how we handle your information when you use our website. It explains your privacy rights under the General Data Protection Regulation (GDPR) and how the law protects you.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        1. Interpretation and Definitions
                    </CommonTypography>
                    <CommonTypography
                        tag="ul"
                        class="mb-0"
                    >
                        <CommonTypography tag="li">
                            <strong>Owner</strong> (referred to as "<strong>We</strong>," "<strong>Us</strong>," or "<strong>Our</strong>") refers to the private person <strong>Dawid Nitka</strong>.
                        </CommonTypography>
                        <CommonTypography tag="li">
                            <strong>Website</strong> refers to Dawid Nitka's portfolio, accessible from
                            <NuxtLink
                                :href="pageUrl"
                                class="inline-block group"
                                rel="noopener noreferrer"
                            >
                                {{ pageUrl }}.
                            </NuxtLink>
                        </CommonTypography>
                        <CommonTypography tag="li">
                            <strong>You</strong> means the individual accessing or using the Website.
                        </CommonTypography>
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        2. Data Collection and Processing
                    </CommonTypography>
                    <CommonTypography tag="p">
                        We do not collect, track, or store personal data, cookies, or any browsing information when you use this Website.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        3. Legal Basis for Data Processing
                    </CommonTypography>
                    <CommonTypography tag="p">
                        As we do not collect personal data on this Website, no data is processed for any purpose. If data processing occurs in the future, it will comply with one of the lawful bases outlined in GDPR (e.g., consent, contractual necessity, or legitimate interest).
                    </CommonTypography>
                    <CommonTypography
                        tag="h3"
                        variant="h4"
                        class="mt-6"
                    >
                        Login Authentication Notice
                    </CommonTypography>
                    <CommonTypography tag="p">
                        Our Website includes a login feature intended solely for personal administrative access. When you click the login button, you may be forwarded to GitHub for authentication. While this action may prompt GitHub to process your information (such as your GitHub account details), you will not gain access to restricted areas of the site.
                    </CommonTypography>
                    <CommonTypography tag="p">
                        Your information may be stored in our GitHub authentication app after further confirmation, but it will not be transmitted to our Website or processed by us.
                    </CommonTypography>
                    <CommonTypography tag="p">
                        For details on how GitHub handles your data, please refer to the
                    </CommonTypography>
                    <CommonExternalLink
                        href="https://docs.github.com/en/github/site-policy/github-privacy-statement"
                        aria-label="GitHub Privacy Policy"
                    >
                        GitHub Privacy Policy
                    </CommonExternalLink>.
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        4. Third-Party Links
                    </CommonTypography>
                    <CommonTypography tag="p">
                        Our Website may contain links to third-party websites. We are not responsible for the privacy policies or practices of these external sites. Please review their privacy policies when you visit them.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        5. Data Security
                    </CommonTypography>
                    <CommonTypography tag="p">
                        We use appropriate technical measures to protect the Website. However, since we do not process personal data, there is no risk of data compromise directly through this site.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        6. Children’s Privacy
                    </CommonTypography>
                    <CommonTypography tag="p">
                        Our Website does not address anyone under the age of 13. We do not knowingly collect personal data from children. If we learn that we have collected data from a child under 13, we will take steps to delete it immediately.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        7. Data Transfers
                    </CommonTypography>
                    <CommonTypography tag="p">
                        No personal data is collected or stored by us. Should we process data in the future, it will be stored within the European Economic Area (EEA) unless otherwise stated, with appropriate safeguards for international transfers.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        8. Changes to This Privacy Policy
                    </CommonTypography>
                    <CommonTypography tag="p">
                        We may update this Privacy Policy from time to time. Updates will be posted on this page with an updated “Last updated” date. Please check this page periodically for changes.
                    </CommonTypography>
                </div>

                <div>
                    <CommonTypography
                        tag="h2"
                        variant="h3"
                    >
                        9. Contact Us
                    </CommonTypography>
                    <CommonTypography tag="p">
                        If you have any questions about this Privacy Policy or your privacy rights, please contact us:
                    </CommonTypography>
                    <CommonTypography tag="p">
                        By email: <CommonObfuscatedEmail />
                    </CommonTypography>
                </div>
            </div>
        </CommonSection>
    </div>
</template>

<script lang="ts" setup>
    const { urlFull } = getSeoUrls()

    const title = 'Dawid Nitka | Privacy Policy'
    const description = 'Privacy policy of Dawid Nitka portfolio website.'

    useHead({
        link: [
            { rel: 'canonical', href: urlFull },
        ],
    })

    useSeoMeta({
        title: title,
        description: description,
    })

    const { $const } = useNuxtApp()
    const pageUrl = $const.page.ORIGIN
</script>
