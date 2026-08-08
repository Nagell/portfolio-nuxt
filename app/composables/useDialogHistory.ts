import { onScopeDispose, watch } from 'vue'

import type { Ref } from 'vue'

// Consumed by app/router.options.ts's scrollBehavior override. Nuxt's default
// scrollBehavior re-scrolls to `to.hash` (or resets to top) on every same-path
// navigation, regardless of whether the hash actually changed. The push/pop
// below is a same-path, same-hash no-op for routing purposes, but it still
// runs through vue-router's popstate handling — so without suppressing it,
// closing the dialog while the URL still carries an earlier in-page anchor
// (e.g. #experience, left over from a nav-link click) yanks the page back to
// it, and even a hash-less URL gets reset to the top of the page.
let suppressNextScrollBehavior = false

export function consumeDialogHistoryScrollSuppression() {
    if (!suppressNextScrollBehavior) return false
    suppressNextScrollBehavior = false

    return true
}

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
        suppressNextScrollBehavior = true
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
            suppressNextScrollBehavior = true
            window.history.back()
        }
    })

    onScopeDispose(() => {
        window.removeEventListener('popstate', onPopState)
    })
}
