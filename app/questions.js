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
    ]
  },
  {
    "id": "node-await",
    "category": "Node.js",
    "difficulty": "easy",
    "q": "async/await có block Node.js không?",
    "a": "Không. await chỉ tạm dừng async function hiện tại cho tới khi Promise hoàn thành; nó không block toàn bộ Node.js process. Tuy nhiên code CPU-heavy chạy đồng bộ vẫn có thể block Event Loop.",
    "follow": [
      "Ví dụ nào thực sự block Event Loop?"
    ]
  },
  {
    "id": "node-promise-all",
    "category": "Node.js",
    "difficulty": "easy",
    "q": "Khi nào nên dùng Promise.all()?",
    "a": "Khi có nhiều tác vụ async độc lập với nhau và có thể chạy song song. Điều này giúp giảm tổng thời gian chờ so với await tuần tự.",
    "follow": [
      "Khi nào không nên dùng Promise.all?"
    ]
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
    ]
  },
  {
    "id": "rest-put-patch",
    "category": "REST API",
    "difficulty": "easy",
    "q": "PUT và PATCH khác nhau như thế nào?",
    "a": "Theo convention, PUT thường biểu diễn thay thế toàn bộ resource, còn PATCH cập nhật một phần resource. PUT thường được thiết kế idempotent; PATCH có thể idempotent hoặc không tùy implementation."
  },
  {
    "id": "db-orm",
    "category": "Database",
    "difficulty": "easy",
    "q": "ORM là gì?",
    "a": "ORM là Object-Relational Mapping, giúp map object/class trong code với table/row của relational database và hỗ trợ thao tác dữ liệu ở mức abstraction cao hơn raw SQL.",
    "follow": [
      "Khi nào dùng raw SQL thay ORM?"
    ]
  },
  {
    "id": "db-n1",
    "category": "Database",
    "difficulty": "medium",
    "q": "N+1 query là gì?",
    "a": "Đó là trường hợp chạy 1 query lấy danh sách rồi chạy thêm N query cho từng phần tử. Ví dụ 1 query lấy 100 orders rồi 100 query lấy customer, tổng cộng 101 queries.",
    "follow": [
      "Có những cách nào để xử lý N+1?"
    ]
  },
  {
    "id": "db-slow",
    "category": "Database",
    "difficulty": "medium",
    "q": "Nếu xác định database query chậm thì em làm gì?",
    "a": "Xem query thực tế và dùng EXPLAIN ANALYZE để kiểm tra execution plan; sau đó xem scan quá nhiều row, index, JOIN, N+1, lượng dữ liệu trả về và điều kiện WHERE/ORDER BY.",
    "follow": [
      "Có phải query chậm thì cứ thêm index không?"
    ]
  },
  {
    "id": "db-index",
    "category": "Database",
    "difficulty": "medium",
    "q": "Khi nào nên dùng index?",
    "a": "Cân nhắc index cho các column xuất hiện thường xuyên trong WHERE, JOIN, ORDER BY hoặc lookup. Không index mọi column vì index tốn storage và làm INSERT/UPDATE/DELETE tốn thêm chi phí."
  },
  {
    "id": "redis-use",
    "category": "Redis",
    "difficulty": "easy",
    "q": "Redis thường được dùng để làm gì?",
    "a": "Redis là in-memory data store thường dùng cho cache, temporary state, counters, rate limiting, distributed coordination và event/queue infrastructure.",
    "project": "Trong PostGifty, Medusa config có Redis-backed cache và Redis event bus."
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
    ]
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
    ]
  },
  {
    "id": "auth-refresh",
    "category": "Authentication",
    "difficulty": "medium",
    "q": "Access token và refresh token khác nhau thế nào?",
    "a": "Access token thường sống ngắn và dùng gọi API. Refresh token sống dài hơn và dùng để xin access token mới khi access token hết hạn.",
    "follow": [
      "Nên lưu refresh token ở đâu trên web?"
    ]
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
    ]
  },
  {
    "id": "external-api",
    "category": "Production",
    "difficulty": "medium",
    "q": "Nếu external API chậm thì xử lý thế nào?",
    "a": "Đo latency, đặt timeout hợp lý, retry có kiểm soát, chạy song song các call độc lập và chuyển tác vụ không cần đồng bộ sang background/event-driven flow nếu phù hợp."
  },
  {
    "id": "sentry",
    "category": "Production",
    "difficulty": "easy",
    "q": "Sentry giúp debug production như thế nào?",
    "a": "Sentry ghi nhận exception kèm stack trace và runtime context. Có thể dùng issue, breadcrumbs, environment/release và tần suất lỗi rồi correlate với logs hoặc deployment để tìm root cause."
  },
  {
    "id": "haproxy",
    "category": "System Design",
    "difficulty": "easy",
    "q": "HAProxy dùng để làm gì?",
    "a": "HAProxy thường đứng trước nhiều backend instance để làm reverse proxy và load balancing, có thể hỗ trợ health check, round-robin, sticky session và failover."
  },
  {
    "id": "sticky",
    "category": "System Design",
    "difficulty": "medium",
    "q": "Sticky session có giải quyết consistency giữa các backend instance không?",
    "a": "Không. Sticky session chỉ là routing strategy. Webhook, background job, retry, failover hoặc request từ session khác vẫn có thể vào instance khác.",
    "project": "Trong flow Zalo → n8n → backend, request webhook không nhất thiết mang context sticky-session của browser."
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
    ]
  },
  {
    "id": "post-cart-lock",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Lock cart_id giải quyết vấn đề gì và không giải quyết vấn đề gì?",
    "a": "Lock cart_id giúp tránh cùng một cart bị checkout đồng thời, ví dụ double-click hoặc retry. Nó không tự giải quyết hai cart khác nhau cùng tranh một inventory item.",
    "follow": [
      "Vậy inventory contention được xử lý ở đâu?"
    ]
  },
  {
    "id": "post-groupbuy",
    "category": "PostGifty",
    "difficulty": "hard",
    "q": "Group-buy chống oversell như thế nào?",
    "a": "Project có thêm lock theo campaign_id + variant_id để tránh nhiều cart chạy đồng thời vượt quota của cùng campaign/variant.",
    "follow": [
      "Tại sao lock cart_id chưa đủ?"
    ]
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
    ]
  },
  {
    "id": "rag-flow",
    "category": "RAG",
    "difficulty": "medium",
    "q": "Mô tả RAG workflow của document assistant.",
    "a": "n8n theo dõi Google Drive, tải và extract file, chia text thành chunks, dùng Google Gemini Embedding tạo vectors và lưu vào Supabase PostgreSQL với pgvector. Khi user hỏi, query cũng được embedding, vector search lấy các chunks liên quan nhất rồi đưa question + chunks vào LLM để generate answer.",
    "project": "Workflow hiện tại dùng topK = 5; embedding dùng Gemini và agent sử dụng GPT-4o-mini."
  },
  {
    "id": "rag-chunk",
    "category": "RAG",
    "difficulty": "easy",
    "q": "Tại sao phải chia tài liệu thành các chunk?",
    "a": "Để mỗi embedding đại diện cho một phần nội dung cụ thể hơn. Nếu embedding cả tài liệu dài chứa nhiều chủ đề, semantic meaning bị trộn và retrieval khó tìm đúng đoạn liên quan.",
    "follow": [
      "Chunk size và overlap ảnh hưởng thế nào?"
    ]
  },
  {
    "id": "rag-splitter",
    "category": "RAG",
    "difficulty": "easy",
    "q": "Text splitter là gì?",
    "a": "Text splitter chia document dài thành các chunk nhỏ trước khi embedding. Chunk overlap giữ lại một phần nội dung giữa hai chunk liên tiếp để giảm mất context ở điểm cắt.",
    "project": "Workflow dùng Character Text Splitter và cấu hình chunkOverlap = 100."
  },
  {
    "id": "rag-pgvector",
    "category": "RAG",
    "difficulty": "medium",
    "q": "pgvector là gì?",
    "a": "pgvector là extension của PostgreSQL cho phép lưu vector và thực hiện vector similarity search. Nó không tạo embedding; embedding model tạo vector, còn pgvector lưu và tìm các vector gần nhau.",
    "project": "Workflow lưu embedding trong cột vector(3072) và dùng hàm match_documents để retrieval."
  },
  {
    "id": "rag-retrieve",
    "category": "RAG",
    "difficulty": "medium",
    "q": "Hệ thống biết chunk nào liên quan tới câu hỏi bằng cách nào?",
    "a": "Câu hỏi được chuyển thành query vector bằng cùng embedding model. pgvector so query vector với vectors của chunks, xếp hạng theo distance/similarity và lấy top K chunks liên quan nhất.",
    "follow": [
      "LLM có tự search tất cả chunks không?"
    ]
  },
  {
    "id": "rag-llm",
    "category": "RAG",
    "difficulty": "medium",
    "q": "LLM có phải là thành phần trực tiếp tìm các chunk gần nhất không?",
    "a": "Không. Khi dùng RAG, embedding model + vector database thực hiện retrieval. LLM nhận question cùng các chunks đã retrieve để reasoning và tạo câu trả lời.",
    "project": "Trong workflow agent có thể quyết định dùng RAG tool, full-document tool hoặc SQL tool tùy loại câu hỏi."
  },
  {
    "id": "rag-tabular",
    "category": "RAG",
    "difficulty": "hard",
    "q": "Tại sao Excel/CSV không chỉ dùng vector search?",
    "a": "Các câu hỏi như SUM, AVG, MAX cần tính toán chính xác. Workflow lưu tabular rows trong PostgreSQL JSONB và cho agent query SQL thay vì dựa vào semantic retrieval, vốn không phù hợp cho phép tính exact."
  },
  {
    "id": "frontend-ssr",
    "category": "Frontend",
    "difficulty": "medium",
    "q": "SSR và CSR khác nhau thế nào?",
    "a": "SSR render nội dung trên server trước khi gửi HTML về browser, phù hợp public/SEO-sensitive pages. CSR để browser chạy JavaScript, gọi API và render UI, phù hợp dashboard hoặc app tương tác cao."
  }
];