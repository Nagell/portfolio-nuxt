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
            dialog: {
                wrapper: 'admin.experience.dialog.wrapper',
                title: 'admin.experience.dialog.title',
                url: 'admin.experience.dialog.url',
                description: 'admin.experience.dialog.description',
                startDate: 'admin.experience.dialog.startDate',
                startDatePopover: 'admin.experience.dialog.startDatePopover',
                endDate: 'admin.experience.dialog.endDate',
                endDatePopover: 'admin.experience.dialog.endDatePopover',
                tags: 'admin.experience.dialog.tags',
                saveButton: 'admin.experience.dialog.saveButton',
            }
        },
        projects: {
            header: 'admin.projects.header',
            addProjectButton: 'admin.projects.addProjectButton',
            projectList: 'admin.projects.projectList',
            dialog: {
                wrapper: 'admin.projects.dialog.wrapper',
                title: 'admin.projects.dialog.title',
                description: 'admin.projects.dialog.description',
                image: 'admin.projects.dialog.image',
                imagePopover: 'admin.projects.dialog.imagePopover',
                url: 'admin.projects.dialog.url',
                tags: 'admin.projects.dialog.tags',
                saveButton: 'admin.projects.dialog.saveButton',
            }
        },
        dataTableDropdown: {
            wrapper: 'admin.dataTableDropdown.wrapper',
            edit: 'admin.dataTableDropdown.edit',
            delete: 'admin.dataTableDropdown.delete',
        }
    },
} as const
