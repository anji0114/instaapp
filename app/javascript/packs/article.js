
import $ from 'jquery'
import axios from 'modules/axios'

document.addEventListener('DOMContentLoaded', () => {
  $('.article').each( (i, val) => {

    const handleHeartDisplay = (hasLiked) => {
      if (hasLiked){
        $(val).find('.active-heart').removeClass('hidden')
      } else {
        $(val).find('.inactive-heart').removeClass('hidden')
      }
    }

    let dataset = $(val).data()
    let articleId = dataset.articleId

    // jqueryでいいねを表示
    axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      console.log(response)
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

    // jqueryでいいね取得
    $(val).find('.inactive-heart').on('click', () => {
      axios.post(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data.status === 'ok') {
            $(val).find('.active-heart').removeClass('hidden')
            $(val).find('.inactive-heart').addClass('hidden')
          }
        })
        .catch((e) => {
          window.alert(e)
        })
    })

    // jqueryでいいね解除
    $(val).find('.active-heart').on('click', () => {
      axios.delete(`/articles/${articleId}/like`)
        .then((response) => {
          if (response.data.status === 'ok') {
            $(val).find('.inactive-heart').removeClass('hidden')
            $(val).find('.active-heart').addClass('hidden')
          }
        })
        .catch((e) => {
          window.alert(e)
        })
    })
  })
})
