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
  }
];