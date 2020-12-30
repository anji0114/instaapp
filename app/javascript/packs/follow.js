import $ from 'jquery'
import axios from 'modules/axios'

document.addEventListener('DOMContentLoaded', () => {
  const dataset = $('.profile').data()
  const accountId = dataset.accountId
  const userId = dataset.userId
  axios.get(`/accounts/${accountId}/follows/${userId}`)
    .then((response) => {
      const hasFollowed = response.data.hasFollowed
      if (hasFollowed){
        $('.unfollow-btn').removeClass('hidden')
      } else {
        $('.follow-btn').removeClass('hidden')
      }
    })

  $('.follow-btn').on('click', () =>{
    axios.post(`/accounts/${accountId}/follows`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.follow-btn').addClass('hidden')
          $('.unfollow-btn').removeClass('hidden')
          $('.followers-count').html(response.data.followersCount)
        }
      })
      .catch((e) => {
        window.alert(e)
      })
  })

  $('.unfollow-btn').on('click', () =>{
    axios.post(`/accounts/${accountId}/unfollows`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.follow-btn').removeClass('hidden')
          $('.unfollow-btn').addClass('hidden')
          $('.followers-count').html(response.data.followersCount)
        }
      })
  })
})