<template>
    <NavigationMenu class="flex justify-between items-start">
        <NavigationMenuList>
            <NavigationMenuItem>
                Logo
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink to="/">
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                        Home
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink to="/tests">
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                        Tests
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
</script>
