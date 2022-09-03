# SNO FESTU
## About
The website is intended for the student scientific society of the Far Eastern State Transport University (SNO FESTU).

Technology stack: React, Redux Thunk, Express, MongoDB  
[Website layout in Figma](https://www.figma.com/file/ljRAUvsq7rvVxfNHA2EFM7/SiteSNO?node-id=0%3A1)

Authors: [Maksim Strashko](https://github.com/StrashkoMaksim) and [Dmitry Duda](https://github.com/fire-insurance)


## Public
The user can access the following pages:
+ About SNO
+ News (with pagination and filtering by tags)
+ Leaders and Council of the SNO
+ Student registration form
+ Events, documents, student conference, increased scholarship
+ News/Section Detail Page

## Admin
The resource administrator has the ability to log in and go to the admin panel, which provides methods for adding, changing and deleting
all the above data.

## Usage
Fullstack run in developer mode: `npm run dev`  
Frontend run in developer mode: `npm run frontend-watch`  
Frontend build: `npm run frontend-build`  
Backend run in developer mode: `npm run backend-watch`  
Backend build: `npm run backend-build`

## .env
```
DB = 'MongoDB_CONNECTION_STRING'
adminLogin = 'ADMIN_LOGIN'
adminPassword = 'ADMIN_PASSWORD'
jwtSecret = 'JWT_SECRET_KEY'
baseUrl = 'SERVER_BASE_URL'
tempPath = 'PATH_TO_THE_FOLDER_WITH_TEMPORARY_FILES'
staticPath = 'PATH_TO_THE_FOLDER_WITH_STATIC_FILES'
```