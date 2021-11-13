const express = require('express');
const cors = require('cors');
const Twit = require('twit');
const app = express();
app.use(cors());
const APIKey = '51cMuRMjlQmW6SxPEdXa5T8Xh';
const APISecretKey = 'N8mgoQIYf9CShUq5BhMiHSnclHBrqAr58n1OaednkUJf4PwEHS';
const BearerToken =
    'AAAAAAAAAAAAAAAAAAAAADjxVgEAAAAALmCmNDhRaqufqpbFwK6Dst2QAJU%3DzKCDJjSrnia1uxOV1U3OGrcH5envoARHsHoSpc3i6ymRcjNtkX';
const AccessToken = '859100969644240897-xMAwzYYG0vh0kaB8wFiasjfqG3uNVlS';
const AccessTokenSecret = 'Apfv9pAgflwlglFQllkhKj7f8oQp49c4SwJ8heVbowe5z';

app.get('/get_tweets/:username/:count', async (req, res) => {
    const username = req.params.username;
    const count = req.params.count;
    const params = { screen_name: `${username}`, count: `${count}` };

    const T = new Twit({
        consumer_key: APIKey,
        consumer_secret: APISecretKey,
        access_token: AccessToken,
        access_token_secret: AccessTokenSecret,
    });
    await T.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (error) {
            console.log(error);
            res.status(400).send({ success: false, error: error });
        } else {
            tweets.forEach((element) => {
                console.log(element);
            });
            res.status(200).send({ success: true, tweets: tweets });
        }
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('server is running on port:', port);
});
// exports.app = functions.https.onRequest(app);
module.exports = app;
