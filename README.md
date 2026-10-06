# Ewewa Sales Dashboard

Next.js + Supabase starter untuk dashboard jualan, akun pengguna, admin, penarikan, database kontak opt-in, teks jualan, dan antrean kampanye WhatsApp.

## 1. Jalankan lokal
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Supabase
Buat project Supabase, buka SQL Editor, lalu jalankan `supabase/schema.sql`.
Aktifkan Email/Password di Authentication.

## 3. Environment Vercel
Isi:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_VERIFY_TOKEN`

**Jangan commit `.env.local` dan jangan taruh service-role key di browser.**

## 4. Catatan admin
Akun admin yang diminta user sebaiknya dibuat sebagai secret/environment dan kemudian diberi role `admin` pada `profiles`. Untuk produksi, tambahkan middleware/server session yang memeriksa role sebelum endpoint admin.

## 5. WhatsApp
Gunakan WhatsApp Business Platform/Cloud API dan hanya kirim kepada kontak yang memberi opt-in. Untuk pesan bisnis yang dimulai oleh bisnis di luar jendela percakapan yang berlaku, gunakan template yang disetujui Meta. Mode fast/medium/slow di proyek ini hanya mengatur antrean; worker pengiriman perlu dibuat di server/queue yang sesuai dengan rate limit provider.

## 6. Arsitektur QR WhatsApp

Frontend tetap dideploy dari GitHub ke Vercel. Koneksi QR WhatsApp dijalankan oleh `whatsapp-backend/` sebagai proses Node.js persisten di Railway/Render/Fly.io/VPS. Vercel kemudian berkomunikasi dengan backend tersebut melalui URL backend + API key.

```text
GitHub -> Vercel (website/admin)
                  |
                  v
        WhatsApp backend Node.js
                  |
                  v
             QR / Session
                  |
                  v
              WhatsApp
```

QR/session backend harus dijalankan pada layanan yang mengizinkan proses persisten dan penyimpanan sesi. Jangan memasukkan `API_KEY` atau kredensial sesi ke GitHub.

## Admin
Buka `/admin/login`. Username/password dibaca dari `ADMIN_USERNAME` dan `ADMIN_PASSWORD`. Contoh nilai yang Anda berikan dapat dimasukkan ke Vercel Environment Variables, tetapi jangan ditulis ke source code/GitHub.
