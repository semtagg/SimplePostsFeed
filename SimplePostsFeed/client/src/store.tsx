import { proxy } from "valtio";

// Standard interface and functions
export interface Post {
    user_id: number;
    title: string;
    body: boolean;
}

const updateTodo = (todos: Post[], id: number, text: string): Post[] =>
    todos.map((todo) => ({
        ...todo,
        title: todo.user_id === id ? text : todo.title,
    }));

const toggleTodo = (todos: Post[], id: number): Post[] =>
    todos.map((todo) => ({
        ...todo,
        body: todo.user_id === id ? !todo.body : todo.body,
    }));

const removeTodo = (todos: Post[], id: number): Post[] =>
    todos.filter((todo) => todo.user_id !== id);

const addTodo = (todos: Post[], text: string): Post[] => [
    ...todos,
    {
        user_id: Math.max(0, Math.max(...todos.map(({ user_id }) => user_id))) + 1,
        title: text,
        body: false,
    },
];

// Valtio implementation
interface Store {
    posts: Post[];
    newTodo: string;
    addTodo: () => void;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
}

const store = proxy<Store>({
    posts: [],
    newTodo: "",
    toggleTodo: (id: number) => {
        store.posts = toggleTodo(store.posts, id);
    },
    updateTodo: (id: number, text: string) => {
        store.posts = updateTodo(store.posts, id, text);
    },
    removeTodo: (id: number) => {
        store.posts = removeTodo(store.posts, id);
    },
    addTodo: () => {
        store.posts = addTodo(store.posts, store.newTodo);
        store.newTodo = "";
    },
});

export default store;