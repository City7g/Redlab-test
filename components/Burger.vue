<template>
  <button class="burger">
    <span></span>
    <span></span>
  </button>
</template>

<style lang="scss">
.burger {
  position: relative;
  width: 44px;
  height: 44px;
  transition: 0.3s background-color ease;
  border-radius: 3px;

  @media (pointer: fine) {
    &:hover {
      background-color: #f1f1f1;
    }
  }

  &:focus-visible {
    outline: 2px solid #404040;
  }
}

.burger span {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background-color: #404040;
  transition: 0.3s all ease;

  &:first-child {
    transform: translate(-50%, calc(-50% - 4px));
  }

  &:last-child {
    transform: translate(-50%, calc(-50% + 4px));
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.burger.active span {
  &:first-child {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:last-child {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
