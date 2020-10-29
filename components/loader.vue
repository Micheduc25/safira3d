<template>
  <div class="nashma-loader">
    <img src="/images/icons/nashma-icon.png" alt="" />
    <div class="dots">
      <div class="font-bold text-4xl tracking-wide mr-2">Loading</div>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nashma-loader {
  width: max-content;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin-right: 7px;
    animation: rotatecircle 2s infinite ease-in-out;
  }

  .dots {
    display: flex;
    align-items: center;
    span {
      width: 10px;
      height: 10px;
      display: block;
      border-radius: 50%;
      background-color: #203864;

      animation-timing-function: ease-in-out;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;

      &:not(:last-child) {
        margin-right: 5px;
      }

      &:nth-child(2) {
        animation-name: animatedots1;
      }
      &:nth-child(3) {
        animation-name: animatedots2;
      }
      &:nth-child(4) {
        animation-name: animatedots3;
      }
    }
  }
}

@keyframes animatedots1 {
  0% {
    transform: translateY(0) scale(1);
  }
  16.6665% {
    transform: translateY(-5px) scale(1.2);
  }

  33.3333%,
  100% {
    transform: translateY(0) scale(1);
  }
}
@keyframes animatedots2 {
  0%,
  33.333% {
    transform: translateY(0) scale(1);
  }
  49.9995% {
    transform: translateY(-5px) scale(1.2);
  }

  66.6666%,
  100% {
    transform: translateY(0) scale(1);
  }
}
@keyframes animatedots3 {
  0%,
  66.6666% {
    transform: translateY(0) scale(1);
  }
  83.3325% {
    transform: translateY(-5px) scale(1.2);
  }

  100% {
    transform: translateY(0) scale(1);
  }
}

@keyframes rotatecircle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
