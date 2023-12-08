## 1. Description

Rikkei Academy Da Nang - Typescript with React

## 2. Prerequisite

- [NodeJS](https://nodejs.org) (v18)
- [TypeScript](https://www.typescriptlang.org/)

## 3. Techniques
- [ReactJS](https://legacy.reactjs.org/) (v18)
- [react-bootstrap](https://react-bootstrap.netlify.app/) (2.8)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/) (1.9)

## 4. Directory structure
```
└───src
    │   App.tsx
    │   index.tsx
    ├───apis/                           # Chứa định nghĩa liên quan tới API
    │   │   base.api.ts
    │   └───{xxx}/
    │       └───{yyy}/
    │           │   index.ts            # Định nghĩa API endpoints
    │           ├───requests/           # Định nghĩa API request types
    │           └───responses/          # Định nghĩa API response types
    ├───components/                     # Chứa các components
    │   ├───errors/                     # Common components liên quan tới lỗi
    │   ├───form/                       # Common components liên quan tới form (input/button)
    │   ├───partials/                   # Common components liên quan tới layouts
    │   ├───table/                      # Common components liên quan tới table
    │   └───views/                      # Components dành cho các page, cụm chức năng
    ├───layouts/                        # Chứa layouts sử dụng chung
    ├───pages/                          # Chứa các page components
    │   │   DashboardPage.tsx
    │   │   LoginPage.tsx
    │   ├───{xxx}/
    │   └───{yyy}/
    ├───routes/                         # Định nghĩa các routes
    ├───store/
    │   │   index.ts                    # Khởi tạo redux store
    │   ├───actions/                    # Chứa các redux actions
    │   │       xxx.action.ts
    │   │       yyy.action.ts
    │   └───reducers/                   # Chứa các redux reducers
    │           xxx.reduder.ts
    │           yyy.reduder.ts
    ├───types/                          # Chứa các định nghĩa types
    └───utilities/                      # Chứa các xử lý common
            xxx.util.ts
            yyy.util.ts
```

## 5. Installation

Chạy Terminal ở thư mục này
```bash
$ npm install
```

## 6. Running the app
Chạy Terminal ở thư mục này
```bash
# development
$ npm run start
```
