//=============================================================================
// Message_Choices.js
//=============================================================================

/*:
 * @plugindesc 選択技でメッセージ消さないやつ
 * @author pecoge
 *
 * @help スイッチ31番がONの時動くよ
 * たぶんね
 */
 
(function(_global) {
　Window_Message.prototype.checkToNotClose = function() {
　　if (this.isClosing() && this.isOpen()) {
　　　if (this.doesContinue() || $gameSwitches.value(31)) {
　　　　this.open();
　　　}
　　}
　};
})(this);