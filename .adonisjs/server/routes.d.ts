import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home.show_home': { paramsTuple?: []; params?: {} }
    'videos.show_videos': { paramsTuple?: [ParamValue?]; params?: {'videoId'?: ParamValue} }
    'cgu.show_cgu': { paramsTuple?: []; params?: {} }
    'status.show_status': { paramsTuple?: []; params?: {} }
    'legacy_guide_redirect.render': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'guides.create_guide': { paramsTuple?: []; params?: {} }
    'guides.create_guide.submit': { paramsTuple?: []; params?: {} }
    'guides.edit_guide': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.edit_guide.submit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.delete_guide': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.show_guides': { paramsTuple?: []; params?: {} }
    'guides.show_guide': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.discord_callback': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home.show_home': { paramsTuple?: []; params?: {} }
    'videos.show_videos': { paramsTuple?: [ParamValue?]; params?: {'videoId'?: ParamValue} }
    'cgu.show_cgu': { paramsTuple?: []; params?: {} }
    'status.show_status': { paramsTuple?: []; params?: {} }
    'legacy_guide_redirect.render': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'guides.create_guide': { paramsTuple?: []; params?: {} }
    'guides.edit_guide': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.show_guides': { paramsTuple?: []; params?: {} }
    'guides.show_guide': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.discord_callback': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home.show_home': { paramsTuple?: []; params?: {} }
    'videos.show_videos': { paramsTuple?: [ParamValue?]; params?: {'videoId'?: ParamValue} }
    'cgu.show_cgu': { paramsTuple?: []; params?: {} }
    'status.show_status': { paramsTuple?: []; params?: {} }
    'legacy_guide_redirect.render': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'guides.create_guide': { paramsTuple?: []; params?: {} }
    'guides.edit_guide': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.show_guides': { paramsTuple?: []; params?: {} }
    'guides.show_guide': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.discord_callback': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'guides.create_guide.submit': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'guides.edit_guide.submit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  DELETE: {
    'guides.delete_guide': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}