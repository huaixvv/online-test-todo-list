<template>
  <div class="flex items-center mb-2">
    <input
        :disabled="todo.completed"
        :checked="todo.completed"
        type="checkbox"
        @change="toggleTodo"
        class="mr-2"
    />
    <span :class="{ 'line-through': todo.completed }" class="flex-1">
      {{ todo.description }}
    </span>
    <button @click="removeTodo" class="bg-red-500 text-white p-1 ml-2">Delete</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['toggle', 'remove']);

const toggleTodo = () => {
  emit('toggle', props.todo.id);
};

const removeTodo = () => {
  emit('remove', props.todo.id);
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
