<script setup lang="ts">
const rtCfg= useRuntimeConfig();
console.log(rtCfg.public.uri)
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <a href="/api/show">index</a><br>
    <a href="/api/find">find</a><br>

  </div>
</template>
