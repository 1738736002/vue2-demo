<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="stylus">
//@import "assets/dncss/common.styl"
#app
  background #f5f5f5
:root {
  --page-background: unset; /* Pages background */
  --page-box-shadow: unset; /* Pages box-shadow */
  --page-border: unset; /* Pages border */
  --page-border-radius: unset; /* Pages border-radius */
}
</style>
