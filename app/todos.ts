'use server'

import  { connectToMongoose } from "../db";
import  { todosCollection } from "../models/Todo";

type IFormData = {
    title: string,
    description: string,
}

export async function createTodo(formData: IFormData) {
    try {
        await connectToMongoose();
        await todosCollection.create(formData);
        console.log('Todo created:');
    } catch (error) {
        console.error('Error creating todo:', error);
    }
}

export async function getTodos() {
    try {
        await connectToMongoose();
        const data = await todosCollection.find();
        return data;
    } catch (error) {
        console.error('Error creating todo:', error);
    }
}