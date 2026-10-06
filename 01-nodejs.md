# Node.js

## 1. Node.js là gì?
Node.js là JavaScript runtime chạy trên V8, cho phép chạy JavaScript phía server.

### Trả lời phỏng vấn ngắn
> Node.js is a JavaScript runtime built on V8. It is well suited for I/O-heavy backend applications because it uses an event-driven, non-blocking I/O model.

### Follow-up
- Event Loop là gì?
- Single-thread nhưng xử lý nhiều request thế nào?
- CPU-heavy task ảnh hưởng Node.js ra sao?

---

## 2. Event Loop hoạt động thế nào?
Event Loop điều phối việc thực thi callback của các tác vụ bất đồng bộ. Khi Node.js chờ DB, Redis, file hoặc network, main thread không cần đứng chờ mà có thể xử lý công việc khác.

```text
Request
  ↓
JS executes
  ↓
Async I/O
  ↓
Event Loop waits for completion
  ↓
Callback / Promise continuation
```

## 3. async/await có block Node.js không?
Không. `await` chỉ tạm dừng async function hiện tại, không block toàn bộ Node.js process.

## 4. Khi nào dùng Promise.all?
Khi nhiều tác vụ async độc lập với nhau và có thể chạy song song.

```ts
const [user, orders] = await Promise.all([
  getUser(),
  getOrders(),
])
```

## 5. Callback, Promise và async/await khác nhau thế nào?
- Callback: truyền function để chạy sau.
- Promise: biểu diễn kết quả async với pending/fulfilled/rejected.
- async/await: cú pháp dễ đọc hơn trên Promise.
