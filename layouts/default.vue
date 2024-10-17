<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-linear-dark py-4">
      <nav class="container mx-auto px-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-linear-blue">My Portfolio</NuxtLink>
        <div class="space-x-4">
          <NuxtLink to="/" class="text-white hover:text-linear-blue">Home</NuxtLink>
          <NuxtLink to="/projects" class="text-white hover:text-linear-blue">Projects</NuxtLink>
          <NuxtLink to="/about" class="text-white hover:text-linear-blue">About</NuxtLink>
          <NuxtLink to="/admin" class="text-white hover:text-linear-blue">Admin</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-linear-dark py-4 mt-8">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; {{ new Date().getFullYear() }} My Portfolio</p>
        <div class="space-x-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="text-white hover:text-linear-blue">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="text-white hover:text-linear-blue">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>