export default () => {
    return 'Hello Util'
}
/** Set or remove element property
 * If value is undefined, remove the property
 */
export function setHTMLElementCssProperty(element: HTMLElement, property: string, value?: string) {
    if (value !== undefined) {
        element.style.setProperty(property, value)
    }
    else {
        element.style.removeProperty(property)
    }
}

export function lockBodyScroll() {
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.offsetWidth) + 'px')
    document.body.setAttribute('data-scroll-locked', '1')
}

export function unlockBodyScroll() {
    document.body.removeAttribute('data-scroll-locked')
}
