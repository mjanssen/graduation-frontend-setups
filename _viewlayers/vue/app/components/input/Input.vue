<template>
  <input type="text" v-bind:class="[style.input]" value="This input has some styling" />
</template>

<script>
  import style from 'style/input/input';

  export default {
    data() {
        return {
          style: style,
        };
      },
  };
</script>
