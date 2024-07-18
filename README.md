
# Focus Extension API

Simple API for the [Focus Mode extension](https://github.com/yuuhLKT/Focus-Extension) website, the API is used to report bugs and receive feedback. The API was made using Typescript, Node, Prisma, Docker for Postgresql and Fastify.

## API Reference

**POST, UPDATE and DELETE ROUTES NEEDS 'Authorization' IN HEADERS**

### FEEDBACK and BUG REPORTS

#### **POST**

```http
  POST /report-feedback
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of post |
| `content`      | `string` | **Required**. Content of post |
| `authorName`      | `string` | **Required**. Name of the post author |
| `type`      | `enum` | **Required**. bug or feedback |

#### **GET** 

```http
  GET /report-feedback/?type=${type}
```

| Parameter |  Description                |
| :-------- |  :------------------------- |
| `type`   |  **REQUIRED** feedback or bug|

```http
  GET /report-feedback/${id}
```

#### **UPDATE**

```http
  PATCH /report-feedback/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `enum` | **Required**. Update status for: open, working or solved  |

#### **DELETE**

```http
  DELETE /report-feedback/${id}
``

### COMMENTS

#### **POST**

```http
  POST /admin/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `commentTitle`      | `string` | **Required**. Title of comment |
| `content`      | `string` | **Required**. Content of comment |
| `authorName`      | `string` | **Required**. Name of the comment author |
| `reportFeedbackId`      | `enum` | **Required**. ID of Report post or Feedback post |

#### **GET** 

```http
  GET /admin/post/comments/${id}
```

| Parameter |  Description                |
| :-------- |  :------------------------- |
| `id`   |  **REQUIRED** ID of Report post or Feedback post |

```http
  GET /comments/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of comment |


#### **DELETE**

```http
  DELETE /comments/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL="postgresql://pguser:pgpassword@localhost:5432/mydb?schema=public"`
`AUTH_TOKEN_HEADER="YOUR_TOKEN_PREFERENCE"`

    
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

Start the server (only when finish the above command)

```bash
  npm run dev
```


