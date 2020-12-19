import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()



document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('.comments').data()
  const articleId = dataset.articleId
  axios.get(`/api/articles/${articleId}/comments`)
    .then( (response) => {
      const comments = response.data
      comments.forEach((comment)=> {
        $('.comments-container').append(
          `<div class=comment'>
            <div class='user_avatar'>
              <image src= '${comment.avatar_image}'>
            </div>
            <div class='comment_content'>
              <p>${comment.account_name}</p>
              <p>${comment.content}</p>
            </div>
          </div>`
        )
      })
    })

    $('.comment-btn').on('click', () => {
      const content = $('#comment_content').val()
      if (!content) {
        window.alert('コメントを入力してください')
      } else {
        axios.post(`/api/articles/${articleId}/comments`, {
          comment: {content: content}
        })
        .then((res) => {
          const comment = res.data
          $('.comments-container').append(
            `<div><p>${comment.content} ${comment.user_id}</p></div>`
          )
          $('#comment_content').val('')
        })
      }
    })

    $('.comments_post').on('click', () => {
      // $('.comments_post').addClass('hidden')
      $('.comments_text_area').toggleClass('hidden')
    })
})