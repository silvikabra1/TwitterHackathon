import tweepy
import authentication
import datetime
import yfinance as yf

# Authentication Steps
auth = tweepy.OAuthHandler(authentication.consumer_key, authentication.consumer_secret)
auth.set_access_token(authentication.access_token, authentication.access_token_secret)
api = tweepy.API(auth)


# Given a specific stock and a specific date, returns the closing prices from that date and a week later (not complete)
def get_interval_prices(ticker, start_date):
    stock = yf.Ticker(ticker)
    history = stock.history(period='max')
    print(history)
    formatted_start =''
    formatted_start.append(str(start_date.year) + '-')
    if start_date.month < 10:
        formatted_start.append('0' + str(start_date.month) + '-')
    else:
        formatted_start.append(str(start_date.month) + '-')
    if start_date.day < 10:
        formatted_start.append('0' + str(start_date.day))
    else:
        formatted_start.append(str(start_date.day))


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


# Function to extract most popular tweets from a user (that were posted at least a week before the current date)
def get_tweets(username):
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
    return most_popular


if __name__ == '__main__':
    # example usage:
    most_popular = get_tweets('elonmusk')
    for tweet in most_popular:
        print(tweet)