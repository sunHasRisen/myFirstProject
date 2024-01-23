<template>
  <div class="vue-timeLine">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.vue-timeLine {
  display: flex;
  position: relative;
  margin-top: 0;
  padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  min-height: 85px;
  i {
    width: 50px;
    height: 50px;
    display: flex;
    place-items: center;
    place-content: center;
    color: var(--color-text);
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
  }
  &:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  &:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  &:first-of-type:before {
    display: none;
  }

  &:last-of-type:after {
    display: none;
  }
}
</style>
