# RAG Document Assistant

## RAG là gì?
RAG = Retrieval-Augmented Generation.

```text
Retrieval
→ tìm dữ liệu liên quan

Augmented
→ đưa dữ liệu vào context

Generation
→ LLM sinh câu trả lời
```

## Workflow thực tế
```text
Google Drive
   ↓
File Created / Updated
   ↓
Download + Extract
   ↓
Text Splitter
   ↓
Chunks
   ↓
Google Gemini Embedding
   ↓
Supabase PostgreSQL + pgvector
```

Khi user hỏi:
```text
Question
   ↓
Gemini Embedding
   ↓
Query Vector
   ↓
pgvector similarity search
   ↓
Top relevant chunks
   ↓
LLM
   ↓
Answer
```

## Text Splitter là gì?
Text splitter chia document dài thành các chunk nhỏ để mỗi embedding đại diện cho nội dung cụ thể hơn.

Workflow dùng Character Text Splitter với chunk overlap.

### Tại sao cần chunk overlap?
Để giảm mất context ở ranh giới giữa hai chunk.

## Embedding model làm gì?
Embedding model không chunk tài liệu. Nó biến text thành vector số biểu diễn semantic meaning.

```text
"quy trình hoàn tiền"
     ↓
Embedding model
     ↓
[0.12, -0.44, 0.82, ...]
```

## pgvector là gì?
pgvector là PostgreSQL extension cho phép lưu vector và làm vector similarity search.

```text
Embedding model
→ tạo vector

pgvector
→ lưu vector
→ so sánh vector
→ retrieve chunk
```

## Hệ thống chọn đúng chunk thế nào?
1. Câu hỏi được embedding thành query vector.
2. pgvector so query vector với vectors của chunks.
3. Sort theo distance/similarity.
4. Lấy top K chunks.
5. Đưa chunks + question vào LLM.

Trong workflow hiện tại, vector store được cấu hình topK = 5.

## LLM có tự search tất cả chunks không?
Không. Khi RAG được chọn, embedding model + vector database thực hiện retrieval. LLM nhận các chunks đã được retrieve và generate câu trả lời.

## Tabular data xử lý thế nào?
Excel/CSV được lưu structured data và agent có thể dùng SQL cho câu hỏi cần phép tính chính xác như SUM/AVG/MAX thay vì chỉ dùng semantic search.

## Câu trả lời 30 giây
> Em dùng n8n để orchestration RAG workflow. Tài liệu từ Google Drive được extract và chia thành các chunk, sau đó Gemini Embedding Model chuyển từng chunk thành vector và lưu vào Supabase PostgreSQL với pgvector. Khi user hỏi, câu hỏi cũng được embedding, hệ thống similarity search để lấy các chunk liên quan nhất rồi đưa chúng cùng câu hỏi vào LLM để generate câu trả lời.
