import { BoxItem } from '../models/BoxItem'
import { BoxesAccess } from '../dataLayer/boxesAccess'
import { CreateBoxRequest } from '../requests/CreateBoxRequest'
import { UpdateBoxRequest } from '../requests/UpdateBoxRequest'


const boxesAccess = new BoxesAccess()


export async function getBoxes(params: object): Promise<BoxItem[]> {
    return boxesAccess.getBoxes(params)
}

export async function createBox(sku:string, newBox: CreateBoxRequest): Promise<BoxItem> {
    return boxesAccess.createBox(sku, newBox)
}

export async function updateBox(sku:string, updatedBox: UpdateBoxRequest){
    return boxesAccess.updateBox(sku, updatedBox)
}

export async function getBox(sku: string): Promise<BoxItem> {
    return boxesAccess.getBox(sku)
}