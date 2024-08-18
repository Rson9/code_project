<template>
  <div id="myeditor"></div>
</template>

<script setup>
import E from "wangeditor"
import { onMounted, defineEmits } from 'vue'
const emit = defineEmits(["event"])
onMounted(() => {

  const editor = new E("#myeditor")
  editor.create()
  editor.config.onchange = function (newHtml) {
    console.log("change 之后最新的 html", newHtml);
    emit("event", newHtml)
  };
})


</script>