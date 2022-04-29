// ==UserScript==
// @name         Vagoo ホットキー
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://vagoo.19system.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"
  let inputKey
  let useItemFlag
  let submitBtnFlag

  document.addEventListener("keydown", (event) => {
    // submitボタン ホットキー
    // 「Shift+S」で3秒間、submitボタンのホットキーを受け付ける
    if (event.isComposing || (event.shiftKey && event.code === "KeyS")) {
      submitBtnFlag = true
      setTimeout(() => {
        submitBtnFlag = false
      }, 3000)
    }
    // 数字キー番目のsubmitボタンをクリックする
    if (event.isComposing || (submitBtnFlag && event.code.includes("Digit"))) {
      console.log("flag True!!")
      const submitBtns = document.querySelectorAll("input[type='submit']")
      inputKey = event.code
      const inputNum = parseInt(inputKey.replace(/[^0-9]/g, ""), 10)
      const targetNum = inputNum - 1
      const targetBtn = submitBtns[targetNum]
      targetBtn.click()
    }
    // 索敵 ホットキー
    if (event.isComposing || (!submitBtnFlag && event.code === "KeyS")) {
      const sakutekiBtn = document.querySelector(
        'input[value="    　  索 敵 　     "]'
      )
      sakutekiBtn.click()
    }
    // ゾーンに戻る ホットキー
    if (event.isComposing || event.code === "KeyB") {
      const zoneBackBtn = document.querySelector(
        'input[value=" ゾーンに戻る "]'
      )
      zoneBackBtn.click()
    }
    // ゾーンを移動する ホットキー
    // Mキーで3秒間アイテム使用のホットキーを受け付ける
    if (event.isComposing || event.code === "KeyM") {
      inputKey = event.code
      setTimeout(() => {
        inputKey = ""
      }, 3000)
    }
    // 数字キー番目のゾーンに移動する ホットキー
    if (
      event.isComposing ||
      (inputKey === "KeyM" && event.code.includes("Digit"))
    ) {
      inputKey = event.code
      const inputNum = parseInt(inputKey.replace(/[^0-9]/g, ""), 10)
      const zoneBtns = document.querySelectorAll('form[action="./zone.cgi"]')
      const targetBtn = zoneBtns[inputNum + 2].querySelector(
        'input[type="submit"]'
      )
      targetBtn.click()
    }
    // アイテムを使用する画面
    // 「Shift+I」で3秒間アイテム使用のホットキーを受け付ける
    if (event.isComposing || (event.shiftKey && event.code === "KeyI")) {
      useItemFlag = true
      setTimeout(() => {
        inputKey = false
      }, 3000)
    }
    // 数字キー番目のアイテムを使用する
    if (event.isComposing || (useItemFlag && event.code.includes("Digit"))) {
      inputKey = event.code
      const inputNum = parseInt(inputKey.replace(/[^0-9]/g, ""), 10)
      console.log(inputNum)
      const selectEle = document.querySelector('select[name="itemds"]')
      selectEle.options[inputNum - 1].selected = true
      const useItemBtn = document.querySelector(
        'input[value="　   使用する  　"]'
      )
      useItemBtn.click()
    }
    // アイテム使用画面へ遷移 ホットキー
    if (event.isComposing || event.code === "KeyI") {
      if (event.shiftKey) {
        return
      }
      const useItemBtn = document.querySelector(
        'input[value="アイテムを使用する"]'
      )
      useItemBtn.click()
    }
  })
})()
