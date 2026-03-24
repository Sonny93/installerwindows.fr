/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  videos: typeof routes['videos']
  cgu: typeof routes['cgu']
  status: typeof routes['status']
  guides: typeof routes['guides'] & {
    createView: typeof routes['guides.create-view']
    create: typeof routes['guides.create']
    editView: typeof routes['guides.edit-view']
    edit: typeof routes['guides.edit']
    delete: typeof routes['guides.delete']
    show: typeof routes['guides.show']
  }
  auth: {
    login: typeof routes['auth.login']
    callback: typeof routes['auth.callback']
    logout: typeof routes['auth.logout']
  }
}
