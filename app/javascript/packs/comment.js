import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()



document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('.comments').data()
  const articleId = dataset.articleId
  axios.get(`/api/articles/${articleId}/comments`)
    .then( (res) => {
      const comments = res.data
      comments.forEach((comment)=> {
        $('.comments_container').append(
        `<div class='comment'>
          <div class='user-avatar'>
            <image src= '${comment.avatar_image}'>
          </div>
          <div class='comment_info'>
            <p>${comment.account_name}</p>
            <p class='comment_content'>${comment.content}</p>
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
          $('.comments_container').append(
            `<div class='comment'>
              <div class='user-avatar'>
                <image src= '${comment.avatar_image}'>
              </div>
              <div class='comment_info'>
                <p>${comment.account_name}</p>
                <div class='comment_content'>
                  <p>${comment.content}</p>
                </div>
              </div>
            </div>`
          )
          $('#comment_content').val('')
        })

        .catch((e)=> {
          window.alert(e)
        })
      }
    })

    $('.comments_post').on('click', () => {
      $('.comments_post').addClass('hidden')
      $('.comments_text_area').removeClass('hidden')
    })
})