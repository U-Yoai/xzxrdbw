//=============================================================================
// EquipmentAcrobat.js
//=============================================================================

/*:ja
 * @plugindesc ver1.01 ステータスで装備アイテムを描画しなくなります。
 * @author まっつＵＰ
 * 
 * 
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * パラメータとプラグインコマンドともにありません。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 * 
 * ver1.01 アイテムカテゴリから武器や防具の項目を非表示に。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
    //var parameters = PluginManager.parameters('hikae');
    //var HBrate = Number(parameters['rate'] || 100);

    Window_ItemCategory.prototype.maxCols = function() {
    return 2; //元は4
    };

    Window_ItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
    //this.addCommand(TextManager.weapon,  'weapon');
    //this.addCommand(TextManager.armor,   'armor');
    this.addCommand(TextManager.keyItem, 'keyItem');
    };
    
    Window_Status.prototype.drawEquipments = function(x, y) {
    
    };
    
      
})();
