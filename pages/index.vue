<template>
    <div>
        <FrontSpotlights />
        <FrontAbout class="mt-8 md:mt-20" />
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
    const url = 'https://www.dawidnitka.com'
    const title = 'Dawid Nitka'
    const description = 'Senior Frontend Developer skilled in Vue, Nuxt and TypeScript. Delivering quality solutions and empowering teams. Let\'s create something impactful together!'

    useHead({
        link: [
            { rel: 'canonical', href: url },
        ],
    })

    useSeoMeta({
        title: title,
        description: description,
        robots: 'index, follow',
        ogTitle: title,
        ogDescription: description,
        ogImage: '/meta/dawid_nitka_og.png',
        ogUrl: url,
        ogType: 'website',
        ogSiteName: title,
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: '/meta/dawid_nitka_twitter.png',
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
</script>
