from pydantic import BaseModel

class Deriv(BaseModel):
    underlyingCoinPrice: float
    strikePrice: float
    daysToExpiration: int
    optionPrice: float
    optionType: str