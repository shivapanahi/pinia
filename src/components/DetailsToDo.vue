<template>
    <div class="todo">
       <h4>{{ todo.title }}</h4>
       <div>
         <i @click="deleteTodo(todo.id)" class="material-icons">delete</i>
        <i @click="toggleActiveTodo(todo.id)" class="material-icons" >checked </i>
       </div>
      
    </div>
</template>

<script>
import { useToDoStore } from '../stores/modules/ToDo'
    export default {
        props:['todo'],
        setup(){
        const toDoStore=  useToDoStore()
        const deleteTodo=(id)=>{
            toDoStore.deleteToDo(id)
        }
        const toggleActiveTodo=(id)=>{
            toDoStore.toggleActiveToDo(id)
        }
        return{
            deleteTodo,
            toggleActiveTodo
        }
        }
    }
</script>