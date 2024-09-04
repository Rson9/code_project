<template>
  <div id="myeditor"></div>
</template>

<script setup>
import E from "wangeditor"
import { onMounted, defineEmits, defineProps, watch, ref } from 'vue'
const emit = defineEmits(["event"])

const props = defineProps({
  content: String
})
onMounted(() => {

  const editor = new E("#myeditor")
  editor.create()
  watch(() => props.content, (newContent) => {
    if (newContent) {
      editor.txt.html(newContent);
    }
  });
  editor.config.onchange = function (newHtml) {
    // console.log("change 之后最新的 html", newHtml);
    emit("event", newHtml)
  };
})


</script>