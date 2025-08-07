import { InertiaPage } from '#shared/types/index';
import { usePage } from '@inertiajs/react';

const useUser = () => usePage<InertiaPage>().props.auth;
export default useUser;
