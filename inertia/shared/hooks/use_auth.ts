import type { Data } from '@generated/data';
import { usePage } from '@inertiajs/react';

export const useAuth = (): Data.SharedProps['auth'] =>
	usePage<Data.SharedProps>().props.auth;
