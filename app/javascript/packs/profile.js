import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const changeAvatar = () => {
  $('.new-avatar').removeClass('hidden')
  $('.old-avatar').addClass('hidden');
}

const avatarFile = () => {
  $('.profile_image').on('click', ()=> {
    $('.avatar-post').trigger('click')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  $('.avatar-post').on('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $('.avatar-btn').trigger('click')
      $('#new-avatar').attr('src', e.target.result);
      changeAvatar()
    }
    reader.readAsDataURL(e.target.files[0]);
  });

  avatarFile()
})

// document.addEventListener('DOMContentLoaded', () => {
//   $('.card').each( function (index, card) {
//     $(card.children).each( function (index, child) {
//       const articleId = $(child).attr('data-article-id')
//       axios.get(`/articles/${articleId}`)
//         .then((response) => {
//           const image = response.data
//           console.log(image.attr('img'))
//         })
//     })
//   })
// })