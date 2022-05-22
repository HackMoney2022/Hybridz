import numpy as np
from scipy.stats import norm
import Risk
import mibian

N = norm.cdf
Np = norm.pdf

def mobian_implied_volatility(underlyingPrice, strikePrice, interestRate, daysToExpiration, price, optionType):
    if optionType == "C":
        implied = mibian.BS([underlyingPrice, strikePrice, interestRate, daysToExpiration], callPrice= price)
    elif optionType == "P":
        implied = mibian.BS([underlyingPrice, strikePrice, interestRate, daysToExpiration], putPrice= price)
    
    return implied.impliedVolatility

def mobian_risk_attributes(underlyingPrice, strikePrice, interestRate, daysToExpiration, price, optionType):
    impliedVolatility = mobian_implied_volatility(underlyingPrice, strikePrice, interestRate, daysToExpiration, price, optionType)
    risk = mibian.BS([underlyingPrice, strikePrice, interestRate, daysToExpiration], volatility = impliedVolatility)
    if optionType == "C":    
        return Risk(price=risk.callPrice, delta=risk.callDelta, theta= risk.callTheta, vega= risk.vega, gamma = risk.gamma)             
    elif optionType == "P":        
        return Risk(price=risk.putPrice, delta=risk.putDelta, theta= risk.putTheta, vega= risk.vega, gamma = risk.gamma)     
    

def delta(S, K, T, R, sigma, optionType):
    d1 = (np.log(S / K) + (R + sigma ** 2 / 2) * T) / (sigma * np.sqrt(T))
    if optionType == "C":
        delta = N(d1)
    elif optionType == "P":
        delta = N(d1) - 1
    return delta


def gamma(S, K, T, R, sigma):
    d1 = (np.log(S / K) + (R + sigma ** 2 / 2) * T) / (sigma * np.sqrt(T))

    gamma = Np(d1) / (S * sigma * np.sqrt(T))
    return gamma


def vega(S, K, T, R, sigma):
    d1 = (np.log(S / K) + (R + sigma ** 2 / 2) * T) / (sigma * np.sqrt(T))

    vega = S * Np(d1) * np.sqrt(T)
    return vega * 0.01


def theta(S, K, T, R, sigma, optionType):
    d1 = (np.log(S / K) + (R + sigma ** 2 / 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if optionType == "C":
        theta = -S * Np(d1) * sigma / (2 * np.sqrt(T)) - R * K * np.exp(-R * T) * N(d2)
    elif optionType == "P":
        theta = -S * Np(d1) * sigma / (2 * np.sqrt(T)) + R * K * np.exp(-R * T) * N(-d2)
    return theta / 365


def rho(S, K, T, R, sigma, optionType):
    d1 = (np.log(S / K) + (R + sigma ** 2 / 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if optionType == "C":
        rho = K * T * np.exp(-R * T) * N(d2)
    elif optionType == "P":
        rho = -K * T * np.exp(-R * T) * N(-d2)
    return rho * 0.01

def price(S, K, T, R, sigma, optionType):
    d1 = (np.log(S / K) + (R + sigma ** 2 / 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if optionType == "C":
        price = S * N(d1) - K * np.exp(-R*T)* N(d2)
    elif optionType == "P":
        price = K*np.exp(-R*T)*N(-d2) - S*N(-d1)
    return price
