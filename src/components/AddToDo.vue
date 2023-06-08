<template>
   <form @submit.prevent="handleSubmit">
     <input type="text" v-model="newTodo" placeholder="add todo">
     <button class="add-todo">add todo</button>
   </form>
</template>

<script>
import { ref } from 'vue'
import { useToDoStore } from '../stores/modules/ToDo'
    export default {
        setup(){
            const toDoStore=useToDoStore()
            const newTodo=ref('')
            const handleSubmit=()=>{
                toDoStore.addToDo({
                    title:newTodo.value,
                    active:false,
                    id:Math.floor(Math.random()*10000)
                })
                newTodo.value=''
            }
            return{
                handleSubmit,
                newTodo
            }
        }
    }
</script>