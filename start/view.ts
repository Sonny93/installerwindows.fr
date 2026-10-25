import edge from 'edge.js';

import env from '#start/env';

edge.global('appUrl', env.get('APP_URL'));
edge.global('umamiUrl', env.get('UMAMI_URL'));
edge.global('umamiWebsiteId', env.get('UMAMI_WEBSITE_ID'));
