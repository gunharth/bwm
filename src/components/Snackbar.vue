<template>
  <v-snackbar
        v-model="show"
        :multi-line="true"
        :timeout="3000"
        :top="true"
        :vertical="true"
      >
    {{message}}
    <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      message: 'sdlfkjsdfsdf'
    }
  }
}
</script>
