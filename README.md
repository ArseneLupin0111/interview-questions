# Interview Questions — Full Stack / Backend

Bộ ghi chú ôn phỏng vấn được cá nhân hóa theo kinh nghiệm Node.js, React, TypeScript, PostgreSQL, Redis, MedusaJS, production troubleshooting và RAG.

## Flashcard App

Repo có một web app tĩnh trong thư mục [app](./app/):

- lọc theo chủ đề và độ khó
- tìm kiếm câu hỏi
- random question
- mock interview 10 câu
- ẩn/hiện đáp án
- đánh dấu Easy / Medium / Hard
- lưu progress bằng localStorage

### Chạy local

```bash
cd app
python3 -m http.server 8000
```

Mở `http://localhost:8000`.

Bạn cũng có thể publish thư mục `app/` bằng GitHub Pages nếu muốn có link mở trực tiếp trên điện thoại.

## Nội dung Markdown

- [Node.js](./01-nodejs.md)
- [NestJS & REST](./02-nestjs-rest.md)
- [PostgreSQL, ORM & SQL](./03-database.md)
- [Redis & Authentication](./04-redis-auth.md)
- [Production Debugging & System Basics](./05-system-debugging.md)
- [PostGifty / past-prj](./06-postgifty.md)
- [RAG Document Assistant](./07-rag-ai.md)
- [Frontend & DevOps](./08-frontend-devops.md)
- [High Priority Questions](./09-high-priority.md)

## Cách ôn

Mỗi câu nên trả lời theo 5 bước:

```text
1. Định nghĩa ngắn
2. Ví dụ đơn giản
3. Liên hệ project thật
4. Trade-off / limitation
5. Follow-up có thể bị hỏi
```

Mục tiêu là tránh học thuộc câu trả lời đơn lẻ; thay vào đó luyện theo chuỗi follow-up như một buổi technical interview thật.
