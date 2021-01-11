import $ from 'jquery'
import axios from 'modules/axios'

document.addEventListener('DOMContentLoaded', () => {
  $('.article').each( (i, val) => {
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

      const pageNum = () => {
        if (imageNum > 1) {
          $(val).find('.page').html(
            `<div class = 'page_num'>${count + 1}/${imageNum}</div>`
          )
        }
      }

      $(images[0]).removeClass('hidden')
      $(val).find('.arrow_right').on('click', () => {
        count += 1
        $(images[count]).removeClass('hidden')
        $(images[count - 1]).addClass('hidden')
        arrow()
        pageNum()
      })
      $(val).find('.arrow_left').on('click', () => {
        count -= 1
        $(images[count]).removeClass('hidden')
        $(images[count + 1]).addClass('hidden')
        arrow()
        pageNum()
      })
      arrow()
      pageNum()
    }
    slide()
  })
})