<template>
    <div>
        <FrontSpotlights />
        <FrontAbout class="mt-2 md:mt-20" />
        <FrontHero />
        <FrontExperience
            v-if="experienceData"
            :experience-data="experienceData"
        />
        <FrontProjects
            v-if="projectsData"
            :projects-data="projectsData"
        />
    </div>
</template>

<script setup lang="ts">
    const { urlFull, urlOrigin } = getSeoUrls()

    const { $const } = useNuxtApp()

    const title = 'Dawid Nitka'
    const description = 'Senior Frontend Developer skilled in Vue, Nuxt and TypeScript. Delivering quality solutions and empowering teams. Let\'s create something impactful together!'
    const avatarUrl = 'https://avatars.githubusercontent.com/u/4633237'

    useHead({
        link: [
            { rel: 'canonical', href: urlFull },
        ],
    })

    useSeoMeta({
        title: title,
        description: description,
        robots: 'index, follow',
        ogTitle: title,
        ogDescription: description,
        ogImage: `${urlOrigin}/meta/dawid_nitka_og.png`,
        ogUrl: urlFull,
        ogType: 'website',
        ogSiteName: title,
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: `${urlOrigin}/meta/dawid_nitka_twitter.png`,
        twitterCard: 'summary_large_image',
    })

    /** Fetch all projects rows from the database */
    const { data: projectsData } = await useFetch('/api/projects', {
        key: 'projects',
        method: 'get'
    })

    /** Fetch all experience rows from the database */
    const { data: experienceData } = await useFetch('/api/experience', {
        key: 'experience',
        method: 'get'
    })

    const personId = `${urlOrigin}/#person`

    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'Person',
                            '@id': personId,
                            'name': title,
                            'jobTitle': 'Senior Frontend Developer',
                            'description': description,
                            'url': urlOrigin,
                            'image': avatarUrl,
                            'sameAs': [
                                $const.links.LINKEDIN,
                                $const.links.XING,
                                $const.links.MEDIUM,
                                $const.links.GITHUB,
                            ].filter(Boolean),
                            'hasOccupation': (experienceData.value ?? []).map(e => ({
                                '@type': 'Role',
                                'roleName': e.title,
                                'description': e.description,
                                'startDate': e.start,
                                ...(e.end && { endDate: e.end }),
                                ...(e.link && { url: e.link }),
                            })),
                        },
                        {
                            '@type': 'ItemList',
                            'name': 'Projects',
                            'itemListElement': (projectsData.value ?? []).map((p, i) => ({
                                '@type': 'ListItem',
                                'position': i + 1,
                                'item': {
                                    '@type': 'CreativeWork',
                                    'name': p.title,
                                    'description': p.description,
                                    'image': p.image,
                                    'author': { '@id': personId },
                                    ...(p.url && { url: p.url }),
                                    ...(p.tags && (p.tags as string[]).length > 0 && {
                                        keywords: (p.tags as string[]).join(', '),
                                    }),
                                },
                            })),
                        },
                    ],
                }),
            },
        ],
    })
</script>
