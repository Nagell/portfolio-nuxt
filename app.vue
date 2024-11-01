<template>
    <div>
        <NuxtLoadingIndicator
            color="repeating-linear-gradient(to right,#fef08a 0%,#facc15 50%,#ca8a04 100%)"
            :throttle="50"
        />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
