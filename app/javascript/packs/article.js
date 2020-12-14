import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('DOMContentLoaded', () => {
  $('.article').each( (i, val) => {
    // const articleId = ($(val).attr('data-article-id'))
    let dataset = $(val).data()
    let articleId = dataset.articleId
    axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      console.log(response)
      const hasLiked = response.data.hasLiked
      if (hasLiked){
        $(val).find('.active-heart').removeClass('hidden')
      } else {
        $(val).find('.inactive-heart').removeClass('hidden')
      }
    })
  })
})