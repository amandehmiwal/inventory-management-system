from pydantic import BaseModel
from pydantic import Field


class OrderItemCreate(BaseModel):

    product_id: int

    quantity: int = Field(
        gt=0
    )


class OrderCreate(BaseModel):

    customer_id: int

    items: list[OrderItemCreate]