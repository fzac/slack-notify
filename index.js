const _ = require('lodash');
const Slack = require('slack-node');
const moment = require('moment');

let config = {};

exports.setup = (_config) => {
  config = _config;
  slack = new Slack();
  slack.setWebhook(config.hook_url);
};

const send = (text, color, callback) => {
  callback = callback || (() => {});
  const date = moment(new Date()).format('YYYY/MM/DD HH:mm:ss.SSS');
  const attachments = [{ text: text, pretext: date, color: color }];
  text = '';

  const params = {
    channel: 'alert',
    username: config.username,
    icon_emoji: config.icon_emoji,
    text: text,
    attachments: attachments,
  };
  slack.webhook(params, callback);
};

exports.info = (text, callback) => {
  send(text, 'good', callback);
}

exports.warn = (text, callback) => {
  send(text, 'warning', callback);
}

exports.error = (text, callback) => {
  send(text, 'danger', callback);
}
