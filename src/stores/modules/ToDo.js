import { defineStore } from "pinia";

export const useToDoStore = defineStore('todostore', {
    state: () => ({
        todos: [],
        name: 'shiva',
        loading: false
    }),
    getters: {
        actives() {
            return this.todos.filter((item) => item.active)
        },
        activesCount() {
            return this.todos.reduce((p, c) => {
                return c.active ? p + 1 : p
            }, 0)
        },
        totalCount(state) {
            return state.todos.length
        }
    },
    actions: {
        async getTodos() {
            this.loading = true
            const res = await fetch('http://localhost:3000/todos')
            const data = await res.json()
            this.todos = data
            this.loading = false
        },
        async addToDo(todo) {
            this.todos.push(todo)
            await fetch('http://localhost:3000/todos', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'aplication/json' }
            })
        },
        async deleteToDo(id) {
            this.todos = this.todos.filter((todo) => {
                return todo.id != id
            })
            const res = await fetch('http://localhost:3000/todos/'+ id, {
                method: 'DELETE',
            })
        },
        async toggleActiveToDo(id) {
            let todo = this.todos.find(todo => todo.id === id)
            todo.active = !(todo.active)
            const res = await fetch('http://localhost:3000/todos/'+id, {
                method: 'PATCH',
                body: JSON.stringify({isActive:todo.active}),
                headers: { 'Content-Type': 'aplication/json' }
            })
        }
    }
})
