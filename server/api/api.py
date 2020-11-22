import flask
from flask import jsonify
from flask_cors import CORS
import tweepy
import authentication
import datetime
from datetime import date
import yfinance as yf
import time


app = flask.Flask(__name__)
cors = CORS(app, resources=r'/api/*')

# Authentication Steps
auth = tweepy.OAuthHandler("qc4ueP46blF2vrmSGRSMsR0e2", "8LduRX2G0kFVbVucmzSutvblSy6NMZDaBnEwIXnm1dplgb0uuF")
auth.set_access_token("3268541017-Vtllj2Ono6NfyDrUixDKnhujgKnzjbux4b2V5cp", "77uymqu6rwVyuWnVJS8G2Tb8EommGPa3exeo6QgC5O9y7")
api = tweepy.API(auth)

# Function to extract most popular tweets from a user (that were posted at least a week before the current date)
@app.route('/api/tweets/<screen_name>', methods=['GET'])
def get_tweets(screen_name):
    username = str(screen_name)
    num_tweets = 200
    tweets = api.user_timeline(screen_name=username, count=num_tweets)
    num_tweets = len(tweets)

    most_popular_num = 20
    print('The', most_popular_num, 'most popular tweets of the last', num_tweets, 'from @', username, 'posted at least a week ago:\n')
    most_popular = []

    counter = 0
    while counter < num_tweets:
        if tweets[counter].favorite_count == 0:
            counter += 1
            continue
        if len(most_popular) > 20 and tweets[counter].favorite_count < most_popular[-1][0]:
            counter += 1
            continue
        else:
            date_posted = tweets[counter].created_at
            if date_in_bounds(date_posted):
                tweet_info = [tweets[counter].favorite_count, tweets[counter].id, tweets[counter].text, tweets[counter].created_at]
                most_popular.append(tweet_info)
                most_popular.sort(reverse=True)
                if len(most_popular) > most_popular_num:
                    most_popular.pop(-1)
            else:
                counter += 1
                continue
        counter += 1
    return jsonify({'most_popular': most_popular})
 


# Given a specific stock and a specific date, returns the closing prices from that date and a week later (not complete)
@app.route('/api/stockprices/<ticker>/<start_date>', methods=['GET'])
def get_interval_prices(ticker, start_date):
    start_date = date.fromtimestamp(int(start_date))
    formatted_start, formatted_end = format_start_and_end(start_date)
    stock = yf.Ticker(ticker)
    history = stock.history(start=formatted_start, end=formatted_end)
    return jsonify({'history': history['Close']})


