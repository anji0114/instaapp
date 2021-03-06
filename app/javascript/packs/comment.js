import $ from 'jquery'
import axios from 'modules/axios'

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('.comments').data()
  const articleId = dataset.articleId

  // commentをajaxで表示
  axios.get(`/api/articles/${articleId}/comments`)
    .then( (res) => {
      const comments = res.data
      comments.forEach((comment)=> {
        commentContents(comment)
      })
    })

    // commentをajaxでpost
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
            commentContents(comment)
          )
          $('#comment_content').val('')
        })
        .catch((e)=> {
          window.alert(e)
        })
      }
    })

    // commentの表示内容
    const commentContents = (comment)=> {
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
    }

    // commentのフォームの表示
    $('.comments_post').on('click', () => {
      $('.comments_post').addClass('hidden')
      $('.comments_text_area').removeClass('hidden')
    })
})