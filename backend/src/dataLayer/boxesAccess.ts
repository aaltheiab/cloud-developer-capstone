import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BoxItem } from '../models/BoxItem'
import { CreateBoxRequest } from '../requests/CreateBoxRequest'
import { UpdateBoxRequest } from '../requests/UpdateBoxRequest'
// import { TodoUpdate } from '../models/TodoUpdate'
// import { createLogger } from '../utils/logger'
// const logger = createLogger('BoxesAccess')

const DEFAULT_URL = 'https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/no-image.jpg'

function createDynamoDBClient() {
  return new AWS.DynamoDB.DocumentClient()
}

export class BoxesAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly boxesTable = process.env.BOXES_TABLE) {
  }

  async getBoxes(): Promise<BoxItem[]> {
    console.log('Getting all Boxes')

    const result = await this.docClient.scan({
      TableName: this.boxesTable
      // IndexName : imageIdIndex,
      // KeyConditionExpression: 'userId = :userId',
      // ExpressionAttributeValues: {
      //   ':userId': userId
      // }
    }).promise()

    const items = result.Items
    return items as BoxItem[]
  }

  async createBox(boxId: string, newBox: CreateBoxRequest): Promise<BoxItem> {
    const createdAt = new Date().toISOString()
    const attachmentUrl = newBox.attachmentUrl || DEFAULT_URL;

    const newItem = {
      boxId,
      createdAt,
      attachmentUrl,
      ...newBox
    }

    await this.docClient.put({
      TableName: this.boxesTable,
      Item: newItem
    }).promise()

    return newItem as BoxItem
  }

  async updateBox(boxId: string, sku: string, updatedBox: UpdateBoxRequest): Promise<BoxItem> {

    const params = {
      TableName: this.boxesTable,
      Key: {
        boxId,
        sku
      },
      UpdateExpression: "set #length = :length, width = :width, height = :height, attachmentUrl=:attachmentUrl",
      ExpressionAttributeNames: {
        '#length': 'length'
      },
      ExpressionAttributeValues: {
        ":length": updatedBox.length,
        ":width": updatedBox.width,
        ":height": updatedBox.height,
        ":attachmentUrl": updatedBox.attachmentUrl
      },
      ReturnValues: "UPDATED_NEW"
    };

    // source:
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
    const updatedItem = await this.docClient.update(params).promise();

    return updatedItem.Attributes as BoxItem
  }

  // async updateTodo(userId: string, todoId: string, updatedTodo: TodoUpdate): Promise<TodoItem> {

  //   var params = {
  //     TableName: this.todosTable,
  //     Key: {
  //       "userId": userId,
  //       "todoId": todoId
  //     },
  //     UpdateExpression: "set #name = :name, dueDate = :dueDate, done = :done",
  //     ExpressionAttributeNames: {
  //       '#name': 'name'
  //     },
  //     ExpressionAttributeValues: {
  //       ":name": updatedTodo.name,
  //       ":dueDate": updatedTodo.dueDate,
  //       ":done": updatedTodo.done
  //     },
  //     ReturnValues: "UPDATED_NEW"
  //   };

  //   // source:
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
  //   const updatedItem = await this.docClient.update(params).promise();

  //   return updatedItem.Attributes as TodoItem
  // }

  // async deleteTodo(userId: string, todoId: string): Promise<void> {

  //   var params = {
  //     TableName: this.todosTable,
  //     Key: {
  //       "userId": userId,
  //       "todoId": todoId
  //     }
  //   };

  //   // source:
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.06
  //   await this.docClient.delete(params).promise();
  // }


  // async updateTodoImageUrl(userId: string, todoId: string, imageUrl: string): Promise<void> {

  //   var params = {
  //     TableName: this.boxesTable,
  //     Key: {
  //       "userId": userId,
  //       "todoId": todoId
  //     },
  //     UpdateExpression: "set attachmentUrl = :attachmentUrl",
  //     ExpressionAttributeValues: {
  //       ":attachmentUrl": imageUrl
  //     },
  //     ReturnValues: "UPDATED_NEW"
  //   };

  //   // source:
  //   // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
  //   await this.docClient.update(params).promise();
  // }

}

