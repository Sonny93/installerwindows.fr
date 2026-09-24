/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: {
    showHome: typeof routes['home.show_home']
  }
  videos: {
    showVideos: typeof routes['videos.show_videos']
  }
  cgu: {
    showCgu: typeof routes['cgu.show_cgu']
  }
  status: {
    showStatus: typeof routes['status.show_status']
  }
  legacyGuideRedirect: {
    render: typeof routes['legacy_guide_redirect.render']
  }
  guides: {
    createGuide: typeof routes['guides.create_guide'] & {
      submit: typeof routes['guides.create_guide.submit']
    }
    editGuide: typeof routes['guides.edit_guide'] & {
      submit: typeof routes['guides.edit_guide.submit']
    }
    deleteGuide: typeof routes['guides.delete_guide']
    showGuides: typeof routes['guides.show_guides']
    showGuide: typeof routes['guides.show_guide']
  }
  auth: {
    login: typeof routes['auth.login']
    discordCallback: typeof routes['auth.discord_callback']
    logout: typeof routes['auth.logout']
  }
}
