import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createBox } from '../../businessLogic/boxes'
import { CreateBoxRequest } from '../../requests/CreateBoxRequest'
import { createLogger } from '../../utils/logger'
const logger = createLogger('createBox')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newBox: CreateBoxRequest = JSON.parse(event.body)

    logger.info('creating a new Box Item.', event)

    const sku = newBox.sku
    const result = await createBox(sku, newBox)

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            item: result
        })
    }
}


