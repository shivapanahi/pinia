<template>
  <main>
    <header>
      <h1>pinina in vue3</h1>
      <p>{{ toDOStore.name }}</p>
    </header>
    <div>
      <AddToDo></AddToDo>
    </div>
    <nav>
      <button @click="filter = 'all'">show all</button>
      <button @click="filter = 'actives'">show actives</button>
    </nav>
    <div v-if="loading">todos is loading ....</div>
    <div v-if="filter == 'all'">
      <p>todos </p>
      <p>totalCount:{{ totalCount }} </p>
      <div v-for="todo in todos" :key="todo.id">
        <DetailsToDo :todo="todo" />
      </div>
    </div>
    <div v-if="filter == 'actives'">
      <p>active todos</p>
      <p>activeCount {{ activesCount }}</p>
      <div v-for="active in actives" :key="active.id">
        <DetailsToDo :todo="active" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useToDoStore } from "./stores/modules/ToDo"
import DetailsToDo from './components/DetailsToDo.vue'
import AddToDo from './components/AddToDo.vue'
import { storeToRefs } from 'pinia'
export default {
  components: { DetailsToDo, AddToDo },
  setup() {
    const filter = ref('all')
    const toDOStore = useToDoStore()
    const { activesCount, actives, totalCount, todos, loading } = storeToRefs(toDOStore)
    toDOStore.getTodos()
    return {
      toDOStore,
      todos,
      actives,
      filter,
      activesCount,
      totalCount,
      loading
    }
  }
}
</script>


