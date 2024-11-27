<template>
    <div class="container py-16">
        <h1 class="text-4xl font-bold mb-8">
            Test field
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FrontProjectCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div>
        <section class="about py-16">
            <div class="container">
                <h2 class="text-3xl font-bold mb-8">
                    About Me
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-xl mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc nec odio ultricies.
                        </p>
                    </div>
                    <div class="w-48 h-48 overflow-clip rounded-full">
                        <picture>
                            <source
                                :srcset="src"
                                type="image/webp"
                            >
                            <img
                                :src="src"
                                alt="Profile Picture"
                            >
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    const projects = ref()

    const { data, error } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })

    if (error.value) {
        console.error(error.value)
    }
    else {
        projects.value = data.value
    }

    onMounted(async () => {
        await downloadImage()
    })

    const { $const } = useNuxtApp()

    const supabaseClient = useSupabaseClient()
    const src = ref('')
    const downloadImage = async () => {
        await supabaseClient.storage.from($const.assets.ASSETS_BUCKET).list().then(({ data, error }) => {
            if (error) throw error
            console.log(data)

            const firstImage = data[0]

            supabaseClient.storage.from($const.assets.ASSETS_BUCKET)
                .download(firstImage.name)
                .then(({ data, error }) => {
                    if (error) throw error
                    src.value = URL.createObjectURL(data)
                })
        })
    }
</script>
