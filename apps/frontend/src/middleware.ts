import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { isAuthenticated } from '@/utils/is-authenticated'

const protectedRoutes = [
	'/chat',
	'/chat/[username]',
	'/create-post',
	'/edit-account',
	'/post/[postId]/edit',
]

const routesCannotBeSignedIn = ['/auth/sign-in', '/auth/register']

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/static')
	) {
		return NextResponse.next()
	}

	const isSignedIn = await isAuthenticated()

	if (protectedRoutes.includes(pathname) && !isSignedIn) {
		return NextResponse.redirect(new URL('/access-denied', req.url))
	}

	if (routesCannotBeSignedIn.includes(pathname) && isSignedIn) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	return NextResponse.next()
}
