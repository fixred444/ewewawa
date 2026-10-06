'use client';
import {useState} from 'react';
import {supabase} from '../../lib/supabase';
import {useRouter} from 'next/navigation';
export default function Login(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [err,setErr]=useState('');const r=useRouter();async function go(e:any){e.preventDefault();setErr('');const {error}=await supabase.auth.signInWithPassword({email,password});if(error)return setErr(error.message);r.push('/dashboard')}return <main className="wrap" style={{maxWidth:500}}><div className="card"><h1>Masuk</h1><form className="stack" onSubmit={go}><input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn">Masuk</button>{err&&<div className="error">{err}</div>}</form></div></main>}
