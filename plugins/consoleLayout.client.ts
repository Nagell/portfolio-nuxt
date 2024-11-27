function consoleLayout() {
    const env = import.meta.env

    if (env.MODE === 'development') return

    let text = `
 ____                                 __      __  __      __    __                  
/\\  _\`\\                        __    /\\ \\    /\\ \\/\\ \\  __/\\ \\__/\\ \\                 
\\ \\ \\/\\ \\     __    __  __  __/\\_\\   \\_\\ \\   \\ \\ \`\\\\ \\/\\_\\ \\ ,_\\ \\ \\/'\\      __     
 \\ \\ \\ \\ \\  /'__\`\\ /\\ \\/\\ \\/\\ \\/\\ \\  /'_\` \\   \\ \\ , \` \\/\\ \\ \\ \\/\\ \\ , <    /'__\`\\   
  \\ \\ \\_\\ \\/\\ \\L\\.\\\\ \\ \\_/ \\_/ \\ \\ \\/\\ \\L\\ \\   \\ \\ \\\`\\ \\ \\ \\ \\ \\_\\ \\ \\\\\`\\ /\\ \\L\\.\\_ 
   \\ \\____/\\ \\__/.\\_\\ \\___x___/'\\ \\_\\ \\___,_\\   \\ \\_\\ \\_\\ \\_\\ \\__\\\\ \\_\\ \\_\\ \\__/.\\_\\
    \\/___/  \\/__/\\/_/\\/__//__/   \\/_/\\/__,_ /    \\/_/\\/_/\\/_/\\/__/ \\/_/\\/_/\\/__/\\/_/
  `
        .concat('\n\n')
        .concat('What was it... ah yes! Hello, World!\n\n')

    if (env.VITE_LINK_GITHUB) text = text.concat(`PROJECTS: ${env.VITE_LINK_GITHUB}\n`)
    if (env.VITE_LINK_LINKEDIN) text = text.concat(`LINKEDIN: ${env.VITE_LINK_LINKEDIN}\n`)

    console.log(text)
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            consoleLayout
        }
    }
})
