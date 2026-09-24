import { usePage } from '@inertiajs/react';

import type { Data } from '#client/data.d';

export const useAuth = () => usePage<Data.SharedProps>().props.auth;
