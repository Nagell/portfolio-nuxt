export function getSeoUrls() {
    const urlOrigin = window?.location.origin
    const urlCurrent = useRoute().path === '/' ? '' : useRoute().path
    const urlFull = `${urlOrigin}${urlCurrent}`

    return { urlOrigin, urlFull }
}
