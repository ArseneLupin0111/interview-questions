# PostgreSQL, ORM & SQL

## ORM là gì?
ORM = Object-Relational Mapping. ORM giúp map object/class trong code với table/row trong relational database.

```text
TypeScript Object
      ↓
     ORM
      ↓
     SQL
      ↓
 PostgreSQL
```

## ORM và raw SQL khác nhau thế nào?
### ORM
- abstraction cao hơn
- CRUD nhanh
- maintain dễ

### Raw SQL
- kiểm soát query chi tiết
- phù hợp report/aggregate/query đặc thù DB

Trong PostGifty, persistence chính của Medusa v2 dựa trên MikroORM; một số custom query dùng Knex/PG_CONNECTION.

## MikroORM và Knex liên quan thế nào?
`@mikro-orm/knex` là integration layer để MikroORM làm việc với SQL thông qua Knex. Nó không phải là package `knex` độc lập.

## Khi nào project dùng raw query?
Các nhóm điển hình:
- report: COUNT, SUM, AVG, CASE, FILTER
- JOIN phức tạp
- PostgreSQL-specific feature
- advisory lock
- health check

Ví dụ:
```ts
await trx.raw(
  'SELECT pg_advisory_xact_lock(hashtext(?), hashtext(?))',
  [customerId, promotionId]
)
```

## LEFT JOIN là gì?
Lấy tất cả bản ghi từ bảng bên trái; bảng phải không match thì giá trị là NULL.

## N+1 query là gì?
1 query lấy danh sách + N query lấy relation cho từng item.

```text
1 query lấy 100 orders
+ 100 query lấy customer
= 101 queries
```

### Cách xử lý
- JOIN
- eager loading
- batch query bằng IN

## Index là gì?
Index giúp DB tìm row nhanh hơn, nhưng làm write tốn thêm chi phí.

Thường cân nhắc index cho column xuất hiện nhiều trong:
- WHERE
- JOIN
- ORDER BY
- lookup thường xuyên

## Query chậm thì debug thế nào?
1. Xem query thực tế.
2. Dùng EXPLAIN ANALYZE.
3. Kiểm tra scan quá nhiều row.
4. Kiểm tra index.
5. Kiểm tra JOIN/N+1.
6. Giảm dữ liệu trả về nếu cần.
