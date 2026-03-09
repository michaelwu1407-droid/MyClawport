import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USER = 'michael';
const PASS = 'Mw140799';

export function proxy(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const auth = authHeader.split(' ')[1];
    const [user, pass] = atob(auth).split(':');

    if (user === USER && pass === PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ClawPort Secure"',
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
