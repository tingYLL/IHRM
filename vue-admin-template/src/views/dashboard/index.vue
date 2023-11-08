<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon iconClass="dashboard"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SvgIcon from '@/components/SvgIcon'
export default { 
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
