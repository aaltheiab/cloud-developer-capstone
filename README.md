# Serverless Cardboard Boxes Search

Simple application intended to collect data about cardboard boxes available in the market and have their picture and some import details.
Users then will be able to search through these boxes by inputing height, length, and width. The application will fetch with a difference of 10%
between the provided inputs and the data stored in the database.

# Functionality of the application

This application:
-  Allow creating/updating/fetching cardboard Boxes.
-  Each Box may have an attachmentUrl
-  Each Box will have Height, Width, and Length

# Boxes Items

The application should store Box items, and each Box item contains the following fields:

* `sku` (string) - Stock Keeping Unit
* `height` (float) - Box Height
* `width` (float) - Box Width
* `length` (float) - Box Length


# Functions to be implemented

To implement this project, you need to implement the following functions and configure them in the `backend/serverless.yml` file:

* `GetBoxes` - should return all Boxes.

Query Parameters Allowed (used to fetch the right boxes size):
- height (float)
- width (float)
- length (float)

Response Data:
```json
{
    "items": [
        {
            "createdAt": "2020-06-02T18:35:43.892Z",
            "leng": 39.8,
            "width": 26.9,
            "attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/139.jpeg",
            "sku": "139",
            "height": 19.7
        },
        {
            "leng": 28,
            "attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg",
            "height": 8,
            "sku": "2",
            "width": 28
        },
        {
            "createdAt": "2020-06-02T18:34:02.550Z",
            "leng": 50,
            "width": 35,
            "attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/116.jpeg",
            "sku": "116",
            "height": 20
        }
  ]
}
```

* `CreateBox` - should create a new Box with the given data. 
A shape of data send by a client application to this function can be found in the `backend/src/requests/CreateBoxRequest.ts` file

Request Data:
```json
{
	"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg",
	"height": 8,
	"width": 28,
	"sku": "150",
	"leng": 28
}
```

Response Data:
```json
{
    "item": {
        "sku": "150",
        "createdAt": "2020-06-03T14:11:45.450Z",
        "attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg",
        "height": 8,
        "width": 28,
        "leng": 28
    }
}
```

* `UpdateBox` - should update a Box item.
 A shape of data send by a client application to this function can be found in the `backend/src/requests/UpdateBoxRequest.ts` file

Request Data:
```json
{
	"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg",
	"height": 8,
	"width": 28,
	"sku": "150",
	"leng": 28
}
```

Response Data:
```json
{
    "item": {
        "leng": 28,
        "attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg",
        "height": 8,
        "width": 28
    }
}
```


# Frontend

The `client` folder contains a web application that can use the API.




## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

```
cd client
npm install
npm run start
```


# Postman collection
Can be found in the root of the application with the file called
```Capstone - Cloud Developer.postman_collection.json```

# Tests
Inside the postman requests there are test cases written against the Lambda functions build using the serverless application.
