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

---

# Bộ 30 câu hỏi phỏng vấn CI/CD nâng cao

## CI/CD Fundamentals

### CI, Continuous Delivery và Continuous Deployment khác nhau thế nào?

**Độ khó:** easy

CI tích hợp code thường xuyên và tự chạy kiểm tra. Continuous Delivery đảm bảo artifact luôn sẵn sàng phát hành nhưng production có thể cần phê duyệt. Continuous Deployment tự đưa mọi thay đổi vượt qua các cổng kiểm tra lên production.

**Follow-up:** Continuous Delivery có bắt buộc tự deploy production không?

### Một pipeline CI/CD cơ bản gồm những giai đoạn nào?

**Độ khó:** easy

Trigger từ push/PR → checkout → cài dependencies → lint/unit test → integration test → build artifact → scan → publish → deploy staging → kiểm tra → phê duyệt/deploy production → theo dõi. Các bước cụ thể tùy rủi ro dự án.

**Follow-up:** Bước nào cần chạy trước khi publish artifact?

### Vì sao nên build một lần rồi promote cùng artifact?

**Độ khó:** medium

Build một artifact bất biến (ví dụ image digest) rồi triển khai chính artifact đó qua staging và production để giảm khác biệt giữa các môi trường. Config/secrets được inject lúc chạy, không rebuild theo môi trường.

**Follow-up:** Image tag có đảm bảo bất biến không?

### Pipeline khác workflow thủ công ở điểm nào?

**Độ khó:** easy

Pipeline tự động hóa các bước lặp lại, có log, trạng thái và điều kiện chặn release. Thao tác thủ công dễ thiếu bước, khó audit và tái lập; vẫn có thể giữ manual approval cho production.

**Follow-up:** Khi nào cần manual approval?

### Nên chạy những loại test nào trong CI?

**Độ khó:** medium

Ưu tiên lint, typecheck, unit test nhanh; bổ sung integration/contract test cho database và API; smoke/E2E test ở môi trường phù hợp. Phân tầng để có phản hồi nhanh mà vẫn kiểm soát rủi ro.

**Follow-up:** Test nào nên chạy trước để fail fast?

## GitHub Actions & Pipeline

### Workflow, job, step và runner trong GitHub Actions là gì?

**Độ khó:** easy

Workflow là file YAML trong .github/workflows; job là nhóm step chạy trên runner; step thực thi action hoặc lệnh. Job có thể chạy song song trừ khi dùng needs; step trong một job chạy theo thứ tự.

**Follow-up:** Dùng needs để làm gì?

### on: push và on: pull_request nên dùng thế nào?

**Độ khó:** medium

pull_request thường dùng để kiểm tra code trước merge; push thường chạy khi cập nhật branch và có thể publish/deploy từ branch được phép. Dùng filters branches/paths để hạn chế chạy không cần thiết.

**Follow-up:** Vì sao không deploy production từ PR chưa tin cậy?

### Làm sao để job deploy chỉ chạy khi test pass?

**Độ khó:** easy

Tạo job test, build và deploy, dùng needs: [test, build] cho deploy; đặt điều kiện branch/environment. Khi dependency fail, job phụ thuộc thường bị skip.

**Follow-up:** Nếu muốn deploy chỉ trên main thì dùng điều kiện nào?

### Cache và artifact trong GitHub Actions khác nhau ra sao?

**Độ khó:** medium

Cache tăng tốc bằng cách tái sử dụng dependencies/build cache, có thể bị miss/evict. Artifact lưu output của một run để tải hoặc truyền giữa jobs. Release nên dựa trên artifact/image có định danh rõ, không xem cache là nguồn phát hành đáng tin cậy.

**Follow-up:** Khi nào dùng upload-artifact?

### Làm sao tránh hai pipeline deploy chồng lên nhau?

**Độ khó:** hard

Dùng concurrency group cho cùng môi trường và chọn cancel-in-progress phù hợp; có thể kết hợp deployment lock và kiểm tra version. Tránh hủy một deploy giữa chừng nếu hệ thống không hỗ trợ recovery an toàn.

**Follow-up:** Khi nào không nên cancel-in-progress?

### Self-hosted runner có rủi ro gì?

**Độ khó:** hard

