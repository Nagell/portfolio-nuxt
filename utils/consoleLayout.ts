export default () => {
    import.meta.env.MODE !== 'development' && console.log(`
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
        .concat('PROJECTS: https://github.com/Nagell\n')
        .concat('LINKEDIN: https://www.linkedin.com/in/dawidnitka/\n')
    )
}
