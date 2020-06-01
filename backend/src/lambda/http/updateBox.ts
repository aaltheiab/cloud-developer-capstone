import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateBoxRequest } from '../../requests/UpdateBoxRequest'
import { updateBox } from '../../businessLogic/boxes'
import { createLogger } from '../../utils/logger'

const logger = createLogger('UpdateBox')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('Processing UpdateBox event', event)

    const sku = event.pathParameters.sku
    const updatedBox: UpdateBoxRequest = JSON.parse(event.body)


    logger.info('Box Info Fetched Successfully', {
        sku,
        updateBox
    })

    const result = await updateBox(sku, updatedBox)


    logger.info('Box Updated Successfully', {
        sku
    })

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            item: result
        })
    }

}
