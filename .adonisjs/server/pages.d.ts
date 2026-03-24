import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'cgu': ExtractProps<(typeof import('../../inertia/pages/cgu.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'guides/edit': ExtractProps<(typeof import('../../inertia/pages/guides/edit.tsx'))['default']>
    'guides/index': ExtractProps<(typeof import('../../inertia/pages/guides/index.tsx'))['default']>
    'guides/new': ExtractProps<(typeof import('../../inertia/pages/guides/new.tsx'))['default']>
    'guides/show': ExtractProps<(typeof import('../../inertia/pages/guides/show.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'status': ExtractProps<(typeof import('../../inertia/pages/status.tsx'))['default']>
    'videos': ExtractProps<(typeof import('../../inertia/pages/videos.tsx'))['default']>
  }
}
