<template>
  <div class="vue-app">
    <h1>{{ message }}</h1>
    <p>You can edit this file at {{ path }}</p>
    <CustomInput />
    <paragraph />
  </div>
</template>

<script>
  import CustomInput from 'components/input/Input.vue';
  import Paragraph from 'components/paragraph/Paragraph.vue';

  export default {
    data() {
      return {
        message: 'hey there!',
        path: 'app/components/app/App.vue',
      };
    },
    computed: {
    },
    components: {
      CustomInput,
      Paragraph,
    },
  };
</script>
