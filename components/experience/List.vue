<template>
    <div>
        <h3 class="text-xl font-bold mb-4">
            Experience List
        </h3><SheetTrigger as-child>
            <Button
                class="mb-4"
                @click="emits('openForm', { mode: 'add' })"
            >
                Add new
            </Button>
        </SheetTrigger>
        <ul>
            <li
                v-for="experience in experienceData"
                :key="experience.id"
                class="mb-4 p-4 bg-surface-800 rounded-lg flex justify-between"
            >
                <div>
                    <h4 class="text-lg font-bold">
                        {{ experience.title }}
                    </h4>
                    <p>{{ experience.description }}</p>
                </div>
                <div>
                    <Button
                        variant="link"
                        @click="deleteExperience({ id: experience.id })"
                    >
                        Delete
                    </Button><SheetTrigger as-child>
                        <Button
                            variant="link"
                            @click="emits('openForm', { mode: 'edit', experience })"
                        >
                            Edit
                        </Button>
                    </SheetTrigger>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { DeleteExperienceQuery, Experience } from '~/types/experience.types'

    const supabaseClient = useSupabaseClient()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], experience?: Experience }]
    }>()

    onMounted(async () => {
        realtimeChannel = supabaseClient.channel('experience').on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'experience' },
            () => refreshExperience()
        )
        realtimeChannel.subscribe()
    })

    onUnmounted(() => {
        supabaseClient.removeChannel(realtimeChannel)
    })

    /** Fetch all experience rows from the database */
    const { data: experienceData, refresh: refreshExperience } = await useFetch('/api/experience', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'experience',
        method: 'get'
    })
    /** Delete an experience row from the database */
    async function deleteExperience(data: DeleteExperienceQuery) {
        await $fetch(`/api/experience`, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'delete'
        })
    }
</script>
