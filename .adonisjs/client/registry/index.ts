/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home.show_home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home.show_home']['types'],
  },
  'videos.show_videos': {
    methods: ["GET","HEAD"],
    pattern: '/videos/:videoId?',
    tokens: [[0,"videos"],[3,"videoId"]],
    types: placeholder as Registry['videos.show_videos']['types'],
  },
  'cgu.show_cgu': {
    methods: ["GET","HEAD"],
    pattern: '/cgu',
    tokens: [[0,"cgu"]],
    types: placeholder as Registry['cgu.show_cgu']['types'],
  },
  'status.show_status': {
    methods: ["GET","HEAD"],
    pattern: '/status',
    tokens: [[0,"status"]],
    types: placeholder as Registry['status.show_status']['types'],
  },
  'legacy_guide_redirect.render': {
    methods: ["GET","HEAD"],
    pattern: '/guide/:guideSlug',
    tokens: [[0,"guide"],[1,"guideSlug"]],
    types: placeholder as Registry['legacy_guide_redirect.render']['types'],
  },
  'guides.create_guide': {
    methods: ["GET","HEAD"],
    pattern: '/guides/new',
    tokens: [[0,"guides"],[0,"new"]],
    types: placeholder as Registry['guides.create_guide']['types'],
  },
  'guides.create_guide.submit': {
    methods: ["POST"],
    pattern: '/guides/new',
    tokens: [[0,"guides"],[0,"new"]],
    types: placeholder as Registry['guides.create_guide.submit']['types'],
  },
  'guides.edit_guide': {
    methods: ["GET","HEAD"],
    pattern: '/guides/edit/:slug',
    tokens: [[0,"guides"],[0,"edit"],[1,"slug"]],
    types: placeholder as Registry['guides.edit_guide']['types'],
  },
  'guides.edit_guide.submit': {
    methods: ["PUT"],
    pattern: '/guides/:slug',
    tokens: [[0,"guides"],[1,"slug"]],
    types: placeholder as Registry['guides.edit_guide.submit']['types'],
  },
  'guides.delete_guide': {
    methods: ["DELETE"],
    pattern: '/guides/:slug',
    tokens: [[0,"guides"],[1,"slug"]],
    types: placeholder as Registry['guides.delete_guide']['types'],
  },
  'guides.show_guides': {
    methods: ["GET","HEAD"],
    pattern: '/guides',
    tokens: [[0,"guides"]],
    types: placeholder as Registry['guides.show_guides']['types'],
  },
  'guides.show_guide': {
    methods: ["GET","HEAD"],
    pattern: '/guides/:guideSlug',
    tokens: [[0,"guides"],[1,"guideSlug"]],
    types: placeholder as Registry['guides.show_guide']['types'],
  },
  'auth.login': {
    methods: ["GET","HEAD"],
    pattern: '/auth/login',
    tokens: [[0,"auth"],[0,"login"]],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.discord_callback': {
    methods: ["GET","HEAD"],
    pattern: '/auth/callback',
    tokens: [[0,"auth"],[0,"callback"]],
    types: placeholder as Registry['auth.discord_callback']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [[0,"auth"],[0,"logout"]],
    types: placeholder as Registry['auth.logout']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
