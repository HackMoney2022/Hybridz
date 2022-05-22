import hashlib
import hmac
import json
import time
import requests
from settings import *

def get_market_sentiments():
     # send HTTPS GET request to boson app
    json_response = requests.get(api_market_sentiment_url)
    response_dict = json.loads(json_response.content)
    return response_dict

def get_market_sentiment(coin):
     # send HTTPS GET request to boson app
    json_response = requests.get(api_market_sentiment_url)
    response_dict = json.loads(json_response.content)
    response_currencies = response_dict["currencies"]    
    for currency in response_currencies:
        if(currency["name"].upper() == str(coin).upper()):
             sentiment_data = currency["sentimentHistory"]
             for sentimentfield in sentiment_data:
                 return sentimentfield["sentiment"]
   

    url = "/api/v2/public/get_order_book"
    parameters = {'instrument_name': instrument}
    # send HTTPS GET request
    json_response = requests.get((api_exchange_address + url + "?"), params=parameters)
    response_dict = json.loads(json_response.content)
    instrument_details = response_dict["result"]

    return instrument_details
