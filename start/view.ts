import edge from 'edge.js';

import env from '#start/env';

edge.global('umamiUrl', env.get('UMAMI_URL'));
edge.global('umamiWebsiteId', env.get('UMAMI_WEBSITE_ID'));
