<template lang="pug">
#global
  .close_button(@click="$emit('closeGlobalNav')")
    .close_icon
  .logo Scarlet Maps
  .message
    p Welcome to Scarlet Maps! This is a open source maps service created by Rutgers students to help fellow students navigate to classes, buildings and events around the New Brunswick and Newark Campuses.
    p This site is currently in development, but provides the following features.
    ul
      li route scheules
      li stop schedules

  a(href="https://github.com/adam-piziak/scarletbus-web" target="_blank").link.github
    .title
      .content Source Code
      .icon
    .body This site is open source! Visit our Github page to fork, contribute or view this site's source code. All commits to this repository are automatically deployed.
  a(href="https://github.com/adam-piziak/scarletbus" target="_blank").link.github
    .title
      .content ScarletMaps API
      .icon
    .body Visit the API that powers this site! The ScarletMaps API is built on top of the official Rutgers API and provides the features shown on this site.
</template>

<style lang="sass" scoped>

.logo
  display: inline-block
  position: relative
  color: black
  font-weight: light
  font-size: 1.6rem
  font-family: courier
  letter-spacing: 4px
  margin-top: 5px
  color: #555
  padding-bottom: 2px

.background-image
  display: inline-block
  vertical-align: baseline
  height: 30px
  width: 30px
  z-index: 0
  margin-bottom: -7px
  background:
    image: url(~icons/logo.svg)
    repeat: no-repeat

.message

  &:hover
    cursor: text

  p
    margin-top: 20px
    opacity: 0.7
    width: 360px
    line-height: 26px
    text-indent: 30px
    user-select: all

  ul
    margin: 10px 30px
    opacity: 0.7
    margin-bottom: 40px
    li
      line-height: 28px


a.link
  display: block
  border: 1px solid #EEE
  padding: 12px 16px
  border-radius: 12px
  background: white
  transition: .15s
  text-decoration: none
  margin-bottom: 20px

  .title
    color: #4168dd
    font-weight: 500

    .content
      display: inline-block
      text-decoration: none

    .icon
      display: inline-block
      background:
        image: url(~icons/open_new.svg)
        size: 80%
        repeat: no-repeat
        position: center
      height: 20px
      width: 20px
      margin-left: 6px
      margin-bottom: -4px

  .body
    margin-top: 8px
    color: #444
    line-height: 23px

  &:hover
    cursor: pointer
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15)
    transform: translateY(-2px)

#global
  width: 100%
  height: 100vh
  overflow: auto
  position: absolute
  top: 0
  left: 0
  background: white
  z-index: 1000
  padding: 24px
  user-select: none
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4)


.close_button
  position: absolute
  right: 20px
  top: 14px
  opacity: 0.6
  border-radius: 10px

  &:hover
    cursor: pointer
    background: #F5F5F5
    transform: scale(1.08)

  &:active
    transform: scale(1.2)

  .close_icon
    display: inline-block
    height: 40px
    width: 40px
    background:
      color: transparent
      image: url('~icons/close.svg')
      position: center 100%
      repeat: no-repeat
      size: 90%
</style>
