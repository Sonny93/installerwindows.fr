/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home.show_home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'videos.show_videos': {
    methods: ["GET","HEAD"]
    pattern: '/videos/:videoId?'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'cgu.show_cgu': {
    methods: ["GET","HEAD"]
    pattern: '/cgu'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'status.show_status': {
    methods: ["GET","HEAD"]
    pattern: '/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'legacy_guide_redirect.render': {
    methods: ["GET","HEAD"]
    pattern: '/guide/:guideSlug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { guideSlug: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.create_guide': {
    methods: ["GET","HEAD"]
    pattern: '/guides/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.create_guide.submit': {
    methods: ["POST"]
    pattern: '/guides/new'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.edit_guide': {
    methods: ["GET","HEAD"]
    pattern: '/guides/edit/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.edit_guide.submit': {
    methods: ["PUT"]
    pattern: '/guides/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.delete_guide': {
    methods: ["DELETE"]
    pattern: '/guides/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.show_guides': {
    methods: ["GET","HEAD"]
    pattern: '/guides'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'guides.show_guide': {
    methods: ["GET","HEAD"]
    pattern: '/guides/:guideSlug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { guideSlug: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
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
      response: unknown
      errorResponse: unknown
    }
  }
  'auth.discord_callback': {
    methods: ["GET","HEAD"]
    pattern: '/auth/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