Runner tự quản lý cho phép truy cập mạng nội bộ nhưng tăng rủi ro lộ credential, persistence của mã độc và nhiễm bẩn workspace. Hạn chế chạy code PR không tin cậy, cô lập runner, dùng runner ephemeral và quyền tối thiểu.

**Follow-up:** Vì sao không chạy PR fork trên runner có quyền production?

## Docker & Container Registry

### Docker multi-stage build có lợi ích gì trong CI/CD?

**Độ khó:** easy

Stage build chứa compiler/toolchain, stage runtime chỉ copy binary hoặc output cần thiết. Image cuối nhỏ hơn, ít dependency dư và giảm bề mặt tấn công; vẫn cần scan và cập nhật base image.

**Follow-up:** Vì sao không copy toàn bộ source vào runtime image?

### Tag latest có phù hợp để deploy production không?

**Độ khó:** medium

Không nên dựa duy nhất vào latest vì tag có thể bị ghi đè và khó tái hiện release. Gắn commit SHA/semver và tốt nhất pin image digest; lưu lại version trước để rollback.

**Follow-up:** Tag và digest khác nhau thế nào?

### Registry đóng vai trò gì trong pipeline?

**Độ khó:** easy

Registry lưu và phân phối OCI/Docker images. CI build và push image sau khi test; máy deploy pull đúng digest đã kiểm tra. Phân quyền push/pull riêng, quản lý retention và provenance.

**Follow-up:** Tại sao VPS nên pull image thay vì build tại chỗ?

### Làm sao giảm downtime khi cập nhật Docker container?

**Độ khó:** hard

Chạy phiên bản mới song song, chờ readiness rồi chuyển traffic qua reverse proxy/load balancer, sau đó drain bản cũ. Docker Compose với một replica và thay container trực tiếp không tự đảm bảo zero downtime.

**Follow-up:** Điều gì xảy ra nếu container mới healthy nhưng chưa ready?

### Làm sao cập nhật Go agent chạy trực tiếp trên VPS?

**Độ khó:** hard

CI build binary theo kiến trúc, ký/checksum, publish version; updater trên host tải vào đường dẫn tạm, xác thực, thay thế atomically và restart qua systemd. Cần giữ binary cũ, health check, rollback và tương thích giao thức agent-server.

**Follow-up:** Nếu agent đang thực thi Docker command thì update thế nào?

## Deployment Strategies

### Rolling, blue-green và canary deployment khác nhau thế nào?

**Độ khó:** medium

Rolling thay dần các instance; blue-green duy trì hai môi trường và chuyển traffic; canary cho một phần traffic tới bản mới rồi tăng dần. Chọn theo hạ tầng, chi phí, khả năng quan sát và mức độ chấp nhận rủi ro.

**Follow-up:** Chiến lược nào rollback traffic nhanh nhất?

### Readiness, liveness và startup probe khác nhau thế nào?

**Độ khó:** medium

Readiness quyết định có nhận traffic; liveness phát hiện process cần restart; startup cho phép app khởi động lâu trước khi áp dụng kiểm tra khác. Thiết kế sai có thể gây restart loop hoặc chuyển traffic quá sớm.

**Follow-up:** Có nên dùng một endpoint cho mọi probe?

### Rollback application khác rollback database như thế nào?

**Độ khó:** hard

Rollback app thường là triển khai lại image/binary cũ. Database migration có thể không đảo ngược an toàn khi đã xóa hoặc biến đổi dữ liệu; dùng expand-contract, migration tương thích ngược và backup/restore có kế hoạch.

**Follow-up:** Nếu release mới đã ghi dữ liệu theo schema mới thì sao?

### Feature flag hỗ trợ release an toàn ra sao?

**Độ khó:** medium

Tách việc deploy code khỏi bật tính năng: code có thể được triển khai trước rồi mở theo user/percentage. Có thể tắt nhanh tính năng lỗi mà không cần rollback toàn bộ; vẫn cần dọn flag và test cả hai trạng thái.

**Follow-up:** Feature flag có thay thế rollback được không?

### Làm thế nào để đảm bảo zero-downtime deployment?

**Độ khó:** hard

Cần ít nhất một instance khỏe trong suốt chuyển đổi, readiness chính xác, traffic draining, graceful shutdown, session/state dùng chung và database tương thích. Zero downtime là thuộc tính toàn hệ thống, không chỉ lệnh docker compose up.

**Follow-up:** WebSocket hoặc long-running request cần xử lý ra sao?

## Security & Secrets

### Vì sao không nên lưu secrets trong repository hoặc Docker image?

**Độ khó:** easy

Secrets có thể tồn tại trong Git history, build layers, logs và artifact. Dùng secret store, giới hạn quyền, rotate khi lộ; tránh in ra log và không truyền secrets vào build args nếu không cần.

**Follow-up:** Nếu secret đã commit rồi thì phải làm gì?

### OIDC trong GitHub Actions giúp bảo mật cloud deploy thế nào?

**Độ khó:** hard

OIDC cho phép workflow đổi identity token lấy credential ngắn hạn theo trust policy thay vì lưu cloud access key dài hạn. Giới hạn theo repo, branch, environment và audience; chỉ cấp quyền cần thiết.

**Follow-up:** Vì sao trust policy phải giới hạn branch/environment?

### Nguyên tắc least privilege áp dụng vào CI/CD ra sao?

**Độ khó:** medium

Mỗi job chỉ có quyền tối thiểu: read code cho test, packages:write cho publish, quyền deploy chỉ ở job/environment phù hợp. Giới hạn GITHUB_TOKEN permissions và dùng approval/protected environment khi cần.

**Follow-up:** Vì sao không cấp write-all cho toàn workflow?

### Supply-chain security trong pipeline gồm những gì?

**Độ khó:** hard

Pin action theo commit SHA, cập nhật dependencies, scan lỗ hổng, tạo SBOM/provenance, ký/verify artifact và hạn chế nguồn build không tin cậy. Scan không bảo đảm an toàn tuyệt đối; cần chính sách và xử lý findings.

**Follow-up:** Pin action theo tag có rủi ro gì?

## Troubleshooting & Production

### CI pass nhưng ứng dụng deploy xong không truy cập được, debug thế nào?

**Độ khó:** medium

Kiểm tra DNS/TLS/reverse proxy, port mapping, container/process status, readiness, log, env/secrets, kết nối DB và firewall. Đối chiếu version/digest đang chạy; rollback nếu ảnh hưởng người dùng và chưa xử lý kịp.

**Follow-up:** Nếu health check 200 nhưng API thật trả 500 thì sao?

### Pipeline bị flaky test thì xử lý ra sao?

**Độ khó:** medium

Thu thập tần suất và điều kiện tái hiện, cố định clock/seed, cô lập state, tránh phụ thuộc network thật, kiểm tra race/timing. Retry tạm thời để giảm nhiễu nhưng không che lỗi; quarantine có thời hạn và owner.

**Follow-up:** Vì sao tăng timeout không phải cách sửa triệt để?

### Deploy thành công nhưng VPS vẫn chạy Go agent phiên bản cũ vì sao?

**Độ khó:** hard

CI build image backend không tự cập nhật binary agent cài trên host. Cần kiểm tra version report, kênh phát hành agent, updater/systemd, checksum và trạng thái kết nối. Thiết kế tương thích phiên bản để server mới vẫn làm việc với agent cũ trong giai đoạn rollout.

**Follow-up:** Làm sao phát hiện agent nào chưa được nâng cấp?

### Làm sao deploy đồng thời backend và agent mà không làm gián đoạn tác vụ?

**Độ khó:** hard

Phát hành API/protocol tương thích trước, rollout agent theo đợt; agent ngừng nhận job mới, chờ job đang chạy hoặc checkpoint, rồi restart. Dùng idempotency/lease/ACK để tránh mất hoặc thực thi trùng lệnh sau reconnect.

**Follow-up:** Nếu agent crash trước ACK thì xử lý thế nào?

### Những metrics nào nên theo dõi sau deployment?

**Độ khó:** medium

Theo dõi error rate, latency p95/p99, throughput, saturation, restart/OOM, queue lag và business metrics. So sánh với baseline và đặt ngưỡng rollback; log/tracing kèm release version giúp tìm nguyên nhân.

**Follow-up:** Khi nào tự động rollback thay vì chờ người vận hành?
