window.INTERVIEW_QUESTIONS = [
  {
    "id": "node-event-loop",
    "category": "Node.js",
    "difficulty": "medium",
    "q": "Event Loop trong Node.js hoạt động như thế nào?",
    "a": "Event Loop điều phối việc thực thi các callback của tác vụ bất đồng bộ. Khi Node.js chờ I/O như database, Redis, file hoặc network, main thread có thể tiếp tục xử lý công việc khác thay vì đứng chờ.",
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
    "a": "Không. await chỉ tạm dừng async function hiện tại cho tới khi Promise hoàn thành; nó không block toàn bộ Node.js process. Tuy nhiên code CPU-heavy chạy đồng bộ vẫn có thể block Event Loop.",
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
    "a": "Khi có nhiều tác vụ async độc lập với nhau và có thể chạy song song. Điều này giúp giảm tổng thời gian chờ so với await tuần tự.",
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
    "a": "Thay vì một class tự tạo dependency bằng new, dependency được NestJS container tạo và inject từ bên ngoài. Điều này giảm coupling và giúp test, thay thế implementation dễ hơn.",
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
    "a": "Theo convention, PUT thường biểu diễn thay thế toàn bộ resource, còn PATCH cập nhật một phần resource. PUT thường được thiết kế idempotent; PATCH có thể idempotent hoặc không tùy implementation.",
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
    "a": "ORM là Object-Relational Mapping, giúp map object/class trong code với table/row của relational database và hỗ trợ thao tác dữ liệu ở mức abstraction cao hơn raw SQL.",
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
    "a": "Đó là trường hợp chạy 1 query lấy danh sách rồi chạy thêm N query cho từng phần tử. Ví dụ 1 query lấy 100 orders rồi 100 query lấy customer, tổng cộng 101 queries.",
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
    "a": "Xem query thực tế và dùng EXPLAIN ANALYZE để kiểm tra execution plan; sau đó xem scan quá nhiều row, index, JOIN, N+1, lượng dữ liệu trả về và điều kiện WHERE/ORDER BY.",
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
    "a": "Cân nhắc index cho các column xuất hiện thường xuyên trong WHERE, JOIN, ORDER BY hoặc lookup. Không index mọi column vì index tốn storage và làm INSERT/UPDATE/DELETE tốn thêm chi phí.",
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
    "a": "Redis là in-memory data store thường dùng cho cache, temporary state, counters, rate limiting, distributed coordination và event/queue infrastructure.",
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
    "a": "Nếu mỗi backend dùng Redis riêng thì state không được chia sẻ. Shared Redis cho phép các backend instance cùng đọc/ghi một state chung, phù hợp cho cache hoặc distributed state cần consistency giữa instances.",
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
    "a": "Sau login, server verify credentials và cấp JWT. Client gửi token ở các request sau; server verify signature và expiration rồi mới tin claims trong token.",
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
    "a": "Access token thường sống ngắn và dùng gọi API. Refresh token sống dài hơn và dùng để xin access token mới khi access token hết hạn.",
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
    "a": "Đầu tiên đo để xác định bottleneck thay vì đoán. Kiểm tra timing từng phần: business logic, database, Redis, external API, payload/network và tài nguyên server như CPU, memory, event loop hoặc connection pool.",
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
    "a": "Đo latency, đặt timeout hợp lý, retry có kiểm soát, chạy song song các call độc lập và chuyển tác vụ không cần đồng bộ sang background/event-driven flow nếu phù hợp.",
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
    "a": "Sentry ghi nhận exception kèm stack trace và runtime context. Có thể dùng issue, breadcrumbs, environment/release và tần suất lỗi rồi correlate với logs hoặc deployment để tìm root cause.",
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
    "a": "HAProxy thường đứng trước nhiều backend instance để làm reverse proxy và load balancing, có thể hỗ trợ health check, round-robin, sticky session và failover.",
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
    "a": "Không. Sticky session chỉ là routing strategy. Webhook, background job, retry, failover hoặc request từ session khác vẫn có thể vào instance khác.",
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
    "a": "Một cart có thể chứa sản phẩm từ nhiều shop. Flow chính: validate request, lock cart để tránh checkout trùng, complete parent order, group items theo shop, tạo child orders và tiếp tục xử lý các phần liên quan như payment, shipping và reservation.",
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
    "a": "Lock cart_id giúp tránh cùng một cart bị checkout đồng thời, ví dụ double-click hoặc retry. Nó không tự giải quyết hai cart khác nhau cùng tranh một inventory item.",
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
    "a": "Project có thêm lock theo campaign_id + variant_id để tránh nhiều cart chạy đồng thời vượt quota của cùng campaign/variant.",
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
    "a": "Flow theo pattern check → transaction → PostgreSQL advisory lock → double-check → create/update → commit. Việc double-check sau khi đã có lock giúp tránh hai request cùng pass điều kiện ban đầu.",
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
    "a": "n8n theo dõi Google Drive, tải và extract file, chia text thành chunks, dùng Google Gemini Embedding tạo vectors và lưu vào Supabase PostgreSQL với pgvector. Khi user hỏi, query cũng được embedding, vector search lấy các chunks liên quan nhất rồi đưa question + chunks vào LLM để generate answer.",
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
    "a": "Để mỗi embedding đại diện cho một phần nội dung cụ thể hơn. Nếu embedding cả tài liệu dài chứa nhiều chủ đề, semantic meaning bị trộn và retrieval khó tìm đúng đoạn liên quan.",
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
    "a": "Text splitter chia document dài thành các chunk nhỏ trước khi embedding. Chunk overlap giữ lại một phần nội dung giữa hai chunk liên tiếp để giảm mất context ở điểm cắt.",
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
    "a": "pgvector là extension của PostgreSQL cho phép lưu vector và thực hiện vector similarity search. Nó không tạo embedding; embedding model tạo vector, còn pgvector lưu và tìm các vector gần nhau.",
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
    "a": "Câu hỏi được chuyển thành query vector bằng cùng embedding model. pgvector so query vector với vectors của chunks, xếp hạng theo distance/similarity và lấy top K chunks liên quan nhất.",
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
    "a": "Không. Khi dùng RAG, embedding model + vector database thực hiện retrieval. LLM nhận question cùng các chunks đã retrieve để reasoning và tạo câu trả lời.",
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
    "a": "Các câu hỏi như SUM, AVG, MAX cần tính toán chính xác. Workflow lưu tabular rows trong PostgreSQL JSONB và cho agent query SQL thay vì dựa vào semantic retrieval, vốn không phù hợp cho phép tính exact.",
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
    "a": "SSR render nội dung trên server trước khi gửi HTML về browser, phù hợp public/SEO-sensitive pages. CSR để browser chạy JavaScript, gọi API và render UI, phù hợp dashboard hoặc app tương tác cao.",
    "choices": [
      "SSR render trên server trước khi gửi HTML; CSR để browser chạy JS/gọi API và render UI.",
      "SSR và CSR là hai tên khác nhau của cùng một cơ chế.",
      "CSR luôn tốt hơn cho SEO vì browser render sau.",
      "SSR chỉ dùng cho mobile app."
    ],
    "correctIndex": 0
  }
];