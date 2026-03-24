/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/home_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/home_controller').default['render']>>>
    }
  }
  'videos': {
    methods: ["GET","HEAD"]
    pattern: '/videos/:videoId?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/video_validator').videoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/show_videos_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/show_videos_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cgu': {
    methods: ["GET","HEAD"]
    pattern: '/cgu'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cgu_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cgu_controller').default['render']>>>
    }
  }
  'status': {
    methods: ["GET","HEAD"]
    pattern: '/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/health_checks_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/health_checks_controller').default['render']>>>
    }
  }
  'guides.create-view': {
    methods: ["GET","HEAD"]
    pattern: '/guides/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/create_guides_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/create_guides_controller').default['render']>>>
    }
  }
  'guides.create': {
    methods: ["POST"]
    pattern: '/guides/new'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/guide_validator').guideValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/guide_validator').guideValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/create_guides_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/create_guides_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'guides.edit-view': {
    methods: ["GET","HEAD"]
    pattern: '/guides/edit/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/edit_guide_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/edit_guide_controller').default['render']>>>
    }
  }
  'guides.edit': {
    methods: ["PUT"]
    pattern: '/guides/:slug'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/guide_validator').editGuideValidator)>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/guide_validator').editGuideValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/edit_guide_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/edit_guide_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'guides.delete': {
    methods: ["DELETE"]
    pattern: '/guides/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/delete_guide_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/delete_guide_controller').default['execute']>>>
    }
  }
  'guides': {
    methods: ["GET","HEAD"]
    pattern: '/guides'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/show_guides_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/show_guides_controller').default['render']>>>
    }
  }
  'guides.show': {
    methods: ["GET","HEAD"]
    pattern: '/guides/:guideSlug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { guideSlug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/guides/show_guide_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/guides/show_guide_controller').default['render']>>>
    }
  }
  'auth.login': {
    methods: ["GET","HEAD"]
    pattern: '/auth/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['discord']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['discord']>>>
    }
  }
  'auth.callback': {
    methods: ["GET","HEAD"]
    pattern: '/auth/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['authCallback']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['authCallback']>>>
    }
  }
  'auth.logout': {
    methods: ["GET","HEAD"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
}
