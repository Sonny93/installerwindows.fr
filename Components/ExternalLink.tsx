import Link from 'next/link';
import { ReactNode } from 'react';

export default function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href} target="_blank" rel="noreferrer">
            {children}
        </Link>
    );
}
