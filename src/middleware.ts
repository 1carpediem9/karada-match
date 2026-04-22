import { NextResponse, type NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
 
  // /admin 以下のルート（/admin/loginを除く）を保護
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session')
 
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/admin/:path*'],
}
