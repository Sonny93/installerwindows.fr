import { usePage } from '@inertiajs/react';
import type { Data } from '@generated/data';

export const useAuth = (): Data.SharedProps['auth'] =>
	usePage<Data.SharedProps>().props.auth;
