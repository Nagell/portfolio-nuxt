<template>
    <NavigationMenu class="flex justify-between items-start">
        <NavigationMenuList>
            <NavigationMenuItem>
                Logo
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    @click.prevent="scrollToAnchor('about')"
                >
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                        About
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    @click.prevent="scrollToAnchor('experience')"
                >
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                        Experience
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    @click.prevent="scrollToAnchor('projects')"
                >
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                        Projects
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink to="/admin/projects">
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                        Admin
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<script setup lang="ts">
    import { navigationMenuTriggerStyle } from '../ui/navigation-menu'

    function scrollToAnchor(elementId: string) {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
    }
</script>
