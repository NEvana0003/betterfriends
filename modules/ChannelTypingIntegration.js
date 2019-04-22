const { getModule } = require('powercord/webpack');
const { inject } = require('powercord/injector');
const { resolve } = require('path');

/*
 * [ Channel Typing Integration ]
 * Integrates new features into `powercord-channelTyping`
 * Contributors: Bowser65#0001
 */
module.exports = async function () {
  try {
    const typingModule = require.resolve(resolve(`${__dirname}./../../powercord-channelTyping/index.js`));
    const typingStore = await getModule([ 'getTypingUsers' ]);
    inject('bf-ct-integration', require.cache[typingModule].exports.prototype, '_renderTypingElement', (args, res) => {
      const info = args[0];
      if (this.FAV_FRIENDS.some(fr => Object.keys(typingStore.getTypingUsers(info.id)).includes(fr))) {
        res.props.style.filter = 'sepia(300%) hue-rotate(313deg) saturate(1600%)';
      }
      return res;
    });
  } catch (e) {
    this.log('"powercord-channelTyping" doesn\'t seem to be present in the plugins folder, unloading companion module');
    this.unload('ChannelTypingIntegration');
  }
};