<template>
    <Dialog>
        <DialogTrigger as-child>
            <CarouselItem
                class="sm:basis-1/2 lg:basis-1/3"
            >
                <Card>
                    <CardContent class="flex aspect-square items-center justify-center p-6">
                        <span class="text-3xl font-semibold">
                            Sample
                        </span>
                    </CardContent>
                </Card>
            </CarouselItem>
        </DialogTrigger>

        <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <!-- Remove? -->
            <DialogHeader class="p-6 pb-0">
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>

            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col justify-between h-[300dvh]">
                    <Card>
                        <CardContent class="flex aspect-square items-center justify-center p-6">
                            <span class="text-3xl font-semibold">
                                Sample
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
