# Redis & Authentication

# Redis

## Redis là gì?
Redis là in-memory data store thường dùng cho:
- cache
- temporary state
- rate limiting
- counter
- distributed coordination/locking
- event/queue infrastructure

## Redis khác PostgreSQL?
PostgreSQL thường là source of truth cho business data. Redis thường dùng cho dữ liệu cần truy cập nhanh hoặc state tạm thời.

## Nhược điểm của Redis
- RAM đắt và có giới hạn
- cache invalidation khó
- có thể stale data
- cần quan tâm persistence/replication
- distributed deployment phức tạp hơn

## Shared Redis quan trọng thế nào?
Nếu:
```text
BE1 → Redis1
BE2 → Redis2
```
thì state không được chia sẻ giữa hai backend.

Nếu nhiều backend cần cùng nhìn thấy state:
```text
BE1 ─┐
     ├→ Shared Redis
BE2 ─┘
```

## Sticky session có thay thế shared state không?
Không. Sticky session là routing strategy, không phải consistency mechanism.

---

# Authentication

## JWT hoạt động thế nào?
```text
Login
  ↓
Server verify credentials
  ↓
Issue JWT
  ↓
Client sends token
  ↓
Server verifies signature + expiration
```

JWT thường gồm:
```text
header.payload.signature
```

JWT thường được ký, không nhất thiết được mã hóa.

## Access token và refresh token
- Access token: sống ngắn, dùng gọi API.
- Refresh token: sống dài hơn, dùng xin access token mới.

## Access token có nhất thiết là JWT không?
Không. Access token là mục đích sử dụng; JWT là một định dạng token.

## Nên lưu token ở đâu?
Trên web:
- refresh token: ưu tiên Secure + HttpOnly + SameSite cookie
- access token: tùy architecture, thường memory hoặc secure cookie

## Cookie là gì?
Cookie là dữ liệu nhỏ browser lưu và có thể tự động gửi kèm request đến server.

Thuộc tính hay gặp:
- HttpOnly
- Secure
- SameSite
- Max-Age / Expires
