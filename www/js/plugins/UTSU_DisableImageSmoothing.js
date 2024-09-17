//=============================================================================
// UTSU_DisableImageSmoothing.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utsuda Shinou
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/02/17 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
//=============================================================================

/*:
 * @plugindesc Disable image smoothing
 * @author Utsuda
 *
 * @help This plugin does not provide plugin commands.
 *
 */

/*:ja
 * @plugindesc 画像の拡大時の補完機能を無効にします
 * @author Utsuda
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 */

(function() {
  'use strict';

  var _Bitmap__createCanvas = Bitmap.prototype._createCanvas;
  Bitmap.prototype._createCanvas = function(width, height) {
    _Bitmap__createCanvas.call(this, width, height);
    this.__context.mozImageSmoothingEnabled =
      this.__context.webkitImageSmoothingEnabled =
      this.__context.msImageSmoothingEnabled =
      this.__context.imageSmoothingEnabled = false;
  }

  Bitmap.prototype._createBaseTexture = function(source) {
    this.__baseTexture = new PIXI.BaseTexture(source);
    this.__baseTexture.mipmap = false;
    this.__baseTexture.width = source.width;
    this.__baseTexture.height = source.height;

    // if (this._smooth) {
    //     this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    // } else {
    this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    // }
  };

}());