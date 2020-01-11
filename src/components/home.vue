<template>
  <div>
    <el-button type="info" @click="logout">log out</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
</style>
