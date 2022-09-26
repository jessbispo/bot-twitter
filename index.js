import Twit from 'twit';
import * as dotenv from 'dotenv'
dotenv.config()
//import express from 'express'

const Bot = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})

function BotInit() {
    let query = {
        q: "#percyjackson",
        result_type: "Top",
    };

    Bot.get("search/tweets", query, BotGotTopTweets);

    function BotGotTopTweets(error, data, response) {
        if (error) {
            console.log("Bot não conseguiu os ultimos tweets" + error);
        } else {
            var id = {
                id: data.statuses[0].id_str,
            };
        }
        Bot.post("statuses/retweet/:id", id, BotRetweet);

        function BotRetweet(error, response) {
            if (error) {
                console.log("não retweetou" + error)
            } else {
                console.log("retweetou" + id.id);
            }
        }
    }
}

setInterval(BotInit, 1 * 60 * 10000);
BotInit();