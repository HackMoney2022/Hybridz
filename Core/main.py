
import time
import option_future_model as bs
from api import get_market_sentiment
import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import Risk
from Static import Deriv
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():   
    return {"message": "Base API"}

@app.post("/realtimerisk/")
async def realtimerisk(deriv: Deriv):
    risk = bs.mobian_risk_attributes(deriv.underlyingCoinPrice, deriv.strikePrice, 0, deriv.daysToExpiration, deriv.optionPrice, deriv.optionType)
    
    if not risk:
        raise HTTPException(status_code=400, detail="Error in getting the greek values")
    json_compatible_item_data = jsonable_encoder(risk)
    return JSONResponse(content=json_compatible_item_data)    
    #return risk
   

@app.get("/sentiment/{coin}", status_code=200)
def read_sentiment(coin):
    sentiment = get_market_sentiment(coin)
    
    if not sentiment:
        raise HTTPException(status_code=400, detail="Error in getting the sentiment")

    return sentiment

@app.get("/greek/{underlyingCoinPrice}/{strikePrice}/{daysToExpiration}/{optionPrice}/{optionType}/", status_code=200)
def read_greek(underlyingCoinPrice, strikePrice, daysToExpiration, optionPrice, optionType):
    riskFactors = bs.mobian_risk_attributes(underlyingCoinPrice, strikePrice, 0, daysToExpiration, optionPrice, optionType)
    
    if not riskFactors:
        raise HTTPException(status_code=400, detail="Error in getting the greek values")

    return riskFactors
   
    
#coin = "eth"
#date = "20-05-2022): ')
#curr = "usd"

#url = ('https://api.coingecko.com/api/v3/coins/'+coin+'/history?date='+date+'&localization=false')

# try:
#     get = requests.get(url).text
#     get = json.loads(get)
#     print('price of '+coin+' '+date+': ', get['market_data']['current_price'][curr], curr)
#     print('MarketCap of '+coin+' '+date+': ', get['market_data']['market_cap'][curr], curr)
# except:#     
#     print('ERROR 404 - check url...')
#     exit()


