import { useRouter } from '#app/composables/router'
import { useNuxtApp } from '#app/nuxt'
import { START_LOCATION } from 'vue-router'

import { consumeDialogHistoryScrollSuppression } from '~/composables/useDialogHistory'

import type { RouterConfig } from '@nuxt/schema'
import type { RouteLocationNormalizedGeneric, RouterScrollBehavior } from 'vue-router'

/**
 * Same as Nuxt's default scrollBehavior, with one addition: skip scrolling
 * entirely for the fake same-URL navigation useDialogHistory pushes/pops to
 * let browser back close a project dialog (see consumeDialogHistoryScrollSuppression
 * for why that's needed). Everything else mirrors Nuxt's built-in behavior.
 */
export default <RouterConfig> {
    scrollBehavior(to, from, savedPosition) {
        if (consumeDialogHistoryScrollSuppression()) return false

        const router = useRouter()
        const nuxtApp = useNuxtApp()
        // Not part of vue-router's public RouterOptions type, but Nuxt's own
        // default scrollBehavior reads this same (undocumented) option.
        const hashScrollBehaviour = (router.options as { scrollBehaviorType?: ScrollBehavior }).scrollBehaviorType ?? 'auto'

        if (to.path.replace(/\/$/, '') === from.path.replace(/\/$/, '')) {
            if (from.hash && !to.hash) return savedPosition ?? { left: 0, top: 0 }
            if (to.hash) {
                return {
                    el: to.hash,
                    top: getHashElementScrollMarginTop(to.hash),
                    behavior: hashScrollBehaviour,
                }
            }

            return false
        }

        if ((typeof to.meta.scrollToTop === 'function' ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false

        if (from === START_LOCATION) return calculatePosition(to, from, savedPosition, hashScrollBehaviour)

        return new Promise((resolve) => {
            const doScroll = () => {
                requestAnimationFrame(() => {
                    if (router.currentRoute.value.fullPath !== to.fullPath) {
                        resolve(false)

                        return
                    }

                    resolve(calculatePosition(to, from, savedPosition, hashScrollBehaviour))
                })
            }

            nuxtApp.hooks.hookOnce('page:loading:end', () => {
                const transitionPromise = (nuxtApp as unknown as { '~transitionPromise'?: Promise<unknown> })['~transitionPromise']
                if (transitionPromise) transitionPromise.then(doScroll)
                else doScroll()
            })
        })
    },
}

function getHashElementScrollMarginTop(selector: string) {
    try {
        const elem = document.querySelector(selector)
        if (elem) {
            return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0)
                + (Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
        }
    }
    catch {
        // invalid selector — fall through to the default below
    }

    return 0
}

function calculatePosition(
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedGeneric,
    savedPosition: Parameters<RouterScrollBehavior>[2],
    defaultHashScrollBehaviour: ScrollBehavior,
) {
    if (savedPosition) return savedPosition
    if (to.hash) {
        return {
            el: to.hash,
            top: getHashElementScrollMarginTop(to.hash),
            behavior: defaultHashScrollBehaviour,
        }
    }

    return { left: 0, top: 0 }
}
