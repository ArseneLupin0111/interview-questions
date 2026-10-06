# Production Debugging & System Basics

## Một API chậm thì debug thế nào?
Không tối ưu mù. Trước hết đo để tìm bottleneck.

```text
Measure
  ↓
Backend logic?
  ↓
Database?
  ↓
Redis?
  ↓
External API?
  ↓
Network / payload?
  ↓
CPU / memory / event loop / pool?
```

### Câu trả lời phỏng vấn
> Em sẽ đo tổng response time và timing từng phần để xác định bottleneck. Nếu DB chậm thì kiểm tra query plan, index, JOIN và N+1. Nếu external API chậm thì kiểm tra latency, timeout, retry và khả năng chạy song song. Ngoài ra em kiểm tra cache, payload size, CPU, memory và connection pool.

## Nếu external API chậm?
- timeout hợp lý
- retry có kiểm soát
- Promise.all nếu call độc lập
- background job/event nếu user không cần chờ

## Sentry giúp debug production thế nào?
Sentry ghi nhận:
- stack trace
- environment/release
- request/runtime context
- breadcrumbs
- frequency

Flow:
```text
Production error
   ↓
Sentry event
   ↓
Stack trace + context
   ↓
Correlate with logs/deployments
   ↓
Root cause
```

## HAProxy là gì?
HAProxy thường dùng làm reverse proxy/load balancer đứng trước backend instances.

```text
Client
  ↓
HAProxy
  ├→ BE1
  └→ BE2
```

## Sticky session là gì?
Các request của cùng một session thường được route về cùng backend.

Nhưng nó không loại bỏ race condition vì:
- request concurrent vẫn overlap trên cùng BE
- webhook không nhất thiết có cùng session
- background jobs
- retry
- failover
- client/session khác

## Nginx là gì?
Nginx có thể làm:
- web server
- reverse proxy
- load balancer
- SSL termination
- static file serving
- caching

## Nginx khác HAProxy?
- HAProxy thiên mạnh về proxy/load balancing.
- Nginx vừa là web server vừa reverse proxy/load balancer.
