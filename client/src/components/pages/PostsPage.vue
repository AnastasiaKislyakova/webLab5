/* eslint-disable */
<template lang="pug">
  .container
    .row
      .col-xs-10
        h1
          | Documents
        h3
          | This file will list all the documents
        a.btn.btn-block.btn-primary(href="/posts/new") add new document
        section.panel.panel-success(v-if="posts.length")
          .panel-heading
            | list of documents
          table.table.table-striped
            tr
              th Name
              th Content
              th Action
            tr( v-for="(post, index) in posts", :key="post.name" )
              td {{ post.name.substring(0,80) }}
              td {{ post.content.substring(0,80) }}
              td
                button.btn.btn1.btn-sm( type="button")
                  router-link.link( :to="{ name: 'EditPost', params: { id: post._id } }" )
                    | edit document
                button.btn.btn2.btn-sm( type="button", @click="removePost(post._id)" )
                  | delete

        section.panel.panel-danger(v-if="posts.length<1")
          p
            | There are no documents ... Lets add one now!
          div
            router-link( :to="{ name: 'NewPost' }" )
              | add new document
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'PostsPage',
  data () {
    return {
      posts: []
    }
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
      console.log(this.posts)
    },
    async removePost (value) {
      await PostsService.deletePost(value)
      this.getPosts()
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
