
# Focus Extension API

Simple API for the Focus Mode extension website, the API is used to report bugs or provide feedback.

## API Reference

#### **POST**

```http
  POST /report-feedback
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of post |
| `content`      | `string` | **Required**. Content of post |
| `authorName`      | `string` | **Required**. Name of the post author |
| `type`      | `enum` | **Required**. BUG or FEEDBACK |

#### **GET** 

```http
  GET /report-feedback/bugs
```

| Parameter |  Description                |
| :-------- |  :------------------------- |
| `/bugs`   |  **GET** all bugs reports |

```http
  GET /report-feedback/feedbacks
```

| Parameter |  Description                |
| :-------- |  :------------------------- |
| `/feedbacks`   |  **GET** all feedbacks |

#### **DELETE ITEM**

```http
  DELETE /report-feedback/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

    
## Run Locally

Clone the project

```bash
  git clone https://github.com/yuuhLKT/focus-api.git
```

Go to the project directory

```bash
  cd focus-api
```

Install dependencies

```bash
  npm install
```

Run DataBase via Docker.

```bash
  docker compose up -d
```

Start Prisma (wait create postgres_data)

```bash
  npx prisma migrate dev --name init
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL="postgresql://pguser:pgpassword@localhost:5432/mydb?schema=public"`

