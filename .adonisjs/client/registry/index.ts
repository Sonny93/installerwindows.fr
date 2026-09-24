/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home.show_home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home.show_home']['types'],
  },
  'videos.show_videos': {
    methods: ["GET","HEAD"],
    pattern: '/videos/:videoId?',
    tokens: [{"old":"/videos/:videoId?","type":0,"val":"videos","end":""},{"old":"/videos/:videoId?","type":3,"val":"videoId","end":""}],
    types: placeholder as Registry['videos.show_videos']['types'],
  },
  'cgu.show_cgu': {
    methods: ["GET","HEAD"],
    pattern: '/cgu',
    tokens: [{"old":"/cgu","type":0,"val":"cgu","end":""}],
    types: placeholder as Registry['cgu.show_cgu']['types'],
  },
  'status.show_status': {
    methods: ["GET","HEAD"],
    pattern: '/status',
    tokens: [{"old":"/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['status.show_status']['types'],
  },
  'legacy_guide_redirect.render': {
    methods: ["GET","HEAD"],
    pattern: '/guide/:guideSlug',
    tokens: [{"old":"/guide/:guideSlug","type":0,"val":"guide","end":""},{"old":"/guide/:guideSlug","type":1,"val":"guideSlug","end":""}],
    types: placeholder as Registry['legacy_guide_redirect.render']['types'],
  },
  'guides.create_guide': {
    methods: ["GET","HEAD"],
    pattern: '/guides/new',
    tokens: [{"old":"/guides/new","type":0,"val":"guides","end":""},{"old":"/guides/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['guides.create_guide']['types'],
  },
  'guides.create_guide.submit': {
    methods: ["POST"],
    pattern: '/guides/new',
    tokens: [{"old":"/guides/new","type":0,"val":"guides","end":""},{"old":"/guides/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['guides.create_guide.submit']['types'],
  },
  'guides.edit_guide': {
    methods: ["GET","HEAD"],
    pattern: '/guides/edit/:slug',
    tokens: [{"old":"/guides/edit/:slug","type":0,"val":"guides","end":""},{"old":"/guides/edit/:slug","type":0,"val":"edit","end":""},{"old":"/guides/edit/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['guides.edit_guide']['types'],
  },
  'guides.edit_guide.submit': {
    methods: ["PUT"],
    pattern: '/guides/:slug',
    tokens: [{"old":"/guides/:slug","type":0,"val":"guides","end":""},{"old":"/guides/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['guides.edit_guide.submit']['types'],
  },
  'guides.delete_guide': {
    methods: ["DELETE"],
    pattern: '/guides/:slug',
    tokens: [{"old":"/guides/:slug","type":0,"val":"guides","end":""},{"old":"/guides/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['guides.delete_guide']['types'],
  },
  'guides.show_guides': {
    methods: ["GET","HEAD"],
    pattern: '/guides',
    tokens: [{"old":"/guides","type":0,"val":"guides","end":""}],
    types: placeholder as Registry['guides.show_guides']['types'],
  },
  'guides.show_guide': {
    methods: ["GET","HEAD"],
    pattern: '/guides/:guideSlug',
    tokens: [{"old":"/guides/:guideSlug","type":0,"val":"guides","end":""},{"old":"/guides/:guideSlug","type":1,"val":"guideSlug","end":""}],
    types: placeholder as Registry['guides.show_guide']['types'],
  },
  'auth.login': {
    methods: ["GET","HEAD"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.discord_callback': {
    methods: ["GET","HEAD"],
    pattern: '/auth/callback',
    tokens: [{"old":"/auth/callback","type":0,"val":"auth","end":""},{"old":"/auth/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.discord_callback']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
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
