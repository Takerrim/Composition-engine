<template>
  <div>    
    <div class="project-container" ref="root">
    </div>
    <button @click="dd">Create image</button>
  </div>
</template>

<script lang="ts">
import { key } from '@/store'
import { projectModule } from '@/store/modules/project'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { createNamespacedHelpers, useStore } from 'vuex'
import initProject from '@/utils/initProject'
import makeImage from '@/utils/makeImage'

const { mapActions, mapGetters } = createNamespacedHelpers('project')

export default defineComponent({
  setup (props) {
    const store = useStore(key)
    const config = computed(() => store.state.project.config)
    const parentLayer = computed(() => store.state.project.parentLayer)

    return {
      ...mapActions(['fetchProjects']),
      config,
      parentLayer,
    }
  },
  async created() {
    await this.fetchProjects()
    initProject(this.config)
  },
  methods: {
    dd() {
      console.log(this.parentLayer)
      makeImage(this.parentLayer!)
    }
  }
})
</script>

<style>
.project-container {
  position: relative
}

.textarea {
  background: transparent;
  border: none;
  outline: none;
  text-align: left;
}
</style>
