# PostGifty / past-prj — Project Questions

## 1. Mô tả PostGifty
PostGifty là nền tảng e-commerce multi-store. Backend dùng Node.js/MedusaJS + TypeScript + PostgreSQL + Redis; frontend dùng React/TypeScript.

## 2. Multi-shop order flow
Một cart có thể chứa sản phẩm của nhiều shop.

Flow nên kể:
```text
Cart
 ↓
Validate
 ↓
Lock cart_id
 ↓
Complete parent order
 ↓
Split items by shop
 ↓
Create child orders
 ↓
Payment / promotion / shipping
 ↓
Inventory reservation
 ↓
Release lock
```

## 3. Tại sao lock cart_id?
Để tránh cùng một cart bị checkout đồng thời, ví dụ user double-click hoặc request bị retry.

Điểm quan trọng:
> Cart lock chỉ bảo vệ cùng một cart, không tự giải quyết hai cart khác nhau tranh cùng inventory.

## 4. Inventory contention
Với normal order, contention inventory chủ yếu đi qua Medusa complete-cart/inventory reservation flow.

Trong custom child reservation của project có `allow_backorder: true`, nên stage đó không phải nơi strict-reject oversell.

## 5. Group-buy chống oversell thế nào?
Project có lock theo:
```text
campaign_id + variant_id
```
để tránh nhiều cart chạy đồng thời vượt quota của cùng campaign/variant.

## 6. Claim voucher chống race condition
Pattern:
```text
check
 ↓
transaction
 ↓
advisory lock
 ↓
check again
 ↓
create/update
 ↓
commit
```

Project dùng PostgreSQL advisory lock:
```sql
SELECT pg_advisory_xact_lock(...)
```

## 7. Redis trong project
Medusa config có Redis-backed:
- cache
- event bus

Không nên nói mọi lock trong project đều là Redis lock nếu chưa xác nhận provider hiện tại.

## 8. Bug multi-instance + webhook
Sticky session chỉ giúp request của cùng browser/session thường quay về cùng backend.

Webhook flow có thể là:
```text
Browser → HAProxy → BE1
External service → n8n → backend
                       ↓
                 có thể BE1/BE2
```

Nếu temporary state nằm ở Redis local từng BE, request qua backend khác có thể không thấy state.

## 9. Ngoài CRUD đã làm gì?
- multi-step order workflow
- concurrency/race-condition handling
- group-buy locking
- payment/shipping integrations
- reporting/aggregate queries
- webhooks/events
- production troubleshooting
