<template>
  <div class="project-container" ref="root">
  </div>
</template>

<script lang="ts">
import { key } from '@/store'
import { projectModule } from '@/store/modules/project'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { createNamespacedHelpers, useStore } from 'vuex'
import initProject from '@/utils/initProject'

const { mapActions, mapGetters } = createNamespacedHelpers('project')

export default defineComponent({
  setup (props) {
    const store = useStore(key)
    const config = computed(() => store.state.project.config)
    const root = ref(null)

    onMounted(() => {

    })

    return {
      ...mapActions(['fetchProjects']),
      config,
    }
  },
  async created() {
    await this.fetchProjects()
    initProject(this.config)
  }
})
</script>

<style>
.project-container {
  position: relative
}
</style>
