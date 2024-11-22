<template>
    <SidebarProvider>
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div class="flex items-center group-data-[state=expanded]:p-2 p-1">
                            <div class="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <component
                                    :is="data.page.logo"
                                    class="size-4"
                                />
                            </div>
                            <div class="grid flex-1 text-left text-lg leading-tight pl-2">
                                <span class="truncate font-semibold">
                                    {{ data.page.name }}
                                </span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Content</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem
                            v-for="item in data.projects"
                            :key="item.title"
                        >
                            <SidebarMenuButton as-child>
                                <NuxtLink :to="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton
                                    size="lg"
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            :src="data.user.avatar"
                                            :alt="data.user.name"
                                        />
                                        <AvatarFallback class="rounded-lg">
                                            DN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">
                                            {{ data.user.name }}
                                        </span>
                                        <span class="truncate text-xs">
                                            {{ data.user.email }}
                                        </span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                :side-offset="4"
                            >
                                <DropdownMenuItem @click="logout">
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
        <SidebarInset>
            <LayoutAdminHeader />
            <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
                <slot />
            </div>
        </SidebarInset>
    </SidebarProvider>
</template>

<script setup lang=ts>
    import {
        ChevronsUpDown,
        CircleArrowUp,
        Image,
        Library,
        LogOut,
        SlidersHorizontal
    } from 'lucide-vue-next'

    const supabaseClient = useSupabaseClient()
    const supabaseUser = useSupabaseUser()

    const data = {
        user: {
            name: supabaseUser.value?.user_metadata.full_name ?? 'anonymous',
            email: supabaseUser.value?.email ?? 'anonymous@mail.com',
            avatar: '',
        },
        projects: [
            {
                title: 'Projects',
                url: '/admin/projects',
                icon: Library,
            },
            {
                title: 'Covers',
                url: '/admin/covers',
                icon: Image,
            },
            {
                title: 'Experience',
                url: '/admin/experience',
                icon: CircleArrowUp,
            },
        ],
        page: {
            name: 'Dashboard',
            logo: SlidersHorizontal,
        },
    }

    /** Log out the current user */
    async function logout() {
        supabaseClient.auth.signOut({})
        await navigateTo('/login')
    }
</script>
