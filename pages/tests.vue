<template>
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold mb-8">
            Test field
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                :project="project"
            />
        </div>
        <section class="about py-16">
            <div class="container mx-auto px-4">
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
        <div class="bg-surface-800 rounded-lg overflow-hidden group">
            <div class="overflow-hidden">
                <NuxtImg
                    src="/12-2500x1667.jpg"
                    alt="just a test"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    placeholder
                    format="webp"
                    loading="lazy"
                    sizes="xs:500px md:1200px"
                />
            </div>
            <div class="p-4 bg-surface-800">
                View on GitHub
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const projects = ref()

    const { data, error } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })

    // const { data, error: supabaseError } = await supabaseClient
    //             .from('projects')
    //             .select('*')
    //             .limit(3)
    //             .order('created_at', { ascending: false })

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
        await supabaseClient.storage.from($const.covers.PROJECT_COVERS_BUCKET).list().then(({ data, error }) => {
            if (error) throw error
            console.log(data)

            const firstImage = data[0]

            supabaseClient.storage.from($const.covers.PROJECT_COVERS_BUCKET)
                .download(firstImage.name)
                .then(({ data, error }) => {
                    if (error) throw error
                    src.value = URL.createObjectURL(data)
                })
        })
    }
</script>
