export default {
    index: {
        about: {
            header: 'index.about.header',
            subHeader: 'index.about.subHeader',
            description: 'index.about.description',
            socialButtons: 'index.about.socialButtons'
        },
        hero: {
            imageBackground: 'index.hero.imageBackground',
            imageText: 'index.hero.imageText',
        },
        experience: {
            header: 'index.experience.header',
            items: 'index.experience.items',
            downloadCvButton: 'index.experience.downloadCvButton',
        },
        projects: {
            header: 'index.projects.header',
            items: 'index.projects.items',
            dialogContent: 'index.projects.dialogContent',
        },
        footer: {
            links: 'index.footer.links',
            socialButtons: 'index.footer.socialButtons',
        },
    },
    admin: {
        assets: {
            header: 'admin.assets.header',
            addAssetButton: 'admin.assets.addAssetButton',
            assetList: 'admin.assets.assetList',
        },
        experience: {
            header: 'admin.experience.header',
            addExperienceButton: 'admin.experience.addExperienceButton',
            experienceList: 'admin.experience.experienceList',
        },
        projects: {
            header: 'admin.projects.header',
            addProjectButton: 'admin.projects.addProjectButton',
            projectList: 'admin.projects.projectList',
        },
    },
} as const
