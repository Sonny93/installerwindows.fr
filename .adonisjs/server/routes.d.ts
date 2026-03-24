import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'videos': { paramsTuple?: [ParamValue?]; params?: {'videoId'?: ParamValue} }
    'cgu': { paramsTuple?: []; params?: {} }
    'status': { paramsTuple?: []; params?: {} }
    'guides.create-view': { paramsTuple?: []; params?: {} }
    'guides.create': { paramsTuple?: []; params?: {} }
    'guides.edit-view': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides.delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides': { paramsTuple?: []; params?: {} }
    'guides.show': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'videos': { paramsTuple?: [ParamValue?]; params?: {'videoId'?: ParamValue} }
    'cgu': { paramsTuple?: []; params?: {} }
    'status': { paramsTuple?: []; params?: {} }
    'guides.create-view': { paramsTuple?: []; params?: {} }
    'guides.edit-view': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides': { paramsTuple?: []; params?: {} }
    'guides.show': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'videos': { paramsTuple?: [ParamValue?]; params?: {'videoId'?: ParamValue} }
    'cgu': { paramsTuple?: []; params?: {} }
    'status': { paramsTuple?: []; params?: {} }
    'guides.create-view': { paramsTuple?: []; params?: {} }
    'guides.edit-view': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'guides': { paramsTuple?: []; params?: {} }
    'guides.show': { paramsTuple: [ParamValue]; params: {'guideSlug': ParamValue} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'guides.create': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'guides.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  DELETE: {
    'guides.delete': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}