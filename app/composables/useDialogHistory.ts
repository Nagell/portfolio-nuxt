import { onScopeDispose, watch } from 'vue'

import type { Ref } from 'vue'

/**
 * Ties a dialog's open state to a browser history entry so the mobile/browser
 * "back" gesture closes the dialog instead of navigating away from the page.
 *
 * When the dialog opens, a history entry (same URL) is pushed. Pressing back
 * pops that entry and closes the dialog. Closing the dialog by any other means
 * (X button, escape, backdrop) removes the entry we pushed so history stays clean.
 */
export function useDialogHistory(isOpen: Ref<boolean>) {
    // True when the close was triggered by a `popstate` (back button), meaning
    // the history entry is already gone and we must not call history.back() again.
    let closedByPopState = false

    function onPopState() {
        if (!isOpen.value) return
        closedByPopState = true
        isOpen.value = false
    }

    watch(isOpen, (open, wasOpen) => {
        if (open === wasOpen) return

        if (open) {
            // Keep vue-router's own state keys so it treats this as a no-op entry.
            window.history.pushState({ ...window.history.state, dialogOpen: true }, '')
            window.addEventListener('popstate', onPopState)
            return
        }

        window.removeEventListener('popstate', onPopState)
        if (closedByPopState) {
            closedByPopState = false
        }
        else {
            // Closed via UI — drop the entry we pushed on open.
            window.history.back()
        }
    })

    onScopeDispose(() => {
        window.removeEventListener('popstate', onPopState)
    })
}
