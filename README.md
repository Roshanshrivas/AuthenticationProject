# 🔐 AuthenticationProject API

This project provides a complete authentication system with endpoints for user registration, login, token refresh, logout, and profile access using Node.js and Express.js.

---

## 🌍 Base URL

```
http://localhost:8000/api/v1/user
```

---

## 📌 API Endpoints

### ✅ POST `/register` - **User Registration**

Registers a new user.

#### 📥 Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "user"
}
```

#### 📤 Response

```json
{
  "success": true,
  "message": "",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "",
    "role": "user",
    "_id": "unique_user_id",
    "createdAt": "2023-10-01T12:00:00Z",
    "updatedAt": "2023-10-01T12:00:00Z",
    "__v": 0
  }
}
```

---

### ✅ POST `/login` - **User Login**

Logs in the user and returns tokens.

#### 📥 Request Body

```json
{
  "email": "roshan@example.com",
  "password": "123456"
}
```

---

### 🔄 GET `/refresh-token` - **Refresh Token**

Generates a new access token.

#### 📥 Request Body

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

#### 📤 Response

```json
{
  "accessToken": "new_access_token_value"
}
```

---

### 🚪 POST `/logout` - **Logout User**

Logs the user out securely.

#### 📥 Request Body

```json
{
  "email": "roshan@example.com",
  "password": "123456"
}
```

#### 📤 Response

```json
{
  "success": true,
  "message": "User successfully logged out."
}
```

---

### 👤 GET `/profile` - **User Profile**

Returns user profile info.

#### 🛡️ Authorization Header

```
Authorization: Bearer <JWT_TOKEN>
```

#### 📥 Request Body

```json
{
  "email": "roshan@example.com",
  "password": "123456"
}
```

#### 📤 Response

```json
{
  "message": "",
  "user": {
    "id": "",
    "role": "",
    "iat": 0,
    "exp": 0
  }
}
```

---

## 🧪 Testing with Postman

- Create a collection and add above endpoints.
- Use **raw JSON body** and select **application/json**.
- Include **Authorization: Bearer <token>** where needed.
- Save and optionally publish your Postman collection.

---

## 🔐 Authentication Method

All secure routes (like `/profile`) require a **JWT Bearer Token** in the `Authorization` header.

---

## 📃 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Roshan Shrivas**