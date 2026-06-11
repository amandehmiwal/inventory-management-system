from pydantic import BaseModel, Field

class ProductCreate(BaseModel):
    name: str
    sku: str

    price: float = Field(
        gt=0,
        description="Price must be greater than 0"
    )

    quantity: int = Field(
        ge=0,
        description="Quantity cannot be negative"
    )
