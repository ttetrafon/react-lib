import { verifyJWT } from "../../lib/security/passwords-sessions";
import type { JWTPayload } from "../../lib/types";

export async function getJwtPayload<T extends JWTPayload>(request: Request, sessionSecret: string): Promise<T | null> {
  const cookieHeader = request.headers.get('cookie');
  let tokenCookie = null;
  let jwtPayload = null;

  if (cookieHeader) {
    // Parse cookies from the cookie header
    const cookies = cookieHeader.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name) return { name: name.toLowerCase(), value };
    });

    // Find the 'token' cookie (case insensitive)
    const tokenCookieObj = cookies.find(cookie => {
      cookie && cookie.name === 'token'
    });
    tokenCookie = tokenCookieObj ? tokenCookieObj.value : null;
  }

  if (tokenCookie) {
    // Validate the token
    jwtPayload = await verifyJWT<T>(tokenCookie, sessionSecret);
  }

  return jwtPayload;
}
