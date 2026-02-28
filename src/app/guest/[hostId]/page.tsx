'use client';

import { redirect } from 'next/navigation';

export default function GuestPage() {
    redirect('/');
    return null;
}
