const TeleBot = require('telebot');
const items =  require('./data/items');
const BUTTONS = {
    hide: {
        label: '⌨️ Hide',
        command: '/hide'
    },
    listItem: {
        label: '🏬 Item',
        command: '/listItem'
    },
    checkStock: {
        label: '🔎 Stock',
        command: '/checkStock'
    },
    checkTransaction: {
        label: '🛒 Transaction',
        command: '/checkTransaction'
    }
};

const myBot = new TeleBot({
    token: 'TOKEN BOT',
    usePlugins: ['askUser','namedButtons'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});

function checkResponse(msg){
    let text = msg.text;
    let dataResponse = {
        'hi' : 'Hi <b>'+msg.from.username+',</b>\nWellcome to ChatBot!\n May I Help You??',
        'hello' : 'Hallo <b>'+msg.from.username+',</b>\nWellcome to ChatBot!\n May I Help You??',
    }
    text = text.replace(' ','_').toLowerCase();
    return (dataResponse[text]) ? dataResponse[text] : false;
}

myBot.on(['/start', '/back'], msg => {
    let replyMarkup = myBot.keyboard([
        [BUTTONS.checkStock.label, BUTTONS.listItem.label],
        ['/start', BUTTONS.hide.label]
    ], {resize: true});
    let username = msg.from.username;
    return myBot.sendMessage(msg.from.id, 'Hallo <b>'+username+',</b>\nWellcome to Kimjay ChatBot!\n May I Help You??', {replyMarkup}).then(res => {
        myBot.sendMessage(msg.from.id, 'You can see list our product and Check details product for more information')
    });
});

myBot.on(['/hide'], msg => {
    return myBot.sendMessage(msg.from.id, 'Say hello to show', {replyMarkup: 'hide'});
});

myBot.on(['/listItem'], msg => {
    for (let index = 0; index < items.length; index++) {
        let value = items[index];
        let message = '';
        message += '<b> Name </b> :'+value.name+'\n';
        message += '<b> Price </b> : $'+value.price+'\n';
        message += '<b> Product Code </b> :'+value.code+'\n';
        myBot.sendMessage(msg.from.id, message, {parseMode : 'html'});
    }
});

myBot.on(['/checkStock'], msg => {
    return myBot.sendMessage(msg.from.id, 'Please input product code', {ask: 'product'});
});

myBot.on('ask.product', msg => {

    let product_code = msg.text;
    let product = items.filter(d => {
        return d.code.toUpperCase() === product_code.toUpperCase()
    })
    if(!product || product.length <= 0){
        return myBot.sendMessage(msg.from.id, `Product Code : ${ product_code } \n<b> Not Found </b>, Please input product code`,
        {parseMode : 'html',ask: 'product'});
    }else{
        product = product[0]
        let message = '';
        message += '<b> Name </b> :'+product.name+'\n';
        message += '<b> Price </b> : $'+product.price+'\n';
        message += '<b> Product Code </b> :'+product.code+'\n';
        message += '<b> Stock </b> :'+product.stock+' pcs\n';
        message += '<b> Url </b> :'+product.url+'\n';
        return myBot.sendMessage(msg.from.id, message, {parseMode : 'html'});
    }
});

myBot.on(['text'], msg => {
    let replyMarkup = myBot.keyboard([
        [BUTTONS.checkStock.label, BUTTONS.listItem.label],
        ['/start', BUTTONS.hide.label]
    ], {resize: true});
    let message = checkResponse(msg);
    return (message) && myBot.sendMessage(msg.from.id, message, {replyMarkup});
});

myBot.start();