# Example Bot Telegram Using NodeJS

> Simple Bot Telegram For Inventory

## Build Setup

``` bash
# install dependencies
npm install

# Put Your Bot Telegram Token
const myBot = new TeleBot({
    token: 'TOKEN BOT',
    usePlugins: ['askUser','namedButtons'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});

# Runing the bot
node index.js
```
