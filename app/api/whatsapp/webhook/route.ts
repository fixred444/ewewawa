import {NextResponse} from 'next/server';
export async function GET(req:Request){const u=new URL(req.url);const mode=u.searchParams.get('hub.mode');const token=u.searchParams.get('hub.verify_token');const challenge=u.searchParams.get('hub.challenge');if(mode==='subscribe'&&token===process.env.WHATSAPP_VERIFY_TOKEN)return new Response(challenge||'',{status:200});return NextResponse.json({error:'Forbidden'},{status:403})}
export async function POST(req:Request){const payload=await req.json();console.log('WhatsApp webhook event',payload);return NextResponse.json({ok:true})}
