<template>
    <Dialog v-model:open="isDialogOpen">
        <CarouselItem
            ref="carouselItem"
            class="basis-[17rem] md:basis-[21rem]"
        >
            <button
                class="rounded-2xl w-64 md:w-80 aspect-[320/448] relative"
                tabindex="0"
                type="button"
                aria-haspopup="dialog"
                :aria-expanded="isDialogOpen"
                @click="openDialog"
            >
                <FrontProjectCardItem
                    ref="cardItem"
                    :project="project"
                />
            </button>
        </CarouselItem>
        <div ref="dialogItemWrapper">
            <FrontProjectDialogItem
                :project="project"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
    import { gsap } from 'gsap'
    import { ref } from 'vue'

    import type { Project } from '~/types/projects.types'

    defineProps<{ project: Project }>()
    const isDialogOpen = ref(false)

    /** Opens the dialog and animates the card to the dialog shape */
    function openDialog() {
        isDialogOpen.value = true
        lockBodyScroll()
        nextTick(() => {
            animateCard()
            animateHeader()
            animateDialog()
        })
    }

    const carouselItem = useTemplateRef('carouselItem')
    const cardItem = useTemplateRef('cardItem')
    const dialogItemWrapper = useTemplateRef('dialogItemWrapper')

    let cardTimeline = gsap.timeline()
    let headerTimeline = gsap.timeline()
    let dialogTimeline = gsap.timeline()

    /** Animates the card to the shape of the not yet visible dialog */
    function animateCard() {
        const start = cardItem.value?.card
        const goal = document.querySelector('.dialog-project')
        const carouselEl = carouselItem.value

        if (!start || !goal || !carouselEl) return

        setHTMLElementCssProperty(carouselEl.$el, 'z-index', '1')

        const startRect = start.$el.getBoundingClientRect()
        const goalRect = goal.getBoundingClientRect()

        cardTimeline = gsap.timeline()
        cardTimeline.to(
            start.$el,
            {
                x: goalRect.left - startRect.left,
                y: goalRect.top - startRect.top,
                width: goalRect.width,
                height: goalRect.height,
                duration: 0.2,
                paddingTop: 24,
            },
        )
    }

    /** Hides the card header as soon as possible */
    function animateHeader() {
        const start = cardItem.value?.title

        if (!start) return

        headerTimeline = gsap.timeline()
        headerTimeline.to(
            start.$el,
            {
                opacity: 0,
                duration: 0,
            },
        )
    }

    /** Animates the dialog content */
    function animateDialog() {
        const content = dialogItemWrapper.value

        if (!content) return

        dialogTimeline = gsap.timeline()
        // animate dialog content via css variables
        // (reaching it through refs is tricky due to a portal in between)
        dialogTimeline.to(
            document.body,
            {
                ['--project-dialog-opacity']: 1,
                duration: 0.2,
            },
        )
    }

    watch(isDialogOpen, (isOpen) => {
        if (isOpen) return

        const carouselEl = carouselItem.value

        dialogTimeline.reverse()
        cardTimeline.reverse().then(
            () => {
                headerTimeline.reverse()
                unlockBodyScroll()
                if (carouselEl) setHTMLElementCssProperty(carouselEl.$el, 'z-index')
            })
    })
</script>
