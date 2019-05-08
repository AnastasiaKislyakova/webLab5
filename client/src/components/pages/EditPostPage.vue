<template lang="pug">
 .container.col-11
  .row
    .container.col-6
      h1
        | Edit document
      form
        .form-group
          input.form-control( type="text", name="name", id="name", v-model.trim="post.name" )
        .form-group
          textarea.form-control( type="text", rows="10", name="content", id="content", v-model.trim="post.content" )
        .form-group
          button.btn.btn-block.btn-primary( type="submit", name="editPost", id="editPost", @click="editPost()" )
            | edit document
        section
          button.btn.btn-success.btn-block( type="button", @click="goBack()" )
            | go to documents page
    .container.col-6
      h1
        |Preview
      div(class="info block border" v-html="previewText" )
</template>

<script>
import PostsService from '@/services/PostsService'
let marked = require('marked')
export default {
  name: 'EditPostPage',
  data () {
    return {
      post: {
        name: '',
        content: ''
      }
    }
  },
  computed: {
    previewText () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      })
      return marked(this.post.content)
    }
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({ id: this.$route.params.id })
      this.post.name = response.data.name
      this.post.content = response.data.content
    },
    async editPost () {
      if (this.post.name !== '' && this.post.content !== '') {
        await PostsService.updatePost({
          id: this.$route.params.id,
          name: this.post.name,
          content: this.post.content
        })
        // this.$router.push({ name: 'Posts' })
      }
    },
    goBack () {
      this.$router.push({ name: 'Posts' })
    }
  },
  mounted () {
    this.getPost()
  }
}
</script>
