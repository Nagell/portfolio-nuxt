<template>
    <div class="bg-surface-800 rounded-full px-4 py-2 text-sm font-semibold text-white">
        {{ skill }}
    </div>
</template>

<script setup>
    defineProps({
        skill: {
            type: String,
            required: true
        }
    })
</script>
