import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

const DialogHistoryHost = defineComponent({
    setup() {
        const isOpen = ref(false)
        useDialogHistory(isOpen)

        return { isOpen }
    },
    template: '<div>{{ isOpen }}</div>',
})

/** True while the browser is currently sitting on the entry `useDialogHistory` pushed. */
function isOnDialogHistoryEntry() {
    return Boolean((window.history.state as { dialogOpen?: boolean } | null)?.dialogOpen)
}

describe('useDialogHistory', () => {
    it('pushes a history entry on open and closes on browser back without navigating away', async () => {
        const wrapper = await mountSuspended(DialogHistoryHost)
        const startUrl = window.location.href

        wrapper.vm.isOpen = true
        await nextTick()

        expect(wrapper.vm.isOpen).toBe(true)
        expect(isOnDialogHistoryEntry()).toBe(true)

        window.history.back()
        await nextTick()

        expect(wrapper.vm.isOpen).toBe(false)
        expect(isOnDialogHistoryEntry()).toBe(false)
        expect(window.location.href).toBe(startUrl)
    })

    it('closing via other means (UI) also pops the pushed entry, so a later browser back keeps working', async () => {
        const wrapper = await mountSuspended(DialogHistoryHost)

        wrapper.vm.isOpen = true
        await nextTick()
        expect(isOnDialogHistoryEntry()).toBe(true)

        // Closed via UI (e.g. close button/escape), not via popstate.
        wrapper.vm.isOpen = false
        await nextTick()

        // The entry pushed on open must be popped — if it lingers, the next
        // real "back" press is silently swallowed by it instead of taking
        // the user where they actually expect to go.
        expect(isOnDialogHistoryEntry()).toBe(false)
    })

    it('supports repeated open/close cycles without leaking popstate listeners or entries', async () => {
        const wrapper = await mountSuspended(DialogHistoryHost)

        for (let i = 0; i < 3; i++) {
            wrapper.vm.isOpen = true
            await nextTick()
            expect(isOnDialogHistoryEntry()).toBe(true)

            window.history.back()
            await nextTick()
            expect(wrapper.vm.isOpen).toBe(false)
            expect(isOnDialogHistoryEntry()).toBe(false)
        }
    })
})
