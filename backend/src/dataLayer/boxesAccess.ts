import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BoxItem } from '../models/BoxItem'
import { CreateBoxRequest } from '../requests/CreateBoxRequest'
import { UpdateBoxRequest } from '../requests/UpdateBoxRequest'
// import { TodoUpdate } from '../models/TodoUpdate'
import { createLogger } from '../utils/logger'
const logger = createLogger('BoxesAccess')

const DEFAULT_URL = 'https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/no-image.jpg'
const PERCENTAGE = 10
function createDynamoDBClient() {
  return new AWS.DynamoDB.DocumentClient()
}

export class BoxesAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly boxesTable = process.env.BOXES_TABLE//,
    // private readonly boxesIndex = process.env.INDEX_NAME
  ) {
  }

  async getBoxes(params: object): Promise<BoxItem[]> {



    if (params && (params['width'] || params['height'] || params['length'] || params['leng'])) {
      var width = params['width']
      var height = params['height']
      var length = params['length'] || params['leng']

      var paramResult = {
        TableName: this.boxesTable,
        ExpressionAttributeValues: {},
        FilterExpression: ''
      }

      var paramsCombined = []

      if (width) {
        paramsCombined.push({
          FilterExpression: "(width BETWEEN :widthStart AND :widthEnd)",
          ExpressionAttributeValues: {
            ":widthStart": width - (width * PERCENTAGE / 100),
            ":widthEnd": parseFloat(width) + (width * PERCENTAGE / 100)
          }
        })
      }

      if (height){
        paramsCombined.push({
          FilterExpression: "(height BETWEEN :heightStart AND :heightEnd)",
          ExpressionAttributeValues: {
            ":heightStart": parseFloat(height) - (height * PERCENTAGE / 100),
            ":heightEnd": parseFloat(height) + (height * PERCENTAGE / 100)
          }
        })
      }


      if (length) {
        paramsCombined.push({
          FilterExpression: "(leng BETWEEN :lengStart AND :lengEnd)",
          ExpressionAttributeValues: {
            ":lengStart": parseFloat(length) - (length * PERCENTAGE / 100),
            ":lengEnd": parseFloat(length) + (length * PERCENTAGE / 100)
          }
        })
      }

      logger.info("paramsCombined", {
        paramsCombined
      })

      for(var i = 0; i < paramsCombined.length; i++){
        var obj = paramsCombined[i]
        paramResult['ExpressionAttributeValues'] = {...paramResult['ExpressionAttributeValues'], ...obj['ExpressionAttributeValues']}
        paramResult['FilterExpression'] += obj['FilterExpression']
        
        if(i < paramsCombined.length - 1){
          paramResult['FilterExpression'] += " AND "
        }
      }

      logger.info("paramResult", {
        paramResult
      })


      const result = await this.docClient.scan(paramResult).promise()

      return result.Items as BoxItem[]      

    } else {

      const result = await this.docClient.scan({
        TableName: this.boxesTable
      }).promise()

      const items = result.Items
      return items as BoxItem[]
    }

  }


  async createBox(sku: string, newBox: CreateBoxRequest): Promise<BoxItem> {
    const createdAt = new Date().toISOString()
    const attachmentUrl = newBox.attachmentUrl || DEFAULT_URL;

    const newItem = {
      sku,
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

  async updateBox(sku: string, updatedBox: UpdateBoxRequest): Promise<BoxItem> {

    const params = {
      TableName: this.boxesTable,
      Key: {
        sku
      },
      UpdateExpression: "set leng = :leng, width = :width, height = :height, attachmentUrl=:attachmentUrl",
      ExpressionAttributeValues: {
        ":leng": updatedBox.leng,
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

