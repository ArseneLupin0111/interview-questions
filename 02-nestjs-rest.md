# NestJS & REST API

## NestJS có những thành phần nào?
- Module: gom các thành phần liên quan.
- Controller: nhận request.
- Service: chứa business logic.
- Provider: dependency mà Nest có thể quản lý/inject.
- Middleware: xử lý request trước route.
- Guard: kiểm tra có được phép truy cập không.
- Pipe: validate/transform input.
- Interceptor: xử lý trước/sau controller.
- Exception Filter: xử lý exception.

```text
Request
  ↓
Middleware
  ↓
Guard
  ↓
Pipe
  ↓
Controller
  ↓
Service
  ↓
Response
```

## Provider khác Service thế nào?
Service là một loại Provider.

> Service là tên gọi theo vai trò business. Provider là tên gọi theo cơ chế Dependency Injection của NestJS.

## Dependency Injection là gì?
Thay vì class tự tạo dependency bằng `new`, dependency được cung cấp từ bên ngoài.

```ts
@Injectable()
export class OrderService {
  constructor(private readonly userService: UserService) {}
}
```

## REST API là gì?
REST là cách thiết kế API dựa trên resource và HTTP methods.

```text
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

## PUT khác PATCH thế nào?
- PUT: thường biểu diễn thay thế toàn bộ resource.
- PATCH: cập nhật một phần resource.

## 401 khác 403?
- 401 Unauthorized: chưa xác thực hợp lệ.
- 403 Forbidden: đã xác thực nhưng không có quyền.
