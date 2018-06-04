<template>
    <div class="container">
        <div id="page">
            <transition name="bounce">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
  0% { transform: scale(0) }
  50% { transform: scale(1.5) }
  100% { transform: scale(1) }
}
@keyframes bounce-out {
  0% { transform: scale(1) }
  50% { transform: scale(1.5) }
  100% { transform: scale(0) }
}
</style>

<script>

    export default{
        data(){
            return{

            }
        }
    }
</script>
