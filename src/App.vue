<template>
  <div class="app-container">
    <Sidebar :isCollapsed="isSidebarCollapsed" />
    <div class="main-content">
      <Header @toggleSidebar="toggleSidebar" :isSidebarCollapsed="isSidebarCollapsed"/>
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 0;
  padding-left: 0;
  width: 100%;
  overflow: hidden;
}
</style>
