import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateBoxRequest } from '../../requests/UpdateBoxRequest'
// import { getUserId } from '../utils'
import { updateBox } from '../../businessLogic/boxes'
import { createLogger } from '../../utils/logger'

const logger = createLogger('UpdateBox')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {




    logger.info('Processing UpdateBox event', event)

    const boxId = event.pathParameters.boxId
    const updatedBox: UpdateBoxRequest = JSON.parse(event.body)

    const sku = updatedBox.sku

    if (!sku) {
        logger.info('SKU not found', {
            boxId,
            updateBox
        })

        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'SKU MISSING OR INVALID'
            })
        }
    }


    logger.info('Box Info Fetched Successfully', {
        boxId,
        updateBox
    })

    const result = await updateBox(boxId, sku, updatedBox)


    logger.info('Box Updated Successfully', {
        boxId
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
