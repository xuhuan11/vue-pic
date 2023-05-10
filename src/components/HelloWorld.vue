<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p>
      欢迎加入qq群（qq群号:337087493）进行学习交流探讨
    </p>
    <p>
      请在下面文本框输入详细的描述性文字（prompt）来生成你想要的图片
    </p>
    <input v-model="prompt" placeholder="Type here" :style="{ width: '1200px', height: '20px' }">
    <!--<button @click="question()">生成</button>-->
    <button @click="generate">生成图片</button>
    <p v-if="!answer">Loading...</p>
    <img v-if="!answer"  class="loading" :src="require('@/assets/loading.gif')" alt="loading GIF">
    <img  class="image" :src="image">
  </div>
</template>

<script>
import axios from "axios";

const requests = axios.create({
  baseURL: "/api",
  timeout: 1000000,
});

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      prompt: "Type here",
      answer: 1,
      image: ''
    }
  },

  methods: {
    async getPicture() {
      this.answer = 0
      try {
      /*requests.get('/').then((response) => {
        window.console.log(response)
        this.answer = response.data
      })*/
      requests.get('/image',{
        params: {    //有参数时
        prompt: this.prompt
      }
      }).then((response) => {
        //window.console.log(response)
        window.console.log(response.data.datas)
        this.image = "data:image/png;base64,"+ response.data.datas
        window.console.log(this.image)
        this.answer = 1
      })
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    },
    generate(){  
        window.console.log(this.prompt)
        this.getPicture()
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  font-size: 16px;  /* 设置字体大小 */
  border-radius: 4px; /* 设置圆角半径 */
  padding: 4px; /* 设置内边距 */
  border: 2px solid gray; /* 边框设置 */
}
.container {
  position: relative; /* 设置容器为相对定位 */
}


.image {
  display: block; /* 将 image 设置为块级元素 */
  margin: 0 auto; /* 居中对齐 */
  z-index: 0; /* 将 image 设置在底部 */
}
</style>
