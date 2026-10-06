# Frontend, SSR/CSR & CI/CD

## SSR và CSR khác nhau thế nào?
### SSR
Server render HTML có data trước khi gửi browser.

Phù hợp:
- public pages
- SEO-sensitive pages
- product/article/landing pages

### CSR
Browser nhận app + JS, gọi API rồi render UI.

Phù hợp:
- dashboard
- authenticated application
- interactive internal tools

## React có phải CSR, Next.js có phải SSR?
Không hoàn toàn.
- React là UI library; app React truyền thống thường CSR.
- Next.js hỗ trợ nhiều rendering strategies: server rendering, static generation, client rendering, server components.

## CI/CD là gì?
- CI: tự động install/lint/test/build khi push/PR.
- CD: delivery/deployment sau khi CI pass.

Flow thường gặp:
```text
Push
 ↓
CI
 ↓
Install
 ↓
Lint/Test
 ↓
Build
 ↓
Docker image
 ↓
Registry
 ↓
Deploy
 ↓
Health check
```

## Docker là gì?
Docker đóng gói app + dependencies thành container để chạy nhất quán giữa environments.

## Health check để làm gì?
Để load balancer/deployment system biết instance có sẵn sàng nhận traffic hay không.

## Rollback là gì?
Quay lại version trước nếu release mới gây lỗi production.
