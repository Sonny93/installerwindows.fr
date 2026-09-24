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
    'cgu/show_cgu': ExtractProps<(typeof import('../../inertia/pages/cgu/show_cgu.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'guides/create_guide': ExtractProps<(typeof import('../../inertia/pages/guides/create_guide.tsx'))['default']>
    'guides/edit_guide': ExtractProps<(typeof import('../../inertia/pages/guides/edit_guide.tsx'))['default']>
    'guides/show_guide': ExtractProps<(typeof import('../../inertia/pages/guides/show_guide.tsx'))['default']>
    'guides/show_guides': ExtractProps<(typeof import('../../inertia/pages/guides/show_guides.tsx'))['default']>
    'home/show_home': ExtractProps<(typeof import('../../inertia/pages/home/show_home.tsx'))['default']>
    'status/show_status': ExtractProps<(typeof import('../../inertia/pages/status/show_status.tsx'))['default']>
    'videos/show_videos': ExtractProps<(typeof import('../../inertia/pages/videos/show_videos.tsx'))['default']>
  }
}
