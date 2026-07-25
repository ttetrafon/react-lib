// import { useCallback, useState } from "react";

// function setCookie(cookieName: string, cookieValue: string, minutesToExpire: number, sameSite?: string, secure?: string): CookieObject {
//   // use an `options` object instead of sameSite, secure, ...
//   const date: Date = new Date();
//   date.setTime(date.getTime() + (minutesToExpire * 60 * 1000));

//   document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toUTCString();

//   return {
//     key: cookieName,
//     value: cookieValue,
//     expiration: date
//   };
// }

// type CookieObject = {
//   key: string;
//   value: string;
//   expiration: Date;
//   sameSite?: string;
//   secure?: string;
// }

// function parseCookie(cookieKey: string, cookieValue: string): CookieObject {
//   const res = {
//     key: cookieKey,
//     value: "",
//     expiration: new Date(),
//     sameSite: "",
//     secure: ""
//   };

//   const parts: string[] = cookieValue.split(";");


//   return res;
// }

// function getCookies(): Record<string, CookieObject> {
//   const res: Record<string, CookieObject> = {};
//   const cookies = document.cookie.split(';');

//   return res;
// }

// function getCookie(key: string, cookies?: Record<string, CookieObject>): CookieObject | undefined {
//   if (!cookies) cookies = getCookies();
//   return cookies[key];
// }

// export default function useCookie(key: string, defaultValue: string, minutesToExpire?: number, encoding?: 'none' | 'base64'): [CookieObject | null, Function, Function] {
//   const [value, setValue] = useState<CookieObject | null>(() => {
//     const cookie = getCookie(key);
//     if (cookie) return cookie;

//     return setCookie(key, defaultValue, minutesToExpire ?? 30);
//   });

//   const updateCookie = useCallback((newValue: string, options: object) => {
//     setValue(setCookie(key, newValue, 30));
//   }, [key]);

//   const removeCookie = useCallback(() => {
//     // removeCookie(key);
//     setValue(null);
//   }, [key]);

//   return [value, updateCookie, removeCookie];
// }
