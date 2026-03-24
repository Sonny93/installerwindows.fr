import type { Data } from '#client/data.d';
import { usePage } from '@inertiajs/react';

export const useAuth = () => usePage<Data.SharedProps>().props.auth;
