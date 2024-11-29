<template>
    <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <nav class="flex items-center w-full gap-2 px-4 justify-between">
            <div class="flex gap-2 items-center">
                <SidebarTrigger class="-ml-1" />
                <Separator
                    orientation="vertical"
                    class="mr-2 h-4"
                />
                <NuxtLink
                    to="/"
                    class="text-sm text-foreground"
                >
                    Home
                </NuxtLink>
            </div>
        </nav>
    </header>
</template>
