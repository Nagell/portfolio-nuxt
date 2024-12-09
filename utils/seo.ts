export function getSeoUrls() {
    const { $const } = useNuxtApp()

    const urlOrigin = $const.page.ORIGIN
    const urlCurrent = useRoute().path === '/' ? '' : useRoute().path
    const urlFull = `${urlOrigin}${urlCurrent}`

    return { urlOrigin, urlFull }
}
