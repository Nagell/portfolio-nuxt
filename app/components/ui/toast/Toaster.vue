<template>
    <ToastProvider>
        <Toast
            v-for="t in toasts"
            :key="t.id"
            v-bind="t"
        >
            <div class="grid gap-1">
                <ToastTitle v-if="t.title">
                    {{ t.title }}
                </ToastTitle>
                <template v-if="t.description">
                    <ToastDescription v-if="isVNode(t.description)">
                        <component :is="t.description" />
                    </ToastDescription>
                    <ToastDescription v-else>
                        {{ t.description }}
                    </ToastDescription>
                </template>
                <ToastClose />
            </div>
            <component :is="t.action" />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>

<script setup lang="ts">
    import { isVNode } from 'vue'

    import { useToast } from './use-toast'

    import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'

    const { toasts } = useToast()
</script>