# Given a datetime object, calculates date 7 days into the future and converts both dates into yfinance-friendly format
# Note: One Day is subtracted from start date (and by extension end date) because the market might not have closed if it is the current date
def format_start_and_end(start_date):
    days_in_the_month = {'01': 31, '03': 31, '04': 30, '05': 31, '06': 30, '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31}
    if start_date.day - 1 == 0:
        new_month = start_date.month - 1
        if new_month == 0:
            new_year = start_date.year - 1
            formatted_start = str(new_year) + '-12-31'
        else:
            if new_month < 10:
                if new_month == 2:
                    if is_a_leap_year(start_date.year):
                        new_day = 29
                    else:
                        new_day = 28
                formatted_start = str(start_date.year) + '-0' + str(new_month) + '-' + str(new_day)
            else:
                new_day = days_in_the_month[str(new_month)]
                formatted_start = str(start_date.year) + '-' + str(new_month) + '-' + str(new_day)
    else:
        if start_date.day - 1 < 10:
            if start_date.month < 10:
                formatted_start = str(start_date.year) + '-0' + str(start_date.month) + '-0' + str(start_date.day - 1)
            else:
                formatted_start = str(start_date.year) + '-' + str(start_date.month) + '-0' + str(start_date.day - 1)
        else:
            if start_date.month < 10:
                formatted_start = str(start_date.year) + '-0' + str(start_date.month) + '-' + str(start_date.day - 1)
            else:
                formatted_start = str(start_date.year) + '-' + str(start_date.month) + '-' + str(start_date.day - 1)

    end_day = int(formatted_start[-2:]) + 7
    if formatted_start[5:7] == '02':
        if is_a_leap_year(formatted_start[0:4]):
            if end_day > 29:
                new_day = (7 - (29 - int(formatted_start[-2:])))
                if int(formatted_start[5:7]) + 1 > 12:
                    if new_day < 10:
                        formatted_end = str(int(formatted_start[0:4]) + 1) + '-01-0' + str(new_day)
                        return formatted_start, formatted_end
                    else:
                        formatted_end = str(int(formatted_start[0:4]) + 1) + '-01-' + str(new_day)
                        return formatted_start, formatted_end
                else:
                    if (new_day) < 10:
                        formatted_end = formatted_start[0:5] + str(int(formatted_start[5:7]) + 1) + '-0' + str(new_day)
                        return formatted_start, formatted_end
                    else:
                        formatted_end = formatted_start[0:5] + str(int(formatted_start[5:7]) + 1) + '-' + str(new_day)
                        return formatted_start, formatted_end
            else:
                if end_day < 10:
                    formatted_end = formatted_start[0:8] + '0' + str(end_day)
                    return formatted_start, formatted_end
                else:
                    formatted_end = formatted_start[0:8] + str(end_day)
                    return formatted_start, formatted_end
        else:
            if end_day > 28:
                new_day = (7 - (28 - int(formatted_start[-2:])))
                if int(formatted_start[5:7]) + 1 > 12:
                    if new_day < 10:
                        formatted_end = str(int(formatted_start[0:4]) + 1) + '-01-0' + str(new_day)
                        return formatted_start, formatted_end
                    else:
                        formatted_end = str(int(formatted_start[0:4]) + 1) + '-01-' + str(new_day)
                        return formatted_start, formatted_end
                else:
                    formatted_end = formatted_start[0:5] + str(int(formatted_start[5:7]) + 1) + '-' + str(new_day)
                    return formatted_start, formatted_end
            else:
                formatted_end = formatted_start[0:8] + str(end_day)
                return formatted_start, formatted_end
    else:
        if end_day > days_in_the_month[formatted_start[5:7]]:
            new_day = (7 - (days_in_the_month[formatted_start[5:7]] - int(formatted_start[-2:])))
            if int(formatted_start[5:7]) + 1 > 12:
                if new_day < 10:
                    formatted_end = str(int(formatted_start[0:4]) + 1) + '-01-0' + str(new_day)
                    return formatted_start, formatted_end
                else:
                    formatted_end = str(int(formatted_start[0:4]) + 1) + '-01-' + str(new_day)
                    return formatted_start, formatted_end
            else:
                if new_day < 10:
                    formatted_end = formatted_start[0:5] + str(int(formatted_start[5:7]) + 1) + '-0' + str(new_day)
                    return formatted_start, formatted_end
                else:
                    formatted_end = formatted_start[0:5] + str(int(formatted_start[5:7]) + 1) + '-' + str(new_day)
                    return formatted_start, formatted_end
        else:
            if end_day < 10:
                formatted_end = formatted_start[0:8] + '0' + str(end_day)
                return formatted_start, formatted_end
            else:
                formatted_end = formatted_start[0:8] + str(end_day)
                return formatted_start, formatted_end





# Determines if a given year is a leap year
def is_a_leap_year(year):
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False


# Determines if a given date is at least a week before the current day
def date_in_bounds(date):
    today = datetime.date.today()
    days_in_the_month = {1: 31, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    if today.day < 8:
        difference = date.day - today.day
        new_month = today.month - 1
        if new_month == 0:
            new_year = today.year - 1
            new_day = 31 - (7 - difference)
            if date.day < new_day and date.month == 12 and date.year <= new_year:
                return True
            else:
                return False
        else:
            if is_a_leap_year(today.year):
                if new_month == 2:
                    new_day = 29 - (7 - difference)
                else:
                    new_day = days_in_the_month[new_month] - (7 - difference)
            else:
                if new_month == 2:
                    new_day = 28 - (7 - difference)
                else:
                    new_day = days_in_the_month[new_month] - (7 - difference)
            if date.day < new_day and date.month <= new_month and date.year <= today.year:
                return True
            else:
                return False
    else:
        if date.day <= today.day - 7 and date.month <= today.month and date.year <= today.year:
            return True
        else:
            return False




app.run();
