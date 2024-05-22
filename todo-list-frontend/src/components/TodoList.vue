<template>
  <div>
    <form @submit.prevent="fetchAdd" class="mb-4">
      <input
          v-model="newTodo"
          type="text"
          placeholder="Add a new todo"
          class="border p-2 mr-2"
      />
      <button type="submit" class="bg-blue-500 text-white p-2">Add</button>
    </form>
    <div>
      <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @remove="removeTodo"
      />
    </div>
  </div>
</template>

<script setup>

import { getTodos, addTodo, deleteTodo, complete } from '../api/todo.js';
import { ElMessage } from 'element-plus'
import {onMounted, ref} from "vue";
import TodoItem from './TodoItem.vue';

const newTodo = ref('');
const todos = ref([]);


/**
 * 获取任务列表
 * @returns {Promise<void>}
 */
const fetchTodos = async () => {
  try {
    const data = await getTodos();
    todos.value = data.data
  } catch (e) {
    alert(e.message)
  }
}

/**
 * 添加任务
 * @returns {Promise<void>}
 */
const fetchAdd = async () => {
  if (newTodo.value.trim()) {
    const todo = {
      description: newTodo.value.trim(),
    }
    try {
      const res = await addTodo(todo);
      ElMessage.success('add success')
      await fetchTodos()
    } catch (e) {
      ElMessage.error(e.message)
    }
  }
};

/**
 * 勾选完成任务
 * @param id
 */
const toggleTodo = async (id) => {
  try {
    const res = await complete(id);
    await fetchTodos()
    ElMessage.success('complete success')
  } catch (e) {
    ElMessage.error(e.message)
  }

};

/**
 *  删除任务
 * @param id
 */
const removeTodo = async (id) => {
  try {
    const res = await deleteTodo(id);
    await fetchTodos()
    ElMessage.success('remove success')
  } catch (e) {
    ElMessage.error(e.message)
  }
};

onMounted(fetchTodos)

</script>

<style scoped>
</style>
