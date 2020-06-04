import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { BoxItem } from '../models/BoxItem'
import { CreateBoxRequest } from '../requests/CreateBoxRequest'
import { UpdateBoxRequest } from '../requests/UpdateBoxRequest'
import { createLogger } from '../utils/logger'

const logger = createLogger('BoxesAccess')
const XAWS = AWSXRay.captureAWS(AWS)

const DEFAULT_URL = 'https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/no-image.jpg'
const PERCENTAGE = 10
function createDynamoDBClient() {
  return new XAWS.DynamoDB.DocumentClient()
}

export class BoxesAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly boxesTable = process.env.BOXES_TABLE
  ) {
  }

  async getBoxes(params: object): Promise<BoxItem[]> {

    if (params && (params['width'] || params['height'] || params['length'] || params['leng'])) {
      var width = params['width']
      var height = params['height']
      var length = params['length'] || params['leng']

      var paramResult = {
        TableName: this.boxesTable,
        KeyConditionExpression: "category = :cat",
        ExpressionAttributeValues: {
          ":cat": "1"
        },
        FilterExpression: ''
      }

      var paramsCombined = []

      if (width) {
        paramsCombined.push(generateParam('width', width))
      }

      if (height) {
        paramsCombined.push(generateParam('height', height))
      }

      if (length) {
        paramsCombined.push(generateParam('leng', length))
      }

      logger.info("paramsCombined", {
        paramsCombined
      })

      for (var i = 0; i < paramsCombined.length; i++) {
        var obj = paramsCombined[i]
        paramResult['ExpressionAttributeValues'] = { ...paramResult['ExpressionAttributeValues'], ...obj['ExpressionAttributeValues'] }
        paramResult['FilterExpression'] += obj['FilterExpression']

        if (i < paramsCombined.length - 1) {
          paramResult['FilterExpression'] += " AND "
        }
      }

      logger.info("paramResult", {
        paramResult
      })

      const result = await this.docClient.query(paramResult).promise()

      return result.Items as BoxItem[]

    } else {

      logger.info("Fetching All category 1")

      // fetch all category "1"
      const result = await this.docClient.query({
        TableName: this.boxesTable,
        KeyConditionExpression: "category = :cat",
        ExpressionAttributeValues: {
          ":cat": "1"
        }
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
        sku,
        category: "1"
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


  async getBox(sku: string): Promise<BoxItem> {

    const params = {
      TableName: this.boxesTable,
      KeyConditionExpression: 'sku = :sku AND category = :cat',
      ExpressionAttributeValues: {
        ":sku": sku,
        ":cat": "1"
      }
    };

    const result = await this.docClient.query(params).promise()

    return result.Items[0] as BoxItem
  }

}

function generateParam(paramStr: string, paramValue: string) {

  const start = `:${paramStr}Start`
  const end = `:${paramStr}End`

  var params = {
    FilterExpression: `(${paramStr} BETWEEN ${start} AND ${end})`,
    ExpressionAttributeValues: {}
  }

  params['ExpressionAttributeValues'][start] = parseFloat(paramValue) - (parseFloat(paramValue) * PERCENTAGE / 100)
  params['ExpressionAttributeValues'][end] = parseFloat(paramValue) + (parseFloat(paramValue) * PERCENTAGE / 100)

  return params

}