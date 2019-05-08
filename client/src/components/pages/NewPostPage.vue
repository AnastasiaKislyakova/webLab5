<template lang="pug">
  .container.col-11
    .row
      .col-6
        h1
          | Add New Document
        form
          .form-group
            input.form-control( type="text", name="name", id="name", placeholder="Name", v-model.trim="post.name" )
          .form-group
            textarea.form-control( type="text", rows="10", name="content", id="content", v-model.trim="post.content" )
          .form-group
            button.btn.btn-block.btn-primary( type="button", name="addPost", id="addPost", @click="addPost()" )
              | add new document
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
  name: 'NewPostPage',
  data () {
    return {
      post: {
        name: '',
        content: '#### hello world'
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
    async addPost () {
      if (this.post.name !== '' && this.post.content !== '') {
        await PostsService.addNewPost({
          name: this.post.name,
          content: this.post.content
        })
        this.$router.push({ name: 'Posts' })
      } else {
        alert('Empty fields!')
      }
    },
    goBack () {
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
