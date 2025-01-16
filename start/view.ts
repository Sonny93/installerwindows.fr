import env from '#start/env';
import edge from 'edge.js';

edge.global('umamiUrl', env.get('UMAMI_URL'));
edge.global('umamiWebsiteId', env.get('UMAMI_WEBSITE_ID'));
