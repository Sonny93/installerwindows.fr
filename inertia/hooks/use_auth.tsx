import { usePage } from '@inertiajs/react';
import type { Data } from '@generated/data';

export const useAuth = () => usePage<Data.SharedProps>().props.auth;
