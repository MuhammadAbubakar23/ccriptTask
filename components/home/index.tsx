'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTodos } from "src/todos";

interface Post {
    title: string;
    description: string;
}


const Posts = () => {

    const { push} = useRouter();
    const [todos, setTodos] = useState<Post[]>([]);

    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            if (response) {
                setTodos(response);
            }
        } catch (err) {
            console.log("Error while fetching todos : ", err)
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <div className="max-w-2xl mx-auto mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Latest Todo</h2>
                    <button
                        onClick={() => push('/new-todo')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        New Post
                    </button>
                </div>
                <div>
                    {todos.map(({ title, description }, index) => (
                        <div key={index} className="bg-white p-4 mb-4 border rounded-md shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-gray-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Posts;
