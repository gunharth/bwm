<template>
  <v-snackbar
        v-model="show"
        :multi-line="true"
        :timeout="3000"
        :top="true"
        :vertical="true"
        color="error"
      >
    {{message}}
    <v-btn flat @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>

export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  created: function () {
    this.$store.watch(state => state.snack, () => {
      const msg = this.$store.state.snack
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snack
        this.$store.commit('setSnack', '')
      }
    })
  }
}
</script>
