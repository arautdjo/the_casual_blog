import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/login/manage-login';

const LOGIN_PATH = '/admin/login';

// [REFATORADO] O `matcher` já garante que só /admin/* chega aqui, então o
// teste `isAdminPage` era redundante. Sobraram 2 regras claras: só protegemos
// GETs, e a própria página de login fica livre.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requiresAuth =
    request.method === 'GET' && !pathname.startsWith(LOGIN_PATH);

  if (!requiresAuth) return NextResponse.next();

  const cookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';
  const session = await verifyJwt(request.cookies.get(cookieName)?.value);

  if (session) return NextResponse.next();

  return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
}

export const config = {
  matcher: '/admin/:path*',
};
