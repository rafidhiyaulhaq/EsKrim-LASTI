# EsKrim-LASTI Backend

Backend service untuk aplikasi EsKrim-LASTI menggunakan Firebase Cloud Functions.

## Struktur Proyek

```
backend/
├── functions/
│   ├── inventoryManagement/
│   │   ├── createOrder.js
│   │   ├── getStock.js
│   │   ├── updateStock.js
│   │   └── index.js
│   ├── salesMarketing/
│   │   ├── createOrder.js
│   │   ├── getProducts.js
│   │   ├── processPayment.js
│   │   └── index.js
│   ├── index.js
│   └── package.json
├── firebase.json
└── firestore.rules
```

## Fitur

### Inventory Management
1. `createOrder`: Membuat permintaan es krim baru
   - Endpoint: `http://127.0.0.1:5001/eskrim-lasti/us-central1/inventory-createOrder`
   - Method: POST
   - Requires Authentication
   - Body:
     ```json
     {
       "productId": "string",
       "quantity": number
     }
     ```

2. `getStock`: Mendapatkan data stok realtime
   - Endpoint: `http://127.0.0.1:5001/eskrim-lasti/us-central1/inventory-getStock`
   - Method: GET
   - Requires Authentication

3. `updateStock`: Update stok saat pengambilan/penyimpanan es krim
   - Endpoint: `http://127.0.0.1:5001/eskrim-lasti/us-central1/inventory-updateStock`
   - Method: POST
   - Requires Admin Authentication
   - Body:
     ```json
     {
       "productId": "string",
       "quantity": number,
       "operation": "add" | "subtract"
     }
     ```

### Sales & Marketing
1. `getProducts`: Mengambil daftar produk yang tersedia
   - Endpoint: `http://127.0.0.1:5001/eskrim-lasti/us-central1/sales-getProducts`
   - Method: GET
   - Public Access

2. `createOrder`: Membuat pesanan customer baru
   - Endpoint: `http://127.0.0.1:5001/eskrim-lasti/us-central1/sales-createOrder`
   - Method: POST
   - Requires Authentication
   - Body:
     ```json
     {
       "items": [
         {
           "productId": "string",
           "quantity": number
         }
       ],
       "shippingAddress": "string",
       "paymentMethod": "string"
     }
     ```

3. `processPayment`: Memproses pembayaran pesanan
   - Endpoint: `http://127.0.0.1:5001/eskrim-lasti/us-central1/sales-processPayment`
   - Method: POST
   - Requires Authentication
   - Body:
     ```json
     {
       "orderId": "string",
       "paymentDetails": object
     }
     ```

## Setup Development Environment

1. Install dependencies:
```bash
cd backend/functions
npm install
```

2. Jalankan emulator:
```bash
firebase emulators:start
```

3. Akses Emulator UI:
- URL: http://127.0.0.1:4000/
- Functions endpoint: http://127.0.0.1:5001
- Firestore endpoint: http://127.0.0.1:8080

## Firestore Collections

1. `products`: Menyimpan informasi produk
   - Fields: name, price, description, imageUrl

2. `inventory`: Menyimpan stok produk
   - Fields: quantity, lastUpdated

3. `orders`: Menyimpan pesanan
   - Fields: userId, items, total, status, createdAt, paidAt (optional)

## Security Rules

Firestore security rules sudah dikonfigurasi untuk:
1. Read public untuk products
2. Write products hanya untuk admin
3. Read/write inventory hanya untuk user terautentikasi
4. Read/write orders sesuai dengan kepemilikan user

## Testing

1. Buka Emulator UI di http://127.0.0.1:4000/
2. Gunakan tab Functions untuk melihat daftar endpoint
3. Gunakan tab Firestore untuk memonitor database
4. Logs tersedia di console dan Emulator UI

## Notes

- Emulator berjalan di port:
  - Functions: 5001
  - Firestore: 8080
  - Emulator UI: 4000
- Node version yang digunakan: 18 (dioverride ke 22 di local)
- Semua endpoints callable functions menggunakan format `{project-id}/us-central1/{function-name}`