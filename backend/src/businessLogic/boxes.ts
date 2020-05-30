// models 
import { BoxItem } from '../models/BoxItem'
// import { BoxUpdate } from '../models/BoxUpdate'
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


// export async function getTodos(userId:string): Promise<TodoItem[]> {
//     return todoAccess.getTodos(userId)
// }

// export async function createTodo(userId:string, todoId:string, newTodo: CreateTodoRequest): Promise<TodoItem> {
//     return todoAccess.createTodo(userId, todoId, newTodo)
// }

// export async function updateTodo(userId:string, todoId:string, updatedTodo: TodoUpdate): Promise<TodoUpdate> {
//     return todoAccess.updateTodo(userId, todoId, updatedTodo)
// }

// export async function deleteTodo(userId:string, todoId:string): Promise<void> {
//     await todoAccess.deleteTodo(userId, todoId)
// }

// export async function updateTodoImageUrl(userId:string, todoId:string, imageUrl:string): Promise<void> {
//     await todoAccess.updateTodoImageUrl(userId, todoId, imageUrl)
// }