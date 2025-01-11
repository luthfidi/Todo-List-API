# Todo List API

Sebuah API RESTful untuk mengelola daftar tugas (todo) dengan autentikasi pengguna, dibangun menggunakan Node.js, Express, dan MongoDB.

## Fitur

- Autentikasi pengguna (registrasi, login)
- Otorisasi berbasis JWT
- Operasi CRUD untuk item todo
- Validasi input
- Penanganan error
- Dokumentasi Swagger

## Prasyarat

- Node.js (v14 atau lebih tinggi)
- MongoDB (v4.4 atau lebih tinggi)
- npm atau yarn package manager

## Cara Instalasi

1. Clone repository:
```bash
git clone <url-repository>
cd todo-api
```

2. Install dependensi:
```bash
npm install
```

3. Buat file `.env`:
- Salin `.env.example` ke `.env`
- Perbarui variabel environment sesuai kebutuhan

4. Jalankan layanan MongoDB di komputer Anda

5. Jalankan server:
```bash
npm start
```

Server akan berjalan di port 3000 (default) atau port yang ditentukan di file `.env` Anda.

## Variabel Environment

Buat file `.env` di direktori utama dengan variabel berikut:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/Todo-List-API
JWT_SECRET=kunci_rahasia_jwt_anda
```

## Dokumentasi API

### Endpoint Autentikasi

#### Registrasi Pengguna
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "pengguna",
  "email": "pengguna@contoh.com",
  "password": "password123"
}
```

#### Login Pengguna
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "pengguna@contoh.com",
  "password": "password123"
}
```

#### Lihat Profil Pengguna
```http
GET /api/auth/profile
Authorization: Bearer <token_jwt_anda>
```

### Endpoint Todo

Semua endpoint todo memerlukan autentikasi JWT. Sertakan token di header Authorization:
`Authorization: Bearer <token_jwt_anda>`

#### Ambil Semua Todo
```http
GET /api/todos
```

#### Ambil Satu Todo
```http
GET /api/todos/:id
```

#### Buat Todo Baru
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Selesaikan proyek",
  "description": "Menyelesaikan proyek API todo",
  "dueDate": "2024-01-20T00:00:00.000Z",
  "status": "pending"
}
```

#### Perbarui Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Judul yang diperbarui",
  "status": "completed"
}
```

#### Hapus Todo
```http
DELETE /api/todos/:id
```

## Cara Pengujian API

Anda dapat menguji API menggunakan tools seperti Postman atau curl. Berikut alur dasarnya:

1. Registrasi pengguna baru
2. Login untuk mendapatkan token JWT
3. Gunakan token di header Authorization untuk operasi todo

### Contoh menggunakan curl:

1. Registrasi:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"pengguna","email":"pengguna@contoh.com","password":"password123"}'
```

2. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"pengguna@contoh.com","password":"password123"}'
```

3. Membuat todo (ganti <token> dengan token JWT Anda):
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Todo Test","description":"Menguji API"}'
```

## Penanganan Error

API mengembalikan kode status HTTP dan pesan error yang sesuai:

- 200: Berhasil
- 201: Berhasil Dibuat
- 400: Permintaan Tidak Valid
- 401: Tidak Terotorisasi
- 404: Tidak Ditemukan
- 500: Error Server

## Validasi

API mencakup validasi untuk:

- Registrasi pengguna (username, email, password)
- Pembuatan dan pembaruan todo
- Parameter permintaan
- Token autentikasi

## Fitur Keamanan

- Hash password menggunakan bcrypt
- Autentikasi berbasis JWT
- Validasi dan sanitasi input
- Rute terproteksi
- CORS diaktifkan

## Berkontribusi

1. Fork repository
2. Buat branch fitur Anda
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request baru

## Lisensi

Proyek ini bersifat open source dan tersedia di bawah [Lisensi MIT](LICENSE).