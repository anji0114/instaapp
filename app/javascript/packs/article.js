
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

    // 画像のスライド
    const slide = () => {
      let count = 0
      const images = $(val).find('.pictures')
      const imageNum = images.length
      const arrow = () => {
        if (count === 0) {
          $(val).find('.arrow_left').addClass('hidden')
        } else {
          $(val).find('.arrow_left').removeClass('hidden')
        }
        if (count === imageNum - 1) {
          $(val).find('.arrow_right').addClass('hidden')
        } else {
          $(val).find('.arrow_right').removeClass('hidden')
        }
      }

      $(images[0]).removeClass('hidden')
      $(val).find('.arrow_right').on('click', () => {
        count += 1
        $(images[count]).removeClass('hidden')
        $(images[count - 1]).addClass('hidden')
        arrow()
      })
      $(val).find('.arrow_left').on('click', () => {
        count -= 1
        $(images[count]).removeClass('hidden')
        $(images[count + 1]).addClass('hidden')
        arrow()
      })
      arrow()
    }
    slide()
  })
})
