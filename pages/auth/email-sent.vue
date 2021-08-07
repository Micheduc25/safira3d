<template>
  <div class="page-content flex h-screen items-center justify-center">
    <vs-card>
      <template #text>
        <div>
          <span class="font-bold text-5xl">
            Nous avons envoyé un mail à {{ $route.query.email }}</span
          >
        </div>

        <div class="flex justify-center mt-4">
          <vs-button size="large" border @click="$router.push('/home')"
            >OK</vs-button
          >
        </div>
      </template>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: 'EmailSent',
};
</script>

<style lang="scss" scoped></style>
