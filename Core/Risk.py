from pydantic import BaseModel

class Risk(BaseModel):
    price: float
    delta: float
    theta: float
    vega: float
    gamma: float