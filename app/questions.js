window.INTERVIEW_QUESTIONS = [
  {
    "id": "node-event-loop",
    "category": "Node.js",
    "difficulty": "medium",
    "q": "Event Loop trong Node.js hoạt động như thế nào?",
    "a": "Event Loop là cơ chế giúp Node.js xử lý nhiều tác vụ I/O mà không cần tạo một thread JavaScript riêng cho mỗi request.\n\nCách hiểu đơn giản:\n1. JavaScript chạy trên main thread.\n2. Khi gặp tác vụ I/O như gọi database, Redis, đọc file hoặc gọi HTTP API, Node.js giao phần chờ đó cho hệ thống bên dưới.\n3. Main thread không đứng chờ mà tiếp tục xử lý công việc khác.\n4. Khi I/O hoàn thành, callback hoặc phần tiếp theo của Promise được đưa vào hàng đợi để Event Loop cho chạy khi phù hợp.\n\nVí dụ: API gọi PostgreSQL mất 100 ms. Trong 100 ms đó, Node.js không cần ngồi chờ query xong mà vẫn có thể nhận request khác.\n\nĐiểm cần nhớ khi interview: Node.js phù hợp với I/O-heavy workload, nhưng code CPU-heavy chạy đồng bộ lâu vẫn có thể block Event Loop.",
    "follow": [
      "async/await có block Event Loop không?",
      "CPU-heavy task ảnh hưởng Node.js thế nào?"
    ],
    "choices": [
      "Event Loop điều phối callback của tác vụ async và cho phép main thread tiếp tục xử lý trong lúc chờ I/O.",
      "Event Loop tạo một thread mới cho mỗi HTTP request.",
      "Event Loop biến mọi đoạn code JavaScript thành code chạy song song.",
      "Event Loop chỉ được dùng để xử lý database query."
    ],
    "correctIndex": 0
  },
  {
    "id": "node-await",
    "category": "Node.js",
    "difficulty": "easy",
    "q": "async/await có block Node.js không?",
    "a": "Không. await không block toàn bộ Node.js process.\n\nKhi một async function gặp await, chỉ phần thực thi của function đó tạm dừng cho tới khi Promise hoàn thành. Trong thời gian này Event Loop vẫn có thể xử lý request, timer và callback khác.\n\nVí dụ:\nconst user = await getUserFromDB();\n\nTrong lúc database đang xử lý, Node.js vẫn có thể phục vụ request khác.\n\nĐiểm dễ nhầm: await không đồng nghĩa với tạo thread mới. Và nếu bạn chạy một vòng lặp CPU-heavy rất lâu trước hoặc sau await thì đoạn code đồng bộ đó vẫn có thể block Event Loop.",
    "follow": [
      "Ví dụ nào thực sự block Event Loop?"
    ],
    "choices": [
      "Có, await luôn block toàn bộ Node.js process.",
      "Không, await chỉ tạm dừng async function hiện tại; CPU-heavy synchronous code mới có thể block Event Loop.",
      "Không, vì await luôn tạo worker thread mới.",
      "Có, nhưng chỉ khi Promise resolve thành công."
    ],
    "correctIndex": 1
  },
  {
    "id": "node-promise-all",
    "category": "Node.js",
    "difficulty": "easy",
    "q": "Khi nào nên dùng Promise.all()?",
    "a": "Promise.all() phù hợp khi nhiều tác vụ async độc lập với nhau và có thể bắt đầu cùng lúc.\n\nVí dụ bạn cần lấy user và danh sách orders, nhưng hai thao tác không phụ thuộc nhau:\nawait Promise.all([getUser(), getOrders()])\n\nNếu mỗi call mất khoảng 500 ms, chạy tuần tự có thể mất gần 1000 ms; chạy song song có thể gần 500 ms, chưa tính overhead.\n\nKhông nên dùng Promise.all khi tác vụ sau cần kết quả của tác vụ trước, hoặc khi bắn quá nhiều request song song có thể gây quá tải database/external API.\n\nĐiểm cần nhớ: Promise.all giúp giảm waiting time cho các I/O độc lập, nhưng không tự biến JavaScript thành multi-thread CPU execution.",
    "follow": [
      "Khi nào không nên dùng Promise.all?"
    ],
    "choices": [
      "Khi các tác vụ phải chạy tuần tự vì tác vụ sau phụ thuộc tác vụ trước.",
      "Khi muốn retry một Promise thất bại.",
      "Khi nhiều tác vụ async độc lập có thể chạy song song.",
      "Khi muốn block Event Loop cho đến khi tất cả tác vụ hoàn thành."
    ],
    "correctIndex": 2
  },
  {
    "id": "nestjs-di",
    "category": "NestJS",
    "difficulty": "medium",
    "q": "Dependency Injection trong NestJS là gì?",
    "a": "Dependency Injection là cách một class nhận dependency từ bên ngoài thay vì tự tạo dependency bằng new.\n\nVí dụ OrderService cần UserService. Thay vì viết new UserService(), NestJS container sẽ quản lý UserService và inject instance vào constructor của OrderService.\n\nLợi ích:\n- giảm coupling giữa các class;\n- dễ mock dependency khi unit test;\n- dễ thay implementation;\n- lifecycle của dependency được framework quản lý.\n\nTrong NestJS, các class được container quản lý thường là provider và hay được đánh dấu bằng @Injectable().\n\nĐiểm cần nhớ: Service là một vai trò thường gặp của Provider; Provider là khái niệm rộng hơn trong cơ chế DI của NestJS.",
    "follow": [
      "@Injectable() có tác dụng gì?",
      "Provider khác Service thế nào?"
    ],
    "choices": [
      "Class tự tạo toàn bộ dependency bằng new để giảm coupling.",
      "Dependency được NestJS container tạo/quản lý và inject vào class thay vì class tự tạo.",
      "DI là cách NestJS serialize request body.",
      "DI chỉ là cơ chế import module."
    ],
    "correctIndex": 1
  },
  {
    "id": "rest-put-patch",
    "category": "REST API",
    "difficulty": "easy",
    "q": "PUT và PATCH khác nhau như thế nào?",
    "a": "PUT và PATCH đều dùng để cập nhật resource nhưng ý nghĩa thường khác nhau.\n\nPUT thường được hiểu là gửi representation mới của toàn bộ resource. Nếu gửi lại cùng một PUT nhiều lần, kết quả cuối thường vẫn giống nhau nên PUT được thiết kế theo hướng idempotent.\n\nPATCH dùng để cập nhật một phần resource. Ví dụ chỉ đổi name mà không cần gửi lại email, address và các field khác.\n\nVí dụ:\nPUT /users/1 → gửi toàn bộ user\nPATCH /users/1 → gửi { \"name\": \"Son\" }\n\nĐiểm cần nhớ: đây là convention của REST. Implementation thực tế có thể khác, nhưng khi interview nên nêu được ý nghĩa semantic này.",
    "choices": [
      "PUT thường thay thế toàn bộ resource, PATCH thường cập nhật một phần resource.",
      "PUT chỉ dùng để đọc resource, PATCH để xóa resource.",
      "PUT và PATCH luôn giống hệt nhau.",
      "PATCH bắt buộc phải idempotent còn PUT thì không."
    ],
    "correctIndex": 0
  },
  {
    "id": "db-orm",
    "category": "Database",
    "difficulty": "easy",
    "q": "ORM là gì?",
    "a": "ORM là viết tắt của Object-Relational Mapping. Nó giúp ánh xạ object/class trong code với table/row trong relational database.\n\nThay vì tự viết SQL cho mọi thao tác CRUD, bạn có thể gọi API của ORM để query, create, update hoặc delete dữ liệu.\n\nLợi ích:\n- code nhanh hơn cho CRUD;\n- giảm boilerplate SQL;\n- dễ làm việc với entity/relation.\n\nNhược điểm:\n- abstraction có thể che mất query thực tế;\n- dễ tạo query không tối ưu;\n- các báo cáo hoặc PostgreSQL-specific feature đôi khi raw SQL phù hợp hơn.\n\nĐiểm cần nhớ: ORM không thay thế kiến thức SQL. Khi query phức tạp hoặc cần tối ưu performance, vẫn phải hiểu SQL mà ORM sinh ra.",
    "follow": [
      "Khi nào dùng raw SQL thay ORM?"
    ],
    "choices": [
      "ORM là một loại database in-memory.",
      "ORM là cơ chế cache query bằng Redis.",
      "ORM map object/class trong code với table/row của relational database.",
      "ORM là cách PostgreSQL tạo index tự động."
    ],
    "correctIndex": 2
  },
  {
    "id": "db-n1",
    "category": "Database",
    "difficulty": "medium",
    "q": "N+1 query là gì?",
    "a": "N+1 query xảy ra khi hệ thống chạy 1 query để lấy danh sách, sau đó chạy thêm 1 query cho từng item trong danh sách.\n\nVí dụ:\n- 1 query lấy 100 orders;\n- sau đó với mỗi order lại query customer;\n→ tổng cộng 101 queries.\n\nVấn đề là số round-trip tới database tăng mạnh, latency tăng và database phải xử lý nhiều query nhỏ không cần thiết.\n\nCách xử lý phổ biến:\n- JOIN;\n- eager loading relation;\n- batch query bằng IN (...);\n- tùy ORM có thể populate/include relation đúng cách.\n\nĐiểm cần nhớ: N+1 thường không lộ rõ với ít dữ liệu nhưng trở nên nghiêm trọng khi số item tăng.",
    "follow": [
      "Có những cách nào để xử lý N+1?"
    ],
    "choices": [
      "Một query được chạy trên N database khác nhau.",
      "1 query lấy danh sách rồi chạy thêm N query cho từng phần tử.",
      "N query được gộp thành 1 transaction.",
      "Một query có N điều kiện WHERE."
    ],
    "correctIndex": 1
  },
  {
    "id": "db-slow",
    "category": "Database",
    "difficulty": "medium",
    "q": "Nếu xác định database query chậm thì em làm gì?",
    "a": "Nếu xác định database là bottleneck, bước tiếp theo không phải là thêm index ngay mà là tìm nguyên nhân cụ thể.\n\nFlow hợp lý:\n1. Xem query thực tế đang chạy.\n2. Dùng EXPLAIN hoặc EXPLAIN ANALYZE để xem execution plan.\n3. Kiểm tra database có full table scan quá nhiều row không.\n4. Xem index hiện tại có được sử dụng không.\n5. Kiểm tra JOIN, ORDER BY, WHERE, N+1 và số row/column trả về.\n6. Sau đó mới chọn cách tối ưu phù hợp.\n\nVí dụ nếu query filter theo customer_id thường xuyên nhưng bảng lớn và execution plan cho thấy sequential scan, index có thể hữu ích.\n\nĐiểm cần nhớ: tối ưu dựa trên measurement và execution plan, không dựa trên phỏng đoán.",
    "follow": [
      "Có phải query chậm thì cứ thêm index không?"
    ],
    "choices": [
      "Thêm index ngay vào mọi column của bảng.",
      "Restart PostgreSQL trước rồi mới xem query.",
      "Dùng EXPLAIN ANALYZE và kiểm tra scan, index, JOIN, N+1 và lượng dữ liệu trả về.",
      "Chuyển toàn bộ dữ liệu sang Redis."
    ],
    "correctIndex": 2
  },
  {
    "id": "db-index",
    "category": "Database",
    "difficulty": "medium",
    "q": "Khi nào nên dùng index?",
    "a": "Index là cấu trúc dữ liệu giúp database tìm row nhanh hơn mà không phải scan toàn bộ table trong nhiều trường hợp.\n\nThường cân nhắc index cho column xuất hiện nhiều trong:\n- WHERE;\n- JOIN;\n- ORDER BY;\n- lookup theo ID hoặc foreign key.\n\nVí dụ hệ thống thường query orders theo customer_id thì index trên customer_id có thể giảm số row cần scan.\n\nTrade-off:\n- tốn thêm storage;\n- INSERT/UPDATE/DELETE tốn thêm chi phí vì index cũng phải được cập nhật;\n- quá nhiều index có thể làm write chậm và khó maintain.\n\nĐiểm cần nhớ: không phải cứ có index là database chắc chắn dùng index; optimizer sẽ quyết định dựa trên cost.",
    "choices": [
      "Index mọi column để query luôn nhanh nhất.",
      "Cân nhắc index các column hay dùng trong WHERE/JOIN/ORDER BY/lookup và chấp nhận chi phí write.",
      "Index chỉ có tác dụng với INSERT.",
      "Index làm SELECT chậm hơn nhưng UPDATE nhanh hơn."
    ],
    "correctIndex": 1
  },
  {
    "id": "redis-use",
    "category": "Redis",
    "difficulty": "easy",
    "q": "Redis thường được dùng để làm gì?",
    "a": "Redis là in-memory data store, nghĩa là dữ liệu chủ yếu được truy cập từ RAM nên rất nhanh.\n\nRedis thường dùng cho:\n- cache;\n- temporary state;\n- counters;\n- rate limiting;\n- distributed coordination;\n- event/queue infrastructure.\n\nVí dụ cache:\nRequest đầu tiên → query PostgreSQL → lưu kết quả vào Redis.\nRequest sau → lấy từ Redis → giảm latency và tải cho database.\n\nĐiểm cần nhớ: Redis thường không thay PostgreSQL làm source of truth cho business data. Nó thường bổ sung cho database chính.",
    "project": "Trong PostGifty, Medusa config có Redis-backed cache và Redis event bus.",
    "choices": [
      "Redis chủ yếu là relational database thay thế PostgreSQL.",
      "Redis thường dùng cho cache, temporary state, counter, rate limiting và distributed coordination.",
      "Redis chỉ dùng để lưu file tĩnh.",
      "Redis chỉ dùng trong frontend."
    ],
    "correctIndex": 1
  },
  {
    "id": "redis-shared",
    "category": "Redis",
    "difficulty": "medium",
    "q": "Shared Redis khác local Redis giữa nhiều backend instance như thế nào?",
    "a": "Nếu mỗi backend instance dùng một Redis local riêng, state giữa các instance không tự động giống nhau.\n\nVí dụ:\nBE1 → Redis1\nBE2 → Redis2\n\nBE1 ghi một temporary code vào Redis1. Nếu request tiếp theo đi vào BE2 thì BE2 đọc Redis2 và có thể không thấy code đó.\n\nShared Redis giải quyết bằng cách:\nBE1 ─┐\n     ├→ Shared Redis\nBE2 ─┘\n\nKhi đó các backend cùng đọc/ghi một state chung.\n\nĐiểm cần nhớ: sticky session chỉ ảnh hưởng routing request, không đồng bộ dữ liệu giữa Redis local. Vì vậy webhook, background job hoặc failover vẫn có thể gặp inconsistency nếu state không shared.",
    "project": "Đây là điểm quan trọng khi webhook có thể đi vào backend instance khác browser request.",
    "follow": [
      "Sticky session có thay thế shared Redis được không?"
    ],
    "choices": [
      "Shared Redis khiến mỗi backend có một state hoàn toàn riêng.",
      "Local Redis giữa nhiều BE luôn tự đồng bộ với nhau.",
      "Shared Redis cho phép nhiều backend instance cùng truy cập một state chung.",
      "Shared Redis chỉ có ý nghĩa khi hệ thống có một backend instance."
    ],
    "correctIndex": 2
  },
  {
    "id": "auth-jwt",
    "category": "Authentication",
    "difficulty": "easy",
    "q": "JWT authentication hoạt động như thế nào?",
    "a": "JWT là một format token thường dùng để truyền claims giữa client và server.\n\nFlow cơ bản:\n1. User login.\n2. Server verify credentials.\n3. Server tạo và ký JWT.\n4. Client gửi token trong các request sau.\n5. Server verify signature, expiration và các claims cần thiết.\n\nJWT thường có dạng:\nheader.payload.signature\n\nĐiểm quan trọng: JWT thường được ký để phát hiện việc sửa nội dung, nhưng payload không mặc định được mã hóa. Vì vậy không nên đặt secret nhạy cảm trực tiếp trong payload.\n\nĐiểm cần nhớ khi interview: server tin token sau khi verify signature và các điều kiện như expiration, issuer/audience nếu hệ thống dùng chúng.",
    "follow": [
      "JWT có được mã hóa không?",
      "Access token có nhất thiết là JWT không?"
    ],
    "choices": [
      "Server cấp JWT sau login; client gửi token và server verify signature/expiration ở request sau.",
      "JWT bắt buộc được lưu trong database cho mỗi request.",
      "JWT luôn được mã hóa nên payload không thể đọc.",
      "JWT chỉ được dùng cho refresh token."
    ],
    "correctIndex": 0
  },
  {
    "id": "auth-refresh",
    "category": "Authentication",
    "difficulty": "medium",
    "q": "Access token và refresh token khác nhau thế nào?",
    "a": "Access token và refresh token phục vụ hai mục đích khác nhau.\n\nAccess token:\n- dùng để gọi API;\n- thường lifetime ngắn;\n- nếu bị lộ thì thời gian khai thác bị giới hạn hơn.\n\nRefresh token:\n- lifetime dài hơn;\n- dùng để xin access token mới khi access token hết hạn;\n- cần được bảo vệ kỹ hơn.\n\nFlow:\nLogin → nhận access token + refresh token\nAccess token hết hạn → gửi refresh token → nhận access token mới\n\nTrên web, refresh token thường phù hợp với Secure + HttpOnly cookie để giảm khả năng JavaScript phía client đọc trực tiếp.\n\nĐiểm cần nhớ: access token không bắt buộc phải là JWT; JWT chỉ là một format phổ biến.",
    "follow": [
      "Nên lưu refresh token ở đâu trên web?"
    ],
    "choices": [
      "Access token sống dài hơn và dùng để tạo refresh token.",
      "Refresh token được gửi trong mọi API request thay cho access token.",
      "Access token thường sống ngắn để gọi API; refresh token sống dài hơn để xin access token mới.",
      "Hai token luôn có cùng mục đích và lifetime."
    ],
    "correctIndex": 2
  },
  {
    "id": "api-slow",
    "category": "Production",
    "difficulty": "medium",
    "q": "Một API bị chậm ở production thì em debug như thế nào?",
    "a": "Khi API chậm ở production, mục tiêu đầu tiên là xác định bottleneck chứ không tối ưu ngay một thành phần bất kỳ.\n\nFlow debug:\n1. Đo tổng response time.\n2. Thêm timing/log/tracing cho từng bước.\n3. Xem thời gian nằm ở business logic, database, Redis, external API hay network/payload.\n4. Kiểm tra tài nguyên server như CPU, memory, event loop lag và connection pool nếu cần.\n5. Tối ưu đúng bottleneck đã đo được.\n\nVí dụ:\nAPI mất 2 giây.\n- DB: 80 ms\n- Redis: 5 ms\n- external API: 1.7 s\n→ bottleneck rõ ràng nằm ở external API chứ không phải database.\n\nĐiểm cần nhớ: câu trả lời tốt trong interview nên bắt đầu bằng “measure first”.",
    "follow": [
      "Nếu DB chậm thì làm gì?",
      "Nếu external API chậm thì sao?",
      "Redis cache có thể giúp thế nào?"
    ],
    "choices": [
      "Tối ưu database ngay vì API chậm thường luôn do DB.",
      "Đo timing để xác định bottleneck ở business logic, DB, Redis, external API, payload/network hoặc tài nguyên server.",
      "Tăng timeout của API lên thật cao.",
      "Cache toàn bộ response trước khi đo."
    ],
    "correctIndex": 1
  },
  {
    "id": "external-api",
    "category": "Production",
    "difficulty": "medium",
    "q": "Nếu external API chậm thì xử lý thế nào?",
    "a": "Nếu external API chậm, trước hết cần xác nhận latency của external service thực sự chiếm phần lớn response time.\n\nCác cách xử lý:\n- đặt timeout để request không treo quá lâu;\n- retry có kiểm soát cho lỗi phù hợp;\n- dùng exponential backoff nếu cần;\n- các call độc lập có thể chạy song song bằng Promise.all;\n- tác vụ không cần user chờ có thể chuyển sang background job/event-driven flow.\n\nKhông nên retry vô hạn vì có thể làm external service càng quá tải và khiến request kéo dài hơn.\n\nĐiểm cần nhớ: cần phân biệt lỗi tạm thời có thể retry với lỗi logic như 400 Bad Request thường không nên retry.",
    "choices": [
      "Không đặt timeout để external API có đủ thời gian trả lời.",
      "Đo latency, đặt timeout, retry có kiểm soát và chạy song song các call độc lập khi phù hợp.",
      "Luôn retry vô hạn nếu request fail.",
      "Chuyển mọi external call sang synchronous CPU task."
    ],
    "correctIndex": 1
  },
  {
    "id": "sentry",
    "category": "Production",
    "difficulty": "easy",
    "q": "Sentry giúp debug production như thế nào?",
    "a": "Sentry là công cụ observability tập trung vào error tracking và performance monitoring.\n\nKhi production xảy ra exception, Sentry có thể ghi lại:\n- stack trace;\n- environment/release;\n- request/runtime context;\n- breadcrumbs;\n- tần suất lỗi.\n\nFlow debug thường là:\nError → xem issue trong Sentry → đọc stack trace → xem context/breadcrumbs → đối chiếu logs hoặc deployment → tìm root cause.\n\nĐiểm cần nhớ: Sentry giúp thu hẹp vị trí và hoàn cảnh lỗi, nhưng không tự động thay thế việc đọc code, logs hoặc reproduce bug.",
    "choices": [
      "Sentry chủ yếu dùng để load balance request.",
      "Sentry thay thế PostgreSQL transaction log.",
      "Sentry ghi nhận exception, stack trace và runtime context để hỗ trợ tìm root cause production.",
      "Sentry chỉ dùng để viết unit test."
    ],
    "correctIndex": 2
  },
  {
    "id": "haproxy",
    "category": "System Design",
    "difficulty": "easy",
    "q": "HAProxy dùng để làm gì?",
    "a": "HAProxy thường đứng trước nhiều backend instance và làm reverse proxy/load balancer.\n\nVí dụ:\nClient\n  ↓\nHAProxy\n  ├→ BE1\n  └→ BE2\n\nNó có thể phân phối traffic theo round-robin hoặc strategy khác, thực hiện health check và tránh gửi request tới instance không healthy.\n\nSticky session cũng có thể được cấu hình để request của một session thường quay lại cùng backend.\n\nĐiểm cần nhớ: HAProxy giải quyết routing/load balancing; nó không tự đồng bộ state giữa các backend instance.",
    "choices": [
      "HAProxy thường làm reverse proxy/load balancer trước nhiều backend instance.",
      "HAProxy là ORM cho PostgreSQL.",
      "HAProxy là JavaScript runtime.",
      "HAProxy chỉ dùng để tạo Docker image."
    ],
    "correctIndex": 0
  },
  {
    "id": "sticky",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Sticky session có giải quyết consistency giữa các backend instance không?",
    "a": "Sticky session là cơ chế cố gắng route các request thuộc cùng một session về cùng backend instance.\n\nNó hữu ích khi application còn giữ một số state local theo session, nhưng không phải là giải pháp consistency hoàn chỉnh.\n\nCác trường hợp vẫn có thể vào instance khác:\n- webhook từ external service;\n- background job;\n- retry;\n- failover khi instance chết;\n- request không mang cùng cookie/session key.\n\nVì vậy nếu một state cần được nhiều instance cùng truy cập, shared storage như Redis/database vẫn đáng tin cậy hơn.\n\nTrong flow Zalo → n8n → backend, webhook là request mới nên không nhất thiết có cùng sticky-session context với browser request ban đầu.",
    "project": "Trong flow Zalo → n8n → backend, request webhook không nhất thiết mang context sticky-session của browser.",
    "choices": [
      "Có, sticky session đảm bảo mọi webhook và background job luôn về đúng instance.",
      "Không, sticky session chỉ là routing strategy và không phải consistency mechanism.",
      "Có, vì sticky session đồng bộ Redis local giữa các backend.",
      "Có, miễn là hệ thống dùng round-robin."
    ],
    "correctIndex": 1
  },
  {
    "id": "post-order",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Mô tả multi-shop order flow của PostGifty.",
    "a": "Trong flow multi-shop order, một cart có thể chứa sản phẩm thuộc nhiều shop nhưng hệ thống vẫn cần xử lý checkout như một transaction/business flow thống nhất.\n\nFlow chính:\n1. Validate request như shipping/promotion và dữ liệu cart.\n2. Lock cart để tránh cùng một cart bị checkout đồng thời.\n3. Complete/tạo parent order.\n4. Group line items theo shop.\n5. Tạo child order cho từng shop.\n6. Tiếp tục các bước liên quan như payment, shipping và reservation theo workflow của hệ thống.\n7. Release lock khi flow hoàn tất hoặc fail theo cơ chế tương ứng.\n\nÝ nghĩa parent/child order là giữ được một checkout từ góc nhìn user nhưng vẫn tách fulfillment/merchant processing theo từng shop.\n\nĐiểm cần nhớ: cart lock chủ yếu chống duplicate checkout của cùng cart; nó không tự giải quyết mọi loại inventory contention giữa các cart khác nhau.",
    "follow": [
      "Nếu cùng cart bị checkout hai lần thì sao?",
      "Nếu hai cart khác nhau tranh last stock thì sao?"
    ],
    "choices": [
      "Validate → lock cart → complete parent order → group items theo shop → tạo child orders → xử lý các bước liên quan.",
      "Tạo child order trước, sau đó mới validate cart.",
      "Mỗi shop bắt buộc phải có một cart riêng từ frontend.",
      "Không cần parent order vì tất cả item luôn thuộc một shop."
    ],
    "correctIndex": 0
  },
  {
    "id": "post-cart-lock",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Lock cart_id giải quyết vấn đề gì và không giải quyết vấn đề gì?",
    "a": "Lock theo cart_id nhằm bảo vệ critical section của checkout cho cùng một cart.\n\nVí dụ user double-click nút thanh toán hoặc request bị retry:\nRequest A ─┐\n           ├→ cùng cart\nRequest B ─┘\n\nNếu không có lock, cả hai request có thể cùng vượt qua kiểm tra ban đầu và tạo duplicate order.\n\nKhi có cart lock, chỉ một flow được xử lý tại một thời điểm cho cart đó.\n\nNhưng hai cart khác nhau vẫn có hai cart_id khác nhau. Vì vậy nếu chúng cùng tranh last stock, cart lock không serialize hai request đó với nhau.\n\nĐiểm cần nhớ: phải chọn lock key theo resource thực sự cần bảo vệ. cart_id chỉ bảo vệ cart, không phải toàn bộ inventory.",
    "follow": [
      "Vậy inventory contention được xử lý ở đâu?"
    ],
    "choices": [
      "Lock cart_id giải quyết mọi trường hợp oversell giữa mọi cart.",
      "Lock cart_id chỉ dùng để cache cart.",
      "Lock cart_id giúp tránh cùng cart checkout đồng thời nhưng không tự giải quyết hai cart khác nhau tranh cùng inventory.",
      "Lock cart_id chỉ có tác dụng trên frontend."
    ],
    "correctIndex": 2
  },
  {
    "id": "post-groupbuy",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Group-buy chống oversell như thế nào?",
    "a": "Group-buy có một loại contention khác: nhiều cart khác nhau có thể cùng cố mua quota của cùng campaign và variant.\n\nVì vậy lock theo cart_id chưa đủ. Project dùng lock theo:\ncampaign_id + variant_id\n\nÝ tưởng là mọi request cạnh tranh cùng một quota phải đi qua cùng lock key. Khi một request đang kiểm tra/cập nhật quota, request cạnh tranh phải chờ.\n\nĐiều này giúp tránh tình huống hai request cùng đọc “còn 1 slot”, cả hai đều pass rồi cùng ghi, dẫn tới oversell.\n\nĐiểm cần nhớ: distributed/concurrency lock chỉ hiệu quả khi lock key đại diện đúng shared resource đang bị tranh chấp.",
    "follow": [
      "Tại sao lock cart_id chưa đủ?"
    ],
    "choices": [
      "Lock theo campaign_id + variant_id để tránh nhiều cart vượt quota cùng campaign/variant.",
      "Chỉ lock theo user_id.",
      "Không dùng lock; chỉ dựa vào frontend disable button.",
      "Chỉ dùng sticky session."
    ],
    "correctIndex": 0
  },
  {
    "id": "post-voucher",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Voucher claim xử lý race condition như thế nào?",
    "a": "Race condition voucher thường xảy ra theo kiểu:\nRequest A và B cùng check thấy user chưa claim → cả hai cùng tạo claim.\n\nProject xử lý theo pattern:\n1. Check ban đầu.\n2. Bắt đầu transaction.\n3. Lấy PostgreSQL advisory lock.\n4. Check lại điều kiện sau khi đã có lock.\n5. Create/update dữ liệu.\n6. Commit transaction.\n\nTại sao phải double-check?\nVì trong thời gian request đang chờ lock, request khác có thể đã thay đổi dữ liệu. Kết quả check trước lock có thể đã stale.\n\nĐiểm cần nhớ: check-before-lock chỉ để fail fast; quyết định cuối cùng cần dựa trên state sau khi critical section đã được bảo vệ.",
    "follow": [
      "Tại sao cần double-check?",
      "Advisory lock khác row lock thế nào?"
    ],
    "choices": [
      "Check một lần rồi create ngay, không cần transaction.",
      "Check → transaction → advisory lock → double-check → create/update → commit.",
      "Chỉ dùng Redis cache TTL để chống duplicate claim.",
      "Dùng frontend debounce là đủ."
    ],
    "correctIndex": 1
  },
  {
    "id": "rag-flow",
    "category": "RAG",
    "difficulty": "medium",
    "q": "Mô tả RAG workflow của document assistant.",
    "a": "RAG workflow có hai phase chính: ingest tài liệu và retrieval khi user hỏi.\n\nIngestion:\n1. n8n theo dõi Google Drive.\n2. Khi file được tạo/cập nhật, workflow tải và extract nội dung.\n3. Text splitter chia nội dung thành chunks.\n4. Gemini Embedding Model chuyển từng chunk thành vector.\n5. Chunk content + metadata + vector được lưu vào Supabase PostgreSQL với pgvector.\n\nQuery:\n1. User gửi câu hỏi.\n2. Câu hỏi được chuyển thành vector bằng cùng embedding model.\n3. pgvector thực hiện similarity search.\n4. Lấy các chunk liên quan nhất.\n5. Đưa question + retrieved chunks vào LLM.\n6. LLM dùng context đó để tạo câu trả lời.\n\nTrong workflow hiện tại, vector retrieval dùng topK = 5; embedding dùng Gemini còn model generate/agent là GPT-4o-mini.\n\nĐiểm cần nhớ: embedding model dùng để biểu diễn semantic meaning thành vector; LLM dùng để reasoning/generate answer. Hai vai trò khác nhau.",
    "project": "Workflow hiện tại dùng topK = 5; embedding dùng Gemini và agent sử dụng GPT-4o-mini.",
    "choices": [
      "Drive → extract → chunk → Gemini embedding → pgvector; query cũng được embedding → similarity search → chunks + question → LLM.",
      "Drive → gửi toàn bộ file thẳng vào LLM, không cần embedding.",
      "Drive → chunk → GPT-4o-mini tạo vector → Redis search → Gemini generate answer.",
      "Drive → SQL query mọi tài liệu text → trả trực tiếp cho user."
    ],
    "correctIndex": 0
  },
  {
    "id": "rag-chunk",
    "category": "RAG",
    "difficulty": "easy",
    "q": "Tại sao phải chia tài liệu thành các chunk?",
    "a": "Chunking giúp retrieval chính xác hơn vì mỗi embedding chỉ phải đại diện cho một đoạn nội dung tương đối cụ thể.\n\nNếu embedding cả tài liệu dài chứa nhiều chủ đề như refund, shipping, voucher và payment thành một vector, vector đó phải “gộp” semantic meaning của tất cả chủ đề. Khi user hỏi một chi tiết nhỏ, similarity search có thể kém chính xác.\n\nNếu chia thành chunks:\n- chunk A nói về refund;\n- chunk B nói về shipping;\n- chunk C nói về voucher;\nthì mỗi vector cụ thể hơn và query dễ match đúng đoạn hơn.\n\nTrade-off:\n- chunk quá lớn: nhiều chủ đề bị trộn;\n- chunk quá nhỏ: mất context;\n- overlap giúp giữ context giữa ranh giới hai chunk.\n\nĐiểm cần nhớ: chunk size không có một con số tối ưu cho mọi tài liệu; thường phải tune theo loại data và chất lượng retrieval.",
    "follow": [
      "Chunk size và overlap ảnh hưởng thế nào?"
    ],
    "choices": [
      "Để mỗi embedding đại diện cho phần nội dung cụ thể hơn và retrieval chính xác hơn.",
      "Để giảm số lượng vector xuống chỉ còn một vector.",
      "Để LLM không cần context.",
      "Vì pgvector không thể lưu text dài hơn 100 ký tự."
    ],
    "correctIndex": 0
  },
  {
    "id": "rag-splitter",
    "category": "RAG",
    "difficulty": "easy",
    "q": "Text splitter là gì?",
    "a": "Text splitter chịu trách nhiệm chia tài liệu thành các đoạn nhỏ trước bước embedding.\n\nNó không tạo vector. Sau khi splitter tạo chunk, embedding model mới chuyển từng chunk thành vector.\n\nChunk overlap nghĩa là phần cuối của chunk trước được lặp lại ở đầu chunk sau.\n\nVí dụ:\nChunk 1: A B C D E\nChunk 2: D E F G H\n\nLợi ích là nếu một ý quan trọng nằm ngay điểm cắt giữa hai chunk thì context vẫn được giữ lại.\n\nTrong workflow hiện tại dùng Character Text Splitter với chunkOverlap = 100. File workflow không cho thấy một chunkSize explicit, nên không nên khẳng định một giá trị chunk size cụ thể.\n\nĐiểm cần nhớ: splitter quyết định cách cắt text; embedding model quyết định cách biểu diễn semantic meaning của đoạn text đó.",
    "project": "Workflow dùng Character Text Splitter và cấu hình chunkOverlap = 100.",
    "choices": [
      "Text splitter tạo embedding vector từ text.",
      "Text splitter chia document thành các chunk; overlap giúp giữ context ở ranh giới chunk.",
      "Text splitter dùng để sort vector theo similarity.",
      "Text splitter là một PostgreSQL extension."
    ],
    "correctIndex": 1
  },
  {
    "id": "rag-pgvector",
    "category": "RAG",
    "difficulty": "medium",
    "q": "pgvector là gì?",
    "a": "pgvector là extension của PostgreSQL cho phép database lưu và tìm kiếm embedding vectors.\n\nTrong RAG:\n- Gemini Embedding Model tạo vector;\n- PostgreSQL + pgvector lưu vector;\n- pgvector so sánh query vector với vectors đã lưu;\n- các chunk gần nhất được retrieve.\n\nNó không phải embedding model và cũng không phải LLM.\n\nTrong workflow hiện tại, bảng documents có cột embedding kiểu vector(3072) và retrieval gọi function match_documents.\n\nĐiểm cần nhớ: dùng pgvector giúp giữ vector search ngay trong PostgreSQL/Supabase thay vì bắt buộc phải triển khai một vector database riêng.",
    "project": "Workflow lưu embedding trong cột vector(3072) và dùng hàm match_documents để retrieval.",
    "choices": [
      "pgvector là model tạo embedding của Google.",
      "pgvector là extension PostgreSQL để lưu vector và thực hiện vector similarity search.",
      "pgvector là LLM generate câu trả lời.",
      "pgvector là text splitter của n8n."
    ],
    "correctIndex": 1
  },
  {
    "id": "rag-retrieve",
    "category": "RAG",
    "difficulty": "medium",
    "q": "Hệ thống biết chunk nào liên quan tới câu hỏi bằng cách nào?",
    "a": "Hệ thống không so trực tiếp câu hỏi dạng text với từng chunk bằng LLM.\n\nFlow retrieval:\n1. Câu hỏi được đưa qua cùng Gemini embedding model.\n2. Model tạo query vector.\n3. pgvector so query vector với embedding vectors của các chunks.\n4. Các vector được xếp hạng theo độ gần/độ tương đồng.\n5. Lấy top K chunks và trả cho agent/LLM.\n\nVí dụ câu hỏi “Chính sách hoàn tiền là gì?” sẽ có vector gần hơn với chunks nói về refund so với chunks nói về shipping.\n\nTrong workflow hiện tại topK = 5.\n\nĐiểm cần nhớ: LLM thường chỉ thấy các chunks đã retrieve, không cần đọc toàn bộ vector database trong mỗi câu hỏi.",
    "follow": [
      "LLM có tự search tất cả chunks không?"
    ],
    "choices": [
      "LLM đọc toàn bộ database và tự chọn chunk.",
      "Query được embedding; pgvector so với vectors của chunks và lấy top K theo similarity/distance.",
      "Chỉ dùng keyword LIKE trên content.",
      "Random 5 chunks rồi gửi cho LLM."
    ],
    "correctIndex": 1
  },
  {
    "id": "rag-llm",
    "category": "RAG",
    "difficulty": "medium",
    "q": "LLM có phải là thành phần trực tiếp tìm các chunk gần nhất không?",
    "a": "Trong flow RAG, LLM và vector retrieval có vai trò khác nhau.\n\nRetrieval layer:\n- embedding model chuyển query thành vector;\n- pgvector/vector store tìm các chunks liên quan.\n\nGeneration layer:\n- LLM nhận câu hỏi + retrieved context;\n- reasoning dựa trên context;\n- sinh câu trả lời tự nhiên.\n\nVì vậy câu “LLM tìm vector gần nhất” là chưa chính xác nếu mô tả flow này.\n\nWorkflow hiện tại còn mang tính agentic hơn RAG cơ bản: GPT-4o-mini agent có thể chọn tool như RAG vector lookup, lấy full document hoặc SQL cho tabular data.\n\nĐiểm cần nhớ: agent có thể quyết định tool nào cần dùng, nhưng khi đã chọn vector retrieval thì similarity search được thực hiện bởi embedding/vector-store layer.",
    "project": "Trong workflow agent có thể quyết định dùng RAG tool, full-document tool hoặc SQL tool tùy loại câu hỏi.",
    "choices": [
      "Có, LLM luôn trực tiếp quét tất cả vector trong PostgreSQL.",
      "Không; embedding model + vector DB làm retrieval, LLM dùng chunks đã retrieve để reasoning/generate.",
      "Có, vì pgvector chỉ lưu metadata.",
      "Không, vì hệ thống không dùng LLM."
    ],
    "correctIndex": 1
  },
  {
    "id": "rag-tabular",
    "category": "RAG",
    "difficulty": "hard",
    "q": "Tại sao Excel/CSV không chỉ dùng vector search?",
    "a": "Vector search phù hợp để tìm nội dung có semantic meaning gần với câu hỏi, nhưng không lý tưởng cho phép tính exact trên bảng.\n\nVí dụ user hỏi:\n“Tổng doanh thu tháng 9 là bao nhiêu?”\n\nNếu chỉ retrieve vài chunk gần nghĩa rồi để LLM tự cộng, kết quả có thể thiếu row hoặc sai số.\n\nVới tabular data, workflow lưu rows vào PostgreSQL dạng JSONB và cho agent chạy SQL để tính SUM, AVG, MAX hoặc filter chính xác.\n\nVì vậy hệ thống kết hợp hai chiến lược:\n- semantic/text question → RAG/vector search;\n- exact aggregate/tabular question → SQL.\n\nĐiểm cần nhớ: chọn retrieval/query method dựa trên loại câu hỏi, không ép mọi dữ liệu qua vector search.",
    "choices": [
      "Vector search luôn chính xác hơn SQL cho SUM/AVG/MAX.",
      "Excel/CSV không thể lưu trong PostgreSQL.",
      "Các phép tính exact như SUM/AVG/MAX phù hợp SQL hơn semantic vector search.",
      "LLM không thể đọc JSONB nên phải dùng Redis."
    ],
    "correctIndex": 2
  },
  {
    "id": "frontend-ssr",
    "category": "Frontend",
    "difficulty": "medium",
    "q": "SSR và CSR khác nhau thế nào?",
    "a": "SSR và CSR khác nhau chủ yếu ở nơi nội dung ban đầu được render.\n\nSSR:\n- server tạo HTML có nội dung rồi gửi về browser;\n- phù hợp trang public, SEO-sensitive hoặc nội dung cần hiển thị sớm.\n\nCSR:\n- browser nhận JavaScript;\n- JavaScript gọi API và render UI phía client;\n- phù hợp dashboard hoặc app tương tác cao.\n\nVí dụ product detail public có thể hưởng lợi từ SSR; admin dashboard thường không cần SEO nên CSR hợp lý hơn.\n\nĐiểm cần nhớ: React không đồng nghĩa hoàn toàn với CSR và Next.js không đồng nghĩa hoàn toàn với SSR. Next.js hỗ trợ nhiều rendering strategy khác nhau.",
    "choices": [
      "SSR render trên server trước khi gửi HTML; CSR để browser chạy JS/gọi API và render UI.",
      "SSR và CSR là hai tên khác nhau của cùng một cơ chế.",
      "CSR luôn tốt hơn cho SEO vì browser render sau.",
      "SSR chỉ dùng cho mobile app."
    ],
    "correctIndex": 0
  },
  {
    "id": "node-process-nexttick",
    "category": "Node.js",
    "difficulty": "medium",
    "q": "process.nextTick(), Promise microtask và setTimeout khác nhau thế nào trong Node.js?",
    "a": "Ba cơ chế này đều liên quan đến việc hoãn thực thi, nhưng chúng được xử lý ở các thời điểm khác nhau.\n\nprocess.nextTick():\n- callback được ưu tiên chạy ngay sau khi call stack hiện tại hoàn tất;\n- trong Node.js, nextTick queue được xử lý trước các microtask Promise thông thường.\n\nPromise.then()/queueMicrotask():\n- chạy trong microtask queue;\n- thường chạy trước timer như setTimeout.\n\nsetTimeout(fn, 0):\n- không có nghĩa là chạy ngay;\n- callback phải chờ đến timer phase và chỉ chạy khi Event Loop có cơ hội xử lý.\n\nVí dụ thứ tự thường thấy:\nsync code → process.nextTick → Promise.then → setTimeout.\n\nĐiểm cần nhớ khi interview: lạm dụng process.nextTick có thể làm Event Loop bị starvation vì các callback nextTick liên tục được ưu tiên trước khi chuyển sang phase khác.",
    "choices": [
      "process.nextTick thường được xử lý trước Promise microtask, còn setTimeout phải chờ timer phase.",
      "setTimeout(0) luôn chạy trước Promise.then.",
      "Promise.then và setTimeout hoàn toàn giống nhau.",
      "process.nextTick tạo một OS thread riêng."
    ],
    "correctIndex": 0,
    "follow": [
      "Microtask starvation là gì?",
      "setImmediate khác setTimeout(0) thế nào?"
    ]
  },
  {
    "id": "node-stream",
    "category": "Node.js",
    "difficulty": "medium",
    "q": "Stream trong Node.js là gì và khi nào nên dùng?",
    "a": "Stream cho phép xử lý dữ liệu theo từng phần nhỏ thay vì phải load toàn bộ dữ liệu vào memory cùng lúc.\n\nVí dụ khi đọc file 1 GB:\n- cách thông thường có thể đọc toàn bộ file vào RAM;\n- stream đọc từng chunk nhỏ rồi xử lý dần.\n\nCác loại stream phổ biến:\n- Readable;\n- Writable;\n- Duplex;\n- Transform.\n\nLợi ích:\n- giảm memory usage;\n- bắt đầu xử lý dữ liệu sớm hơn;\n- phù hợp file lớn, upload/download, proxy, compression.\n\nĐiểm cần nhớ: stream đặc biệt hữu ích khi kích thước dữ liệu lớn hoặc dữ liệu đến liên tục.",
    "choices": [
      "Stream xử lý dữ liệu theo từng chunk thay vì load toàn bộ vào memory.",
      "Stream là một loại database connection pool.",
      "Stream chỉ dùng cho WebSocket.",
      "Stream làm mọi tác vụ CPU chạy song song."
    ],
    "correctIndex": 0,
    "follow": [
      "Backpressure trong stream là gì?"
    ]
  },
  {
    "id": "node-worker-thread",
    "category": "Node.js",
    "difficulty": "hard",
    "q": "Khi nào nên dùng Worker Threads trong Node.js?",
    "a": "Worker Threads phù hợp với tác vụ CPU-heavy cần thực thi song song mà không muốn block main Event Loop.\n\nVí dụ:\n- xử lý ảnh;\n- parse dữ liệu rất lớn;\n- tính toán mã hóa;\n- thuật toán nặng CPU.\n\nKhông nên dùng Worker Threads chỉ vì một tác vụ có I/O như query DB hoặc gọi HTTP API, vì Node.js đã xử lý I/O async khá tốt.\n\nFlow:\nMain thread nhận request → giao CPU-heavy task cho worker → worker xử lý → trả kết quả về main thread.\n\nTrade-off:\n- có overhead tạo/giao tiếp worker;\n- code phức tạp hơn;\n- cần quản lý worker pool nếu tải lớn.\n\nĐiểm cần nhớ: async/await không giải quyết CPU blocking; Worker Threads mới là một cách phù hợp cho CPU-bound work.",
    "choices": [
      "Dùng cho CPU-heavy task để tránh block main Event Loop.",
      "Dùng cho mọi database query.",
      "Dùng thay thế Promise cho mọi async task.",
      "Chỉ dùng để tạo HTTP server."
    ],
    "correctIndex": 0
  },
  {
    "id": "nestjs-guard-interceptor",
    "category": "NestJS",
    "difficulty": "medium",
    "q": "Guard và Interceptor trong NestJS khác nhau thế nào?",
    "a": "Guard chủ yếu quyết định request có được phép đi tiếp hay không.\n\nVí dụ:\n- kiểm tra user đã login chưa;\n- kiểm tra role/permission.\n\nInterceptor bao quanh quá trình xử lý request/response và phù hợp cho:\n- logging;\n- transform response;\n- đo execution time;\n- caching;\n- thêm behavior trước/sau controller.\n\nFlow đơn giản:\nRequest → Guard quyết định allow/deny → Controller/Service → Interceptor có thể transform response.\n\nĐiểm cần nhớ: Guard thiên về authorization/access control, Interceptor thiên về cross-cutting behavior trước/sau handler.",
    "choices": [
      "Guard thường kiểm soát quyền truy cập, Interceptor xử lý cross-cutting logic trước/sau handler.",
      "Interceptor chỉ dùng để validate DTO.",
      "Guard chỉ dùng để format response.",
      "Guard và Interceptor hoàn toàn giống nhau."
    ],
    "correctIndex": 0,
    "follow": [
      "Pipe khác Guard như thế nào?",
      "Middleware khác Interceptor thế nào?"
    ]
  },
  {
    "id": "nestjs-pipe",
    "category": "NestJS",
    "difficulty": "easy",
    "q": "Pipe trong NestJS dùng để làm gì?",
    "a": "Pipe thường dùng để transform hoặc validate dữ liệu đầu vào trước khi controller nhận được dữ liệu đó.\n\nVí dụ:\n- parse string \"123\" thành number;\n- validate request body theo DTO;\n- reject request nếu dữ liệu không hợp lệ.\n\nValidationPipe là ví dụ phổ biến trong NestJS.\n\nĐiểm cần nhớ:\n- Pipe làm việc gần parameter/input;\n- Guard quyết định có cho request đi tiếp hay không;\n- Interceptor bao quanh execution flow.",
    "choices": [
      "Pipe dùng để validate/transform input trước controller.",
      "Pipe là load balancer.",
      "Pipe chỉ dùng để catch exception.",
      "Pipe thay thế database transaction."
    ],
    "correctIndex": 0
  },
  {
    "id": "rest-idempotency",
    "category": "REST API",
    "difficulty": "medium",
    "q": "Idempotency trong API là gì?",
    "a": "Một operation là idempotent khi gọi cùng request nhiều lần tạo ra cùng trạng thái cuối cùng như gọi một lần.\n\nVí dụ:\nPUT /users/1 với cùng payload gọi 1 lần hay 5 lần thì trạng thái user cuối vẫn giống nhau.\n\nĐiều này rất quan trọng với retry:\n- network timeout có thể khiến client không biết request đã thành công chưa;\n- nếu endpoint không idempotent, retry có thể tạo duplicate order/payment.\n\nTrong các flow nhạy cảm như payment/order, có thể dùng idempotency key để nhận biết request bị gửi lại.\n\nĐiểm cần nhớ: GET/PUT/DELETE thường được thiết kế idempotent; POST thường không mặc định idempotent.",
    "choices": [
      "Gọi cùng request nhiều lần vẫn cho cùng trạng thái cuối cùng như gọi một lần.",
      "Mọi POST request đều idempotent mặc định.",
      "Idempotency nghĩa là API không cần authentication.",
      "Idempotency chỉ liên quan đến cache."
    ],
    "correctIndex": 0,
    "follow": [
      "Idempotency key hoạt động thế nào?"
    ]
  },
  {
    "id": "http-status",
    "category": "REST API",
    "difficulty": "easy",
    "q": "400, 401, 403, 404 và 500 khác nhau thế nào?",
    "a": "Đây là các HTTP status code thường gặp:\n\n400 Bad Request:\nRequest không hợp lệ, ví dụ thiếu field hoặc sai format.\n\n401 Unauthorized:\nClient chưa xác thực hợp lệ, ví dụ access token thiếu/hết hạn.\n\n403 Forbidden:\nĐã xác thực nhưng không có quyền thực hiện hành động.\n\n404 Not Found:\nResource không tồn tại hoặc không tìm thấy.\n\n500 Internal Server Error:\nServer gặp lỗi ngoài dự kiến.\n\nĐiểm cần nhớ: 401 và 403 rất dễ bị hỏi. 401 = chưa authenticated hợp lệ; 403 = authenticated nhưng không authorized.",
    "choices": [
      "401 là chưa xác thực hợp lệ, 403 là đã xác thực nhưng không có quyền.",
      "403 luôn có nghĩa resource không tồn tại.",
      "404 là lỗi database.",
      "500 luôn do client gửi sai request."
    ],
    "correctIndex": 0
  },
  {
    "id": "db-transaction",
    "category": "Database",
    "difficulty": "medium",
    "q": "Database transaction là gì và ACID có ý nghĩa gì?",
    "a": "Transaction gom nhiều thao tác database thành một đơn vị logic.\n\nVí dụ chuyển tiền:\n1. trừ tiền tài khoản A;\n2. cộng tiền tài khoản B.\n\nNếu bước 2 fail thì thường cần rollback bước 1 để tránh dữ liệu không nhất quán.\n\nACID:\n- Atomicity: hoặc tất cả thành công, hoặc rollback;\n- Consistency: dữ liệu giữ các invariant hợp lệ;\n- Isolation: transaction concurrent không gây ảnh hưởng sai lệch theo isolation level;\n- Durability: commit rồi thì dữ liệu phải được lưu bền vững.\n\nĐiểm cần nhớ: transaction giải quyết tính toàn vẹn dữ liệu, nhưng không tự động giải quyết mọi race condition nếu isolation/locking chưa phù hợp.",
    "choices": [
      "Transaction gom nhiều thao tác DB thành một đơn vị có thể commit hoặc rollback.",
      "Transaction chỉ dùng để tăng tốc SELECT.",
      "ACID là cơ chế cache của Redis.",
      "Transaction đảm bảo mọi race condition biến mất."
    ],
    "correctIndex": 0,
    "follow": [
      "Isolation level là gì?",
      "Deadlock có thể xảy ra trong transaction không?"
    ]
  },
  {
    "id": "db-isolation",
    "category": "Database",
    "difficulty": "hard",
    "q": "Isolation level trong database là gì?",
    "a": "Isolation level quyết định mức độ các transaction concurrent có thể nhìn thấy thay đổi của nhau.\n\nCác level phổ biến trong SQL:\n- Read Uncommitted;\n- Read Committed;\n- Repeatable Read;\n- Serializable.\n\nLevel càng cao thường càng giảm anomaly nhưng có thể tăng contention hoặc chi phí.\n\nVí dụ:\nRead Committed thường ngăn dirty read nhưng vẫn có thể gặp non-repeatable read.\nSerializable cố gắng cho kết quả như các transaction chạy tuần tự.\n\nĐiểm cần nhớ: isolation là trade-off giữa correctness và concurrency/performance.",
    "choices": [
      "Isolation level kiểm soát cách các transaction concurrent nhìn thấy dữ liệu của nhau.",
      "Isolation level là mức compression của index.",
      "Isolation level chỉ áp dụng cho Redis.",
      "Isolation level càng cao thì luôn nhanh hơn."
    ],
    "correctIndex": 0
  },
  {
    "id": "db-deadlock",
    "category": "Database",
    "difficulty": "hard",
    "q": "Deadlock trong database là gì?",
    "a": "Deadlock xảy ra khi hai hoặc nhiều transaction giữ resource mà transaction khác cần và cùng chờ nhau vô hạn về mặt logic.\n\nVí dụ:\n- Transaction A lock row 1 rồi chờ row 2;\n- Transaction B lock row 2 rồi chờ row 1.\n\nDatabase thường phát hiện deadlock và abort một transaction.\n\nCách giảm:\n- lock resource theo thứ tự nhất quán;\n- giữ transaction ngắn;\n- tránh lock quá nhiều row;\n- retry transaction nếu gặp deadlock phù hợp.\n\nĐiểm cần nhớ: deadlock khác với lock wait bình thường. Deadlock là vòng chờ lẫn nhau.",
    "choices": [
      "Hai transaction giữ lock và chờ resource của nhau tạo thành vòng chờ.",
      "Deadlock là khi query không dùng index.",
      "Deadlock là khi Redis hết RAM.",
      "Deadlock chỉ xảy ra ở frontend."
    ],
    "correctIndex": 0
  },
  {
    "id": "db-optimistic-pessimistic",
    "category": "Database",
    "difficulty": "hard",
    "q": "Optimistic locking và pessimistic locking khác nhau thế nào?",
    "a": "Pessimistic locking giả định conflict có thể xảy ra và lock resource trước khi cập nhật.\n\nVí dụ SELECT ... FOR UPDATE để transaction khác phải chờ.\n\nOptimistic locking giả định conflict hiếm. Thay vì lock lâu, hệ thống dùng version/timestamp để kiểm tra dữ liệu có bị thay đổi kể từ lúc đọc hay không.\n\nVí dụ:\nUPDATE ... WHERE id = ? AND version = 5\nNếu affected rows = 0, có nghĩa version đã đổi và cần retry/handle conflict.\n\nTrade-off:\n- pessimistic phù hợp contention cao nhưng giảm concurrency;\n- optimistic phù hợp contention thấp nhưng cần xử lý retry khi conflict.\n\nĐiểm cần nhớ: lựa chọn phụ thuộc mức độ contention và chi phí retry.",
    "choices": [
      "Pessimistic lock resource trước; optimistic kiểm tra version để phát hiện conflict khi update.",
      "Optimistic luôn giữ row lock lâu hơn pessimistic.",
      "Hai cơ chế hoàn toàn giống nhau.",
      "Optimistic locking chỉ dùng cho Redis."
    ],
    "correctIndex": 0
  },
  {
    "id": "redis-cache-invalidation",
    "category": "Redis",
    "difficulty": "medium",
    "q": "Cache invalidation là gì và tại sao khó?",
    "a": "Cache invalidation là quá trình đảm bảo cache không trả dữ liệu cũ sau khi source of truth thay đổi.\n\nVí dụ:\n- product price trong PostgreSQL đổi từ 100 thành 120;\n- Redis vẫn cache 100;\n→ user có thể thấy stale data.\n\nCác strategy phổ biến:\n- TTL;\n- xóa cache khi write;\n- update cache khi write;\n- cache-aside.\n\nKhó ở chỗ phải giữ consistency giữa cache và database, đặc biệt khi nhiều service hoặc nhiều instance cùng cập nhật dữ liệu.\n\nĐiểm cần nhớ: cache giúp nhanh hơn nhưng đổi lại phải xử lý stale data và invalidation.",
    "choices": [
      "Đảm bảo cache không giữ dữ liệu cũ sau khi source of truth thay đổi.",
      "Xóa toàn bộ database mỗi khi cache hết hạn.",
      "Cache invalidation chỉ là đổi TTL sang 0.",
      "Cache invalidation chỉ xảy ra trên frontend."
    ],
    "correctIndex": 0,
    "follow": [
      "Cache-aside pattern là gì?"
    ]
  },
  {
    "id": "redis-ttl",
    "category": "Redis",
    "difficulty": "easy",
    "q": "TTL trong Redis dùng để làm gì?",
    "a": "TTL là Time To Live, tức thời gian một key tồn tại trước khi tự động hết hạn.\n\nVí dụ:\nOTP code sống 5 phút.\nRedis có thể lưu key với TTL 300 giây.\n\nTTL phù hợp cho:\n- cache;\n- session/temporary state;\n- OTP;\n- rate-limit window.\n\nLợi ích:\n- tự dọn dữ liệu không cần tồn tại vĩnh viễn;\n- giảm nguy cơ cache stale quá lâu.\n\nĐiểm cần nhớ: TTL không thay thế hoàn toàn cache invalidation vì trong khoảng TTL dữ liệu vẫn có thể stale.",
    "choices": [
      "TTL xác định thời gian key tồn tại trước khi hết hạn.",
      "TTL là số thread Redis sử dụng.",
      "TTL là transaction isolation level.",
      "TTL chỉ dùng cho PostgreSQL."
    ],
    "correctIndex": 0
  },
  {
    "id": "auth-cookie",
    "category": "Authentication",
    "difficulty": "medium",
    "q": "HttpOnly, Secure và SameSite trong cookie có tác dụng gì?",
    "a": "Ba thuộc tính này tăng an toàn khi dùng cookie.\n\nHttpOnly:\nJavaScript phía browser không đọc cookie qua document.cookie, giúp giảm tác động của một số XSS trong việc đánh cắp token.\n\nSecure:\nCookie chỉ được gửi qua HTTPS.\n\nSameSite:\nKiểm soát khi cookie được gửi trong cross-site request, giúp giảm rủi ro CSRF.\n\nCác giá trị SameSite thường gặp:\n- Strict;\n- Lax;\n- None (thường cần Secure).\n\nĐiểm cần nhớ: HttpOnly không ngăn mọi XSS; nếu attacker chạy được JS, họ vẫn có thể thực hiện request thay user trong một số tình huống.",
    "choices": [
      "HttpOnly hạn chế JS đọc cookie, Secure yêu cầu HTTPS, SameSite kiểm soát cross-site sending.",
      "HttpOnly mã hóa JWT.",
      "Secure làm cookie chỉ lưu trong RAM.",
      "SameSite thay thế hoàn toàn authentication."
    ],
    "correctIndex": 0
  },
  {
    "id": "auth-csrf",
    "category": "Authentication",
    "difficulty": "medium",
    "q": "CSRF là gì và SameSite cookie giúp như thế nào?",
    "a": "CSRF là khi attacker khiến browser của user đã đăng nhập gửi một request không mong muốn tới website khác, lợi dụng việc browser tự động đính kèm cookie.\n\nVí dụ user đang login bank.com, sau đó mở trang độc hại có request chuyển tiền tới bank.com.\n\nSameSite cookie có thể hạn chế cookie được gửi trong một số cross-site request, từ đó giảm khả năng CSRF.\n\nCác biện pháp khác:\n- CSRF token;\n- kiểm tra Origin/Referer trong trường hợp phù hợp;\n- không dùng cookie auth một cách thiếu kiểm soát.\n\nĐiểm cần nhớ: CSRF đặc biệt liên quan tới credential được browser tự động gửi như cookie.",
    "choices": [
      "CSRF lợi dụng browser tự gửi credential/cookie để tạo request ngoài ý muốn.",
      "CSRF là database deadlock.",
      "CSRF chỉ xảy ra khi dùng Redis.",
      "SameSite làm browser không bao giờ gửi cookie."
    ],
    "correctIndex": 0
  },
  {
    "id": "system-horizontal-vertical",
    "category": "System Design",
    "difficulty": "easy",
    "q": "Horizontal scaling và vertical scaling khác nhau thế nào?",
    "a": "Vertical scaling là tăng tài nguyên cho một máy:\n- thêm CPU;\n- thêm RAM;\n- nâng cấu hình server.\n\nHorizontal scaling là tăng số lượng instance:\nBE1, BE2, BE3...\n\nVertical scaling đơn giản hơn nhưng có giới hạn phần cứng và single point of failure.\nHorizontal scaling tăng khả năng chịu tải và availability tốt hơn nhưng làm distributed state, session, cache và consistency phức tạp hơn.\n\nĐiểm cần nhớ: khi scale horizontal, state local của từng instance thường trở thành vấn đề cần xử lý.",
    "choices": [
      "Vertical tăng cấu hình một máy; horizontal tăng số lượng instance.",
      "Horizontal chỉ là tăng RAM.",
      "Vertical luôn có availability tốt hơn horizontal.",
      "Hai khái niệm hoàn toàn giống nhau."
    ],
    "correctIndex": 0
  },
  {
    "id": "system-healthcheck",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Health check trong hệ thống load balanced dùng để làm gì?",
    "a": "Health check giúp load balancer hoặc orchestration system biết instance nào có thể nhận traffic.\n\nVí dụ:\nHAProxy kiểm tra /health định kỳ.\nNếu BE2 không phản hồi hoặc trả trạng thái unhealthy, HAProxy tạm ngừng route request tới BE2.\n\nHealth check có thể chia:\n- liveness: process còn sống không;\n- readiness: instance đã sẵn sàng nhận traffic chưa.\n\nĐiểm cần nhớ: readiness quan trọng khi app đang startup, migrate hoặc chưa kết nối được dependency cần thiết.",
    "choices": [
      "Giúp biết instance nào healthy/sẵn sàng để nhận traffic.",
      "Health check dùng để tạo JWT.",
      "Health check thay thế monitoring/logging.",
      "Health check chỉ chạy ở frontend."
    ],
    "correctIndex": 0
  },
  {
    "id": "system-rate-limit",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Rate limiting dùng để làm gì?",
    "a": "Rate limiting giới hạn số request một client/user/IP có thể gửi trong một khoảng thời gian.\n\nMục tiêu:\n- chống abuse;\n- giảm brute force;\n- bảo vệ backend khỏi traffic spike;\n- đảm bảo fair usage.\n\nVí dụ:\n100 requests / minute / user.\n\nRedis thường phù hợp để lưu counter/window khi hệ thống có nhiều backend instance vì các instance cần dùng chung state rate limit.\n\nĐiểm cần nhớ: rate limiting không chỉ là security feature mà còn là cơ chế bảo vệ capacity của hệ thống.",
    "choices": [
      "Giới hạn số request trong một khoảng thời gian để chống abuse và bảo vệ hệ thống.",
      "Rate limiting làm database query nhanh hơn bằng index.",
      "Rate limiting chỉ dùng cho static file.",
      "Rate limiting thay thế authentication."
    ],
    "correctIndex": 0
  },
  {
    "id": "production-log-correlation",
    "category": "Production",
    "difficulty": "medium",
    "q": "Correlation ID / Request ID giúp debug production như thế nào?",
    "a": "Correlation ID là một identifier gắn với một request và được truyền qua các layer/service liên quan.\n\nVí dụ:\nClient request → API Gateway → Backend → Payment Service\n\nNếu tất cả log đều chứa request_id = abc123, bạn có thể search abc123 để ghép toàn bộ flow lại.\n\nLợi ích:\n- dễ trace một request qua nhiều service;\n- phân biệt log của nhiều request concurrent;\n- hỗ trợ debug timeout hoặc partial failure.\n\nĐiểm cần nhớ: correlation ID đặc biệt hữu ích trong distributed system nơi một user action tạo nhiều downstream calls.",
    "choices": [
      "Gắn cùng một ID vào log của một request qua nhiều layer/service để trace dễ hơn.",
      "Là ID của database primary key.",
      "Chỉ dùng để cache response.",
      "Thay thế hoàn toàn distributed tracing."
    ],
    "correctIndex": 0
  },
  {
    "id": "production-timeout-retry",
    "category": "Production",
    "difficulty": "hard",
    "q": "Timeout, retry và circuit breaker khác nhau thế nào?",
    "a": "Ba cơ chế giải quyết các vấn đề khác nhau khi gọi dependency.\n\nTimeout:\nKhông chờ dependency quá lâu.\n\nRetry:\nThử lại khi lỗi có khả năng tạm thời.\n\nCircuit breaker:\nNếu dependency lỗi liên tục, tạm ngừng gửi request trong một khoảng thời gian để tránh làm hệ thống tệ hơn.\n\nVí dụ payment API đang down:\n- timeout tránh mỗi request treo 30 giây;\n- retry có thể cứu lỗi transient;\n- circuit breaker tránh hàng nghìn request tiếp tục đập vào service đang chết.\n\nĐiểm cần nhớ: retry không kiểm soát có thể tạo retry storm. Thường cần backoff, jitter và giới hạn số lần retry.",
    "choices": [
      "Timeout giới hạn thời gian chờ, retry thử lại lỗi tạm thời, circuit breaker tạm ngừng gọi dependency đang lỗi liên tục.",
      "Cả ba chỉ là ba tên của cùng một cơ chế.",
      "Circuit breaker dùng để mã hóa token.",
      "Retry nên luôn vô hạn."
    ],
    "correctIndex": 0
  },
  {
    "id": "post-zalo-bug",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Bug Zalo chatbot multi-instance xảy ra vì sao dù HAProxy đã có sticky session?",
    "a": "Vấn đề nằm ở flow request chứ không chỉ ở routing của browser.\n\nBrowser request ban đầu có thể:\nBrowser → HAProxy → BE1\n\nNhưng Zalo trả webhook về n8n, sau đó n8n tạo một request mới tới backend:\nZalo → n8n → HAProxy → BE1 hoặc BE2\n\nRequest mới này không nhất thiết mang cùng sticky-session context với browser.\n\nNếu BE1 và BE2 dùng Redis local riêng:\n- state được ghi ở Redis của BE1;\n- webhook rơi vào BE2;\n- BE2 không thấy state;\n→ lỗi xảy ra lúc được lúc không.\n\nDev/staging chỉ có một instance/Redis path nên không tái hiện.\n\nĐiểm cần nhớ: sticky session không giải quyết shared state cho webhook hoặc request độc lập. Shared Redis là cách phù hợp hơn trong flow này.",
    "choices": [
      "Webhook từ n8n là request mới có thể vào instance khác trong khi state nằm ở Redis local riêng.",
      "Sticky session tự đồng bộ Redis nhưng Zalo không hỗ trợ JSON.",
      "HAProxy không hỗ trợ round-robin.",
      "Redis không thể chạy trên production."
    ],
    "correctIndex": 0,
    "follow": [
      "Ngoài shared Redis còn giải pháp nào?",
      "Trade-off của sticky session so với stateless/shared state?"
    ]
  },
  {
    "id": "post-double-check-lock",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Tại sao sau khi lấy lock vẫn phải double-check điều kiện?",
    "a": "Check trước lock chỉ phản ánh state tại thời điểm đó.\n\nVí dụ:\nA check: voucher còn slot.\nB check: voucher còn slot.\nA lấy lock trước và claim slot.\nB chờ lock.\n\nKhi B cuối cùng lấy được lock, kết quả check ban đầu của B đã stale. Nếu B không check lại, nó vẫn có thể claim dù slot đã hết.\n\nVì vậy pattern đúng là:\ncheck → acquire lock → re-check → update.\n\nĐiểm cần nhớ: lock bảo vệ critical section, nhưng dữ liệu đọc trước khi vào critical section có thể đã thay đổi.",
    "choices": [
      "Vì state có thể thay đổi trong lúc request đang chờ lock.",
      "Vì lock tự xóa dữ liệu trước đó.",
      "Double-check chỉ để tăng tốc.",
      "Không cần double-check nếu có transaction."
    ],
    "correctIndex": 0
  },
  {
    "id": "rag-similarity",
    "category": "RAG",
    "difficulty": "medium",
    "q": "Cosine similarity trong RAG dùng để làm gì?",
    "a": "Cosine similarity đo mức độ hai vector có hướng giống nhau đến đâu.\n\nTrong embedding space, hai câu có semantic meaning gần nhau thường có vector gần nhau về hướng.\n\nVí dụ:\n“cách hoàn tiền”\nvà\n“refund policy”\ncó thể có cosine similarity cao dù từ ngữ khác nhau.\n\nTrong workflow, pgvector dùng distance/similarity để xếp hạng các chunk gần query vector.\n\nĐiểm cần nhớ: vector search là semantic search, không chỉ là match keyword chính xác.",
    "choices": [
      "Đo mức độ tương đồng về hướng giữa các embedding vector để xếp hạng chunk.",
      "Đếm số từ giống nhau giữa hai câu.",
      "Tính tổng token của prompt.",
      "Đo latency của database."
    ],
    "correctIndex": 0,
    "follow": [
      "Cosine similarity khác Euclidean distance thế nào?"
    ]
  },
  {
    "id": "rag-topk",
    "category": "RAG",
    "difficulty": "medium",
    "q": "Top K trong vector retrieval ảnh hưởng RAG như thế nào?",
    "a": "Top K là số lượng chunk được lấy sau similarity search.\n\nK nhỏ:\n- ít noise;\n- ít token/cost;\n- nhưng có thể bỏ sót context.\n\nK lớn:\n- tăng recall;\n- nhưng dễ đưa thêm chunk không liên quan;\n- prompt dài hơn và tốn token hơn.\n\nWorkflow hiện tại dùng topK = 5.\n\nĐiểm cần nhớ: không có một K tối ưu cho mọi use case. Cần tune dựa trên retrieval quality, document type và context window.",
    "choices": [
      "Top K là số chunk retrieval trả về; quá nhỏ có thể thiếu context, quá lớn có thể tăng noise/token.",
      "Top K là số dimension của embedding.",
      "Top K là số user được phép login.",
      "Top K luôn phải bằng 1."
    ],
    "correctIndex": 0
  },
  {
    "id": "rag-hallucination",
    "category": "RAG",
    "difficulty": "medium",
    "q": "RAG có loại bỏ hoàn toàn hallucination không?",
    "a": "Không. RAG giúp giảm hallucination bằng cách cung cấp context có nguồn, nhưng không đảm bảo LLM luôn trả lời đúng.\n\nCác nguyên nhân vẫn có thể sai:\n- retrieval lấy nhầm chunk;\n- tài liệu nguồn sai hoặc cũ;\n- chunk thiếu context;\n- prompt không buộc model bám nguồn;\n- model suy diễn quá mức.\n\nCách giảm:\n- cải thiện chunking/retrieval;\n- metadata filtering;\n- reranking;\n- yêu cầu trả lời “không tìm thấy” khi thiếu evidence;\n- citation/source display.\n\nĐiểm cần nhớ: RAG cải thiện grounding, không biến LLM thành hệ thống deterministic tuyệt đối.",
    "choices": [
      "Không; RAG giảm hallucination nhưng vẫn có thể sai do retrieval hoặc generation.",
      "Có; chỉ cần dùng vector DB thì câu trả lời luôn đúng.",
      "Có; RAG không dùng LLM.",
      "Không; vì embedding không thể tìm semantic similarity."
    ],
    "correctIndex": 0
  },
  {
    "id": "rag-finetune",
    "category": "RAG",
    "difficulty": "hard",
    "q": "RAG khác fine-tuning như thế nào?",
    "a": "RAG đưa kiến thức vào runtime context bằng retrieval, còn fine-tuning thay đổi trọng số/model behavior thông qua training thêm.\n\nRAG phù hợp khi:\n- kiến thức thay đổi thường xuyên;\n- cần cite nguồn;\n- cần cập nhật tài liệu mà không train lại model.\n\nFine-tuning phù hợp hơn khi:\n- muốn thay style/format/behavior;\n- cần model học pattern task cụ thể;\n- không phải chủ yếu để “nhét” knowledge base thường xuyên thay đổi.\n\nHai kỹ thuật có thể kết hợp.\n\nĐiểm cần nhớ: nếu câu hỏi là “làm sao để model biết tài liệu nội bộ mới cập nhật hôm nay?”, RAG thường hợp lý hơn fine-tuning.",
    "choices": [
      "RAG retrieve knowledge lúc runtime; fine-tuning thay đổi model qua training thêm.",
      "RAG và fine-tuning hoàn toàn giống nhau.",
      "Fine-tuning luôn phù hợp hơn cho tài liệu thay đổi hàng ngày.",
      "RAG thay đổi trọng số model sau mỗi query."
    ],
    "correctIndex": 0
  },
  {
    "id": "frontend-state",
    "category": "Frontend",
    "difficulty": "medium",
    "q": "Server state và client state khác nhau thế nào?",
    "a": "Client state là state chỉ liên quan UI/browser, ví dụ:\n- modal đang mở;\n- selected tab;\n- theme.\n\nServer state là dữ liệu nguồn nằm trên server:\n- user profile;\n- orders;\n- products.\n\nServer state có thêm vấn đề:\n- fetching;\n- caching;\n- stale data;\n- refetch;\n- synchronization.\n\nVì vậy các tool như React Query/TanStack Query tập trung vào server state hơn là thay thế toàn bộ local state.\n\nĐiểm cần nhớ: phân biệt hai loại state giúp chọn công cụ quản lý state hợp lý.",
    "choices": [
      "Client state chủ yếu thuộc UI local; server state đến từ backend và cần fetch/cache/sync.",
      "Server state chỉ tồn tại trong localStorage.",
      "Client state luôn phải lưu trong PostgreSQL.",
      "Hai loại state không có khác biệt."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-architecture",
    "category": "FlexServer",
    "difficulty": "easy",
    "q": "FlexServer có kiến trúc như thế nào?",
    "a": "FlexServer gồm React/Vite ở frontend, NestJS ở backend và một Go agent chạy trên VPS.\n\nGo agent lấy CPU, RAM, disk, network và uptime rồi gửi về backend. Backend lưu và xử lý dữ liệu, còn frontend hiển thị dashboard và nhận cập nhật realtime.\n\nNgoài monitoring, hệ thống còn có SSH key, agent installation, Docker management, audit log và web terminal.",
    "choices": [
      "React/Vite frontend, NestJS backend và Go agent chạy trên VPS.",
      "Chỉ có một ứng dụng React chạy trực tiếp trên VPS.",
      "Go là backend chính và NestJS chỉ dùng cho frontend.",
      "Hệ thống không có agent trên VPS."
    ],
    "correctIndex": 0,
    "follow": [
      "Go agent có nhiệm vụ gì?",
      "Backend và agent giao tiếp như thế nào?"
    ]
  },
  {
    "id": "flex-why-nestjs",
    "category": "FlexServer",
    "difficulty": "easy",
    "q": "Tại sao FlexServer dùng NestJS cho backend?",
    "a": "Backend FlexServer xử lý nhiều phần như VPS, agent, metrics, jobs, SSH và authentication.\n\nNestJS giúp chia code thành controller và service rõ ràng, nên dễ quản lý khi project có nhiều chức năng.\n\nNgoài ra Dependency Injection giúp các service và repository dễ thay thế và test hơn.",
    "choices": [
      "Vì NestJS giúp chia backend thành các phần rõ ràng và dễ quản lý.",
      "Vì NestJS bắt buộc phải dùng khi có PostgreSQL.",
      "Vì NestJS chạy được trực tiếp trên mọi VPS mà không cần Node.js.",
      "Vì NestJS thay thế hoàn toàn React."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-why-go-agent",
    "category": "FlexServer",
    "difficulty": "easy",
    "q": "Tại sao FlexServer dùng Go cho agent?",
    "a": "Agent phải chạy trực tiếp trên VPS và lấy thông tin hệ thống liên tục.\n\nGo có thể build thành một file chạy độc lập trên Linux, nên khi cài lên VPS không cần cài thêm Node.js và nhiều thư viện đi kèm.\n\nĐiều này giúp việc cài đặt và chạy agent gọn hơn.",
    "choices": [
      "Go có thể build thành một binary độc lập, phù hợp để chạy trực tiếp trên VPS.",
      "Vì Node.js không thể gửi HTTP request.",
      "Vì NestJS chỉ giao tiếp được với Go.",
      "Vì Go bắt buộc khi đọc CPU và RAM."
    ],
    "correctIndex": 0,
    "follow": [
      "Tại sao không viết agent bằng Node.js?"
    ]
  },
  {
    "id": "flex-node-agent",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Tại sao không viết luôn agent bằng Node.js?",
    "a": "Node.js vẫn có thể viết agent.\n\nFlexServer chọn Go vì agent được cài trực tiếp lên VPS. Go có thể build thành một file chạy độc lập nên VPS không cần cài Node.js hoặc các dependency của project.\n\nNếu agent đơn giản và môi trường đã có Node.js thì dùng Node.js cũng là một lựa chọn hợp lý.",
    "choices": [
      "Go giúp deploy agent thành một file độc lập và giảm yêu cầu cài runtime trên VPS.",
      "Node.js không chạy được trên Linux.",
      "Node.js không đọc được file hệ thống.",
      "Backend NestJS không thể giao tiếp với agent Node.js."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-add-vps",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Khi thêm một VPS mới trong FlexServer, flow cơ bản là gì?",
    "a": "Frontend gửi thông tin VPS như host, port, username và tên server lên backend.\n\nBackend validate dữ liệu, lưu VPS và ghi audit event.\n\nSau đó user có thể thiết lập SSH key. Khi SSH đã sẵn sàng, hệ thống có thể cài Go agent để bắt đầu gửi metrics về dashboard.",
    "choices": [
      "Lưu thông tin VPS, thiết lập SSH khi cần, sau đó có thể cài agent để gửi metrics.",
      "Backend tự biết password của VPS mà user không cần cung cấp.",
      "Frontend kết nối trực tiếp PostgreSQL trên VPS.",
      "VPS chỉ được thêm sau khi Go agent đã chạy."
    ],
    "correctIndex": 0,
    "follow": [
      "Password VPS có được lưu không?",
      "SSH key được cài như thế nào?"
    ]
  },
  {
    "id": "flex-ssh-password",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Password SSH được sử dụng và bảo vệ như thế nào khi thiết lập VPS?",
    "a": "Password không được lưu khi thêm VPS.\n\nNếu VPS chưa có SSH key, user có thể gửi password một lần để backend kết nối SSH và cài public key lên VPS.\n\nSau đó backend ưu tiên dùng SSH key. Password không được lưu vào database hoặc trả lại trong API response.",
    "choices": [
      "Password chỉ dùng tạm thời để thiết lập SSH key và không được lưu.",
      "Password được lưu plaintext để dùng cho mọi lần SSH sau.",
      "Password được gửi cho Go agent và lưu trong config.",
      "Password luôn được lưu trong localStorage."
    ],
    "correctIndex": 0,
    "follow": [
      "Việc gửi password có rủi ro gì?"
    ]
  },
  {
    "id": "flex-install-agent",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "FlexServer cài Go agent từ xa như thế nào?",
    "a": "Backend kết nối tới VPS bằng SSH.\n\nNó tạo thư mục, upload binary của Go agent và file config, sau đó chạy agent một lần để kiểm tra.\n\nNếu kiểm tra thành công, backend start agent chạy nền và cập nhật trạng thái job.",
    "choices": [
      "Backend dùng SSH để upload agent/config, chạy kiểm tra rồi start agent.",
      "Frontend copy source code Go vào browser.",
      "Agent được cài bằng PostgreSQL trigger.",
      "Backend chỉ gửi email hướng dẫn user cài thủ công."
    ],
    "correctIndex": 0,
    "follow": [
      "Nếu quá trình cài agent bị lỗi thì sao?"
    ]
  },
  {
    "id": "flex-agent-metrics",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Go agent gửi metrics về backend theo flow nào?",
    "a": "Agent lấy metrics từ VPS rồi gửi HTTP POST tới `/api/agent/metrics`.\n\nRequest có Bearer token riêng của agent. Backend kiểm tra token, xác định VPS tương ứng rồi lưu metrics.\n\nAgent gửi các thông tin như CPU, RAM, disk, network và uptime.",
    "choices": [
      "Agent collect metrics rồi POST tới backend bằng token riêng.",
      "Backend SSH vào VPS mỗi giây để đọc CPU.",
      "Frontend trực tiếp đọc /proc trên VPS.",
      "Agent ghi metrics thẳng vào browser."
    ],
    "correctIndex": 0,
    "follow": [
      "Nếu agent không gửi được metrics thì sao?"
    ]
  },
  {
    "id": "flex-agent-token",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Agent token trong FlexServer được bảo vệ như thế nào?",
    "a": "Raw token chỉ được trả ra khi tạo credential.\n\nBackend không lưu secret gốc mà chỉ lưu hash của secret. Khi agent gửi request, backend hash secret nhận được rồi so sánh với giá trị đã lưu.\n\nToken không được ghi vào log và có thể bị revoke khi không còn hợp lệ.",
    "choices": [
      "Backend chỉ lưu hash của secret, không lưu raw token và token có thể bị revoke.",
      "Backend lưu raw token trong log để debug.",
      "Token được hard-code trong frontend.",
      "Agent không cần authentication."
    ],
    "correctIndex": 0,
    "follow": [
      "Tại sao không lưu raw token?"
    ]
  },
  {
    "id": "flex-sse",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Tại sao FlexServer dùng SSE cho monitoring?",
    "a": "Monitoring chủ yếu cần server gửi dữ liệu xuống browser như metrics và job progress.\n\nSSE phù hợp vì đây chủ yếu là giao tiếp một chiều và browser có thể giữ một kết nối để nhận update liên tục.\n\nTrong FlexServer, SSE được dùng cho metrics, jobs và các monitoring event.",
    "choices": [
      "Vì monitoring chủ yếu cần server đẩy update một chiều xuống browser.",
      "Vì SSE cho phép browser chạy SSH command trực tiếp.",
      "Vì SSE bắt buộc khi dùng React.",
      "Vì WebSocket không thể truyền dữ liệu."
    ],
    "correctIndex": 0,
    "follow": [
      "Tại sao terminal lại không dùng SSE?"
    ]
  },
  {
    "id": "flex-sse-websocket",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Tại sao FlexServer dùng SSE cho monitoring nhưng WebSocket cho terminal?",
    "a": "Monitoring chủ yếu cần server gửi dữ liệu xuống browser nên SSE là đủ.\n\nTerminal cần hai chiều: browser gửi phím/lệnh xuống server và server phải trả output từ SSH về browser.\n\nVì vậy FlexServer dùng WebSocket cho terminal.",
    "choices": [
      "SSE phù hợp cho monitoring một chiều, còn terminal cần giao tiếp hai chiều nên dùng WebSocket.",
      "SSE chỉ hoạt động với PostgreSQL.",
      "WebSocket chỉ dùng để lưu metrics.",
      "Hai công nghệ được dùng hoàn toàn ngẫu nhiên."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-terminal-flow",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Web terminal của FlexServer hoạt động như thế nào?",
    "a": "Browser mở WebSocket tới backend.\n\nBackend kiểm tra session và VPS, sau đó lấy SSH key và mở SSH shell tới VPS bằng `ssh2`.\n\nDữ liệu user nhập được gửi qua WebSocket tới SSH shell, còn output từ VPS được gửi ngược về browser.",
    "choices": [
      "Browser ↔ WebSocket ↔ backend ↔ SSH ↔ VPS.",
      "Browser kết nối trực tiếp SSH tới VPS mà không qua backend.",
      "Terminal sử dụng SSE cho cả input và output.",
      "Terminal chạy command trực tiếp trong database."
    ],
    "correctIndex": 0,
    "follow": [
      "Khi client disconnect thì backend xử lý SSH connection thế nào?"
    ]
  },
  {
    "id": "flex-storage",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "FlexServer lưu dữ liệu bằng gì?",
    "a": "FlexServer hỗ trợ cả JSON storage và PostgreSQL.\n\nCác service làm việc qua repository, nên có thể chọn implementation tương ứng với cấu hình mà không phải thay đổi controller hoặc phần lớn business logic.\n\nChạy đơn giản có thể dùng JSON; Docker Compose của project sử dụng PostgreSQL.",
    "choices": [
      "Hỗ trợ JSON hoặc PostgreSQL thông qua repository.",
      "Chỉ hỗ trợ Redis.",
      "Chỉ lưu dữ liệu trong memory.",
      "Go agent tự lưu toàn bộ dữ liệu vào browser."
    ],
    "correctIndex": 0,
    "follow": [
      "Tại sao lại dùng repository thay vì gọi PostgreSQL trực tiếp ở controller?"
    ]
  },
  {
    "id": "flex-job-restart",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Nếu backend restart khi một background job đang chạy thì sao?",
    "a": "Hiện tại JobRunner của FlexServer chạy trong process của backend.\n\nVì vậy nếu backend restart giữa lúc job đang chạy thì phần thực thi của job đó có thể bị mất. Đây là một limitation hiện tại của project.\n\nNếu cần production ổn định hơn, có thể chuyển phần job sang một queue và worker có lưu trạng thái bền vững.",
    "choices": [
      "Job đang thực thi có thể bị mất vì JobRunner hiện chạy trong process backend.",
      "Job chắc chắn tiếp tục vì JavaScript tự lưu execution vào PostgreSQL.",
      "Go agent tự khởi động lại mọi backend job.",
      "Backend restart không bao giờ ảnh hưởng job."
    ],
    "correctIndex": 0,
    "follow": [
      "Bạn sẽ cải thiện limitation này như thế nào?"
    ]
  },
  {
    "id": "flex-docker-security",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Tại sao NestJS backend không truy cập trực tiếp Docker socket trên VPS?",
    "a": "Docker socket có quyền rất lớn trên máy host.\n\nFlexServer để Go agent trên chính VPS thực hiện các Docker operation đã được backend cho phép. Backend chỉ tạo operation, còn agent lấy operation, thực hiện rồi báo kết quả lại.\n\nNhư vậy backend trung tâm không cần trực tiếp mở Docker socket của từng VPS.",
    "choices": [
      "Để giới hạn quyền của backend; Docker operation được thực hiện bởi agent trên VPS.",
      "Vì Docker socket chỉ hoạt động với React.",
      "Vì NestJS không thể gửi HTTP request.",
      "Vì PostgreSQL tự quản lý Docker thay backend."
    ],
    "correctIndex": 0,
    "follow": [
      "Agent được phép thực hiện những Docker action nào?"
    ]
  },
  {
    "id": "flex-sec-host-key",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "SSH host key trong FlexServer dùng để làm gì?",
    "a": "SSH host key dùng để xác nhận backend đang kết nối đúng VPS.\n\nKhi kết nối SSH, backend kiểm tra host key của VPS với key đã tin cậy trước đó. Nếu không khớp thì không tiếp tục kết nối.\n\nMục tiêu là tránh trường hợp backend kết nối nhầm hoặc bị chuyển hướng sang một server giả.",
    "choices": [
      "Xác nhận backend đang kết nối đúng VPS.",
      "Dùng để mã hóa password trong database.",
      "Dùng để tạo agent token.",
      "Dùng để lưu metrics."
    ],
    "correctIndex": 0,
    "follow": [
      "SSH host key khác SSH key dùng để đăng nhập thế nào?"
    ]
  },
  {
    "id": "flex-sec-provision-password",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Password SSH khi provision key có rủi ro gì và FlexServer xử lý thế nào?",
    "a": "Password phải đi từ frontend tới backend nên có rủi ro bị lộ nếu đường truyền hoặc logging không an toàn.\n\nFlexServer chỉ dùng password tạm thời để kết nối SSH và cài public key. Password không được lưu vào database, localStorage, log hoặc API response.\n\nKhi triển khai thật cần dùng HTTPS.",
    "choices": [
      "Chỉ dùng tạm thời để provision key và không lưu lại.",
      "Lưu plaintext để dùng cho mọi lần SSH.",
      "Gửi password cho Go agent lưu lâu dài.",
      "Đưa password vào URL để backend dễ đọc."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-agent-token",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Tại sao backend không lưu raw agent token?",
    "a": "Nếu database bị lộ mà raw token được lưu trực tiếp thì attacker có thể dùng token đó để giả agent.\n\nFlexServer chỉ lưu hash của phần secret. Khi agent gửi request, backend hash secret nhận được rồi so sánh với giá trị đã lưu.\n\nRaw token chỉ được tạo và trả ra một lần.",
    "choices": [
      "Để database bị lộ cũng không trực tiếp làm lộ raw token dùng để xác thực agent.",
      "Vì raw token không thể lưu trong PostgreSQL.",
      "Vì agent không cần token sau lần đầu.",
      "Vì frontend tự tạo lại token mỗi request."
    ],
    "correctIndex": 0,
    "follow": [
      "Token bị lộ trên VPS thì xử lý thế nào?"
    ]
  },
  {
    "id": "flex-sec-vpsid-token",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Tại sao backend xác định VPS từ agent token thay vì tin vpsId trong payload?",
    "a": "Nếu backend tin vpsId do agent gửi lên thì một agent có thể sửa payload để giả dữ liệu của VPS khác.\n\nTrong FlexServer, credential đã gắn với một VPS. Backend xác định VPS từ token đã xác thực thay vì tin vào vpsId do client tự khai báo.",
    "choices": [
      "Để agent không thể đổi vpsId trong payload rồi giả dữ liệu của VPS khác.",
      "Để giảm kích thước CPU usage.",
      "Vì PostgreSQL không lưu được vpsId.",
      "Vì SSE không hỗ trợ vpsId."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-session-cookie",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Session cookie của dashboard được bảo vệ như thế nào?",
    "a": "Sau khi login, backend tạo session token và lưu hash của token ở server.\n\nBrowser nhận token qua cookie có HttpOnly. Khi cấu hình HTTPS, cookie dùng Secure và hệ thống cũng cấu hình SameSite.\n\nLogout sẽ revoke session và xóa cookie.",
    "choices": [
      "Token được lưu trong HttpOnly cookie và backend chỉ lưu hash của session token.",
      "Session token luôn lưu trong localStorage.",
      "Backend trả private key qua cookie.",
      "Cookie không có thời gian hết hạn."
    ],
    "correctIndex": 0,
    "follow": [
      "HttpOnly giúp bảo vệ điều gì?",
      "Secure và SameSite có tác dụng gì?"
    ]
  },
  {
    "id": "flex-sec-origin",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "FlexServer kiểm tra Origin để làm gì?",
    "a": "Dashboard dùng cookie để xác thực, nên browser có thể tự gửi cookie kèm request.\n\nVới các request thay đổi dữ liệu như POST, PATCH hoặc DELETE, backend kiểm tra Origin để đảm bảo request đến từ dashboard được cho phép.\n\nNếu Origin không hợp lệ thì request bị từ chối.",
    "choices": [
      "Giảm nguy cơ một website khác lợi dụng browser của user để gửi request thay đổi dữ liệu.",
      "Kiểm tra CPU của VPS.",
      "Xác minh agent token.",
      "Thay thế HTTPS."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-terminal",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "FlexServer bảo vệ WebSocket remote terminal như thế nào?",
    "a": "Trước khi mở terminal, backend kiểm tra mode, Origin và session của dashboard.\n\nWebSocket cũng giới hạn kích thước message và terminal có timeout. Sau khi được phép, backend mới mở SSH session tới VPS.\n\nSSH key không được gửi xuống frontend.",
    "choices": [
      "Kiểm tra session và Origin, giới hạn kết nối/message rồi mới mở SSH session.",
      "Frontend nhận private key và SSH trực tiếp tới VPS.",
      "Bất kỳ WebSocket nào cũng được mở terminal.",
      "Terminal không cần authentication nếu biết VPS id."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-ssh-target",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Tại sao FlexServer chặn một số địa chỉ SSH như localhost hoặc metadata address?",
    "a": "Nếu user có thể yêu cầu backend SSH tới bất kỳ địa chỉ nào thì backend có thể bị lợi dụng để truy cập các máy hoặc dịch vụ nội bộ mà user không nên truy cập.\n\nVì vậy FlexServer có host policy chặn localhost, metadata/link-local và mặc định chặn private-network target nếu chưa được cho phép.",
    "choices": [
      "Để tránh backend bị lợi dụng làm điểm truy cập tới các địa chỉ nội bộ hoặc nhạy cảm.",
      "Vì ssh2 không hỗ trợ localhost.",
      "Vì agent chỉ chạy trên public IP.",
      "Để SSE hoạt động nhanh hơn."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-docker-access",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Tại sao quyền truy cập Docker socket được tắt mặc định?",
    "a": "Process có quyền truy cập Docker socket có thể tạo container với quyền rất cao và truy cập tài nguyên của host.\n\nVì vậy FlexServer không cấp quyền Docker cho agent mặc định. Chỉ khi user chủ động bật Docker metrics thì agent mới được cấp thêm quyền cần thiết.",
    "choices": [
      "Vì Docker socket có quyền rất lớn trên host nên chỉ cấp khi thực sự cần.",
      "Vì Docker socket không hoạt động trên Linux.",
      "Vì PostgreSQL cần chiếm Docker socket.",
      "Vì agent token thay thế Docker socket."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-rate-limit",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "Rate limiting trong FlexServer bảo vệ những endpoint nào quan trọng?",
    "a": "FlexServer giới hạn các request thay đổi dữ liệu và login theo IP.\n\nMục tiêu là giảm brute-force login và tránh một client gửi quá nhiều request nhạy cảm trong thời gian ngắn.\n\nAgent metric ingestion có giới hạn riêng vì nó gửi dữ liệu thường xuyên hơn.",
    "choices": [
      "Login và các mutation nhạy cảm được rate limit để giảm brute force và abuse.",
      "Chỉ file CSS bị rate limit.",
      "Rate limit dùng để mã hóa token.",
      "Rate limit thay thế authentication."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-secret-logging",
    "category": "FlexServer",
    "difficulty": "medium",
    "q": "FlexServer tránh làm lộ secret qua log như thế nào?",
    "a": "Các dữ liệu nhạy cảm như password và agent token không được ghi trực tiếp vào log.\n\nAgent cũng che token khi hiển thị config hoặc xử lý error response.\n\nMục tiêu là tránh secret bị lộ qua log, audit hoặc thông báo lỗi.",
    "choices": [
      "Không log password/raw token và che các giá trị nhạy cảm trong error/log output.",
      "Log toàn bộ token để debug dễ hơn.",
      "Gửi token vào audit log rồi mã hóa sau.",
      "Chỉ bảo vệ secret ở frontend."
    ],
    "correctIndex": 0
  },
  {
    "id": "flex-sec-backend-compromise",
    "category": "FlexServer",
    "difficulty": "hard",
    "q": "Nếu backend FlexServer bị compromise thì agent architecture có bảo vệ VPS hoàn toàn không?",
    "a": "Không. Backend vẫn có khả năng gửi các yêu cầu quản lý tới VPS và trong một số flow còn có SSH key.\n\nViệc dùng agent và giới hạn Docker operation giúp giảm phạm vi quyền của từng chức năng, nhưng không thể bảo vệ hoàn toàn nếu backend đã bị chiếm quyền.\n\nVì vậy vẫn phải bảo vệ backend, SSH key và agent credential.",
    "choices": [
      "Không; agent giúp giới hạn một số quyền nhưng backend bị chiếm vẫn là rủi ro lớn.",
      "Có; agent khiến backend không thể ảnh hưởng VPS nữa.",
      "Có; chỉ cần hash token là đủ.",
      "Không; vì agent không có authentication."
    ],
    "correctIndex": 0,
    "follow": [
      "Làm sao giảm thiệt hại nếu backend bị compromise?"
    ]
  },
  {
    "id": "system-browser-url-flow",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Khi user nhập một URL vào trình duyệt thì flow hoạt động thế nào?",
    "a": "Browser kiểm tra cache trước. Nếu cần, browser dùng DNS để tìm IP của domain rồi kết nối tới server. Nếu là HTTPS thì thực hiện TLS handshake. Request sau đó có thể đi qua reverse proxy như Nginx tới application. Application xử lý và trả response để browser render trang.",
    "choices": [
      "Cache → DNS → kết nối server → TLS nếu HTTPS → reverse proxy → application → response.",
      "Browser gửi request thẳng tới database rồi database render HTML.",
      "DNS xử lý toàn bộ business logic rồi trả trang web.",
      "TLS chỉ chạy sau khi browser đã render xong trang."
    ],
    "correctIndex": 0,
    "follow": [
      "Cache có thể xuất hiện ở những đâu trong flow này?",
      "Nginx đóng vai trò gì?"
    ]
  },
  {
    "id": "system-http-vs-https",
    "category": "System Design",
    "difficulty": "easy",
    "q": "HTTP khác HTTPS như thế nào?",
    "a": "HTTP truyền dữ liệu không được mã hóa. HTTPS là HTTP chạy trên TLS nên dữ liệu giữa client và server được mã hóa, đồng thời client có thể xác minh server thông qua certificate.",
    "choices": [
      "HTTPS là HTTP chạy trên TLS nên dữ liệu được mã hóa.",
      "HTTPS chỉ khác HTTP ở port, không có mã hóa.",
      "HTTP an toàn hơn vì không cần certificate.",
      "HTTPS chỉ dùng cho frontend, không dùng cho API."
    ],
    "correctIndex": 0
  },
  {
    "id": "system-tls",
    "category": "System Design",
    "difficulty": "easy",
    "q": "TLS là gì?",
    "a": "TLS là giao thức bảo mật dùng để mã hóa kết nối giữa client và server. Nó giúp bảo vệ dữ liệu trên đường truyền, kiểm tra dữ liệu không bị thay đổi và xác minh server thông qua certificate.",
    "choices": [
      "Giao thức bảo mật dùng để mã hóa và bảo vệ kết nối giữa client và server.",
      "Một loại database dùng để lưu session.",
      "Một giao thức thay thế DNS.",
      "Một cơ chế load balancing."
    ],
    "correctIndex": 0
  },
  {
    "id": "system-web-cache-flow",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Cache nằm ở đâu trong flow truy cập một website?",
    "a": "Cache có thể nằm ở nhiều lớp như DNS cache, browser cache, CDN hoặc reverse proxy cache, và backend cache như Redis. Nếu dữ liệu còn hợp lệ thì hệ thống dùng cache; nếu không thì request mới đi tiếp xuống server hoặc database.",
    "choices": [
      "Có thể ở DNS, browser, CDN/reverse proxy và backend như Redis.",
      "Chỉ tồn tại trong database.",
      "Chỉ tồn tại trong browser.",
      "Cache chỉ dùng cho password và token."
    ],
    "correctIndex": 0,
    "follow": [
      "Cache invalidation là gì?",
      "Browser cache và Redis cache khác nhau thế nào?"
    ]
  },
  {
    "id": "db-connection-pool",
    "category": "Database",
    "difficulty": "medium",
    "q": "Database connection pool là gì và tại sao backend cần nó?",
    "a": "Connection pool giữ sẵn một số kết nối database để nhiều request tái sử dụng thay vì mở kết nối mới mỗi lần. Nó giảm overhead, nhưng pool quá lớn có thể làm PostgreSQL quá tải. Khi scale nhiều backend instance phải tính tổng số connection của tất cả instance.",
    "choices": [
      "Tập các kết nối database được tái sử dụng giữa nhiều request.",
      "Một cache chứa toàn bộ table trong RAM.",
      "Cơ chế tạo database mới cho mỗi request.",
      "Một loại index của PostgreSQL."
    ],
    "correctIndex": 0,
    "follow": [
      "Khi scale nhiều backend instance thì connection pool cần lưu ý gì?"
    ]
  },
  {
    "id": "node-graceful-shutdown",
    "category": "Node.js",
    "difficulty": "medium",
    "q": "Graceful shutdown trong Node.js backend là gì?",
    "a": "Khi process nhận tín hiệu dừng, backend ngừng nhận request mới, chờ request đang xử lý hoàn tất, đóng database/Redis connection và các resource khác rồi mới thoát. Điều này giúp deploy hoặc restart giảm request bị lỗi giữa chừng.",
    "choices": [
      "Ngừng nhận việc mới, hoàn tất việc đang chạy và đóng resource trước khi process thoát.",
      "Kill process ngay lập tức để giải phóng RAM nhanh nhất.",
      "Restart database trước khi dừng backend.",
      "Chỉ xóa cache rồi tiếp tục chạy."
    ],
    "correctIndex": 0,
    "follow": [
      "Nếu chạy sau load balancer thì nên remove instance khỏi traffic lúc nào?"
    ]
  },
  {
    "id": "docker-healthcheck",
    "category": "Production",
    "difficulty": "medium",
    "q": "Docker healthcheck khác việc container đang running như thế nào?",
    "a": "Container running chỉ cho biết process/container chưa dừng. Healthcheck kiểm tra ứng dụng có thực sự hoạt động đúng hay không, ví dụ gọi endpoint /health. Process vẫn có thể chạy nhưng app bị kẹt hoặc không phục vụ request được.",
    "choices": [
      "Running nói container chưa dừng; healthcheck kiểm tra app có thực sự sẵn sàng/hoạt động hay không.",
      "Hai khái niệm luôn giống nhau.",
      "Healthcheck chỉ kiểm tra dung lượng disk.",
      "Container chỉ running khi database healthy."
    ],
    "correctIndex": 0,
    "follow": [
      "Healthcheck nên kiểm tra những dependency nào?"
    ]
  },
  {
    "id": "system-load-balancer-health",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Load balancer như Nginx/HAProxy biết backend instance nào nên nhận request bằng cách nào?",
    "a": "Load balancer có thể dùng health check để xác định backend nào còn healthy và chỉ route traffic tới các instance phù hợp. Khi một instance lỗi hoặc đang deploy, nó có thể được loại khỏi pool để request đi sang instance khác.",
    "choices": [
      "Dùng health check và loại instance unhealthy khỏi pool nhận traffic.",
      "Luôn gửi request ngẫu nhiên kể cả backend đã chết.",
      "Query trực tiếp database để chọn user.",
      "DNS tạo một backend mới cho mỗi request."
    ],
    "correctIndex": 0,
    "follow": [
      "Round-robin khác least-connections thế nào?",
      "Điều gì xảy ra khi một instance bị restart?"
    ]
  },
  {
    "id": "react-memoization",
    "category": "Frontend",
    "difficulty": "medium",
    "q": "Khi nào nên dùng React.memo, useMemo hoặc useCallback?",
    "a": "Chỉ nên dùng khi có vấn đề render hoặc tính toán đáng kể và memoization thực sự giúp giảm công việc. React.memo memo component theo props, useMemo giữ kết quả tính toán, còn useCallback giữ reference của function. Không nên thêm chúng vào mọi nơi vì bản thân memoization cũng có chi phí.",
    "choices": [
      "Dùng có chọn lọc khi cần giảm render/tính toán; không phải mặc định cho mọi component.",
      "Luôn dùng cả ba trong mọi component React.",
      "Chúng dùng để gọi API thay fetch.",
      "Chúng đảm bảo state không bao giờ thay đổi."
    ],
    "correctIndex": 0,
    "follow": [
      "useMemo và useCallback khác nhau thế nào?"
    ]
  }
];