import {cookies} from 'next/headers';
import crypto from 'crypto';
const secret=()=>process.env.ADMIN_PASSWORD||'change-me';
export function makeAdminToken(){const payload=Buffer.from(JSON.stringify({u:process.env.ADMIN_USERNAME,exp:Date.now()+1000*60*60*12})).toString('base64url');const sig=crypto.createHmac('sha256',secret()).update(payload).digest('base64url');return `${payload}.${sig}`}
export async function isAdmin(){const token=(await cookies()).get('admin_session')?.value;if(!token)return false;const [p,s]=token.split('.');if(!p||!s)return false;const expected=crypto.createHmac('sha256',secret()).update(p).digest('base64url');if(!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected)))return false;try{const data=JSON.parse(Buffer.from(p,'base64url').toString());return data.u===process.env.ADMIN_USERNAME&&data.exp>Date.now()}catch{return false}}
