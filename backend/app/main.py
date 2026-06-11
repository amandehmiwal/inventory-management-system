from fastapi import FastAPI
from pydantic import BaseModel
from pydantic import BaseModel,Field
from app.database import Base
from app.database import engine
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate
from app.models.customer import Customer
from app.schemas.customer import CustomerCreate
from fastapi import HTTPException  
from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order import OrderCreate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
   CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    ],
   allow_credentials = True,
   allow_methods = ["*"],
   allow_headers = ["*"]
)

Base.metadata.create_all(bind=engine)



products = []
    


@app.get("/") # decorator - if when someone sends GET it then it execute root() fun.
def root():return{
    "message": "Inventory Management API Running"
    
}

@app.get("/products")
def get_products(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    return products

# get-by-id
@app.get("/products/{product_id}")
def get_product_by_id(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if product is None:
     raise HTTPException(
        status_code=404,
        detail="Product not found"
     )

    return product

#post

@app.post("/products")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    existing_product = db.query(Product).filter(
    Product.sku == product.sku
).first()

    if existing_product:
     raise HTTPException(
        status_code=400,
        detail="SKU already exists"
    )

    db_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity=product.quantity
    )

    db.add(db_product)

    db.commit()

    db.refresh(db_product)

    return db_product

#delete

@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if product is None:
     raise HTTPException(
        status_code=404,
        detail="Product not found"
    )

    db.delete(product)

    db.commit()

    return {
        "message": "Product deleted successfully"
    }

@app.put("/products/{product_id}")
def update_product(
    product_id: int,
    updated_product: ProductCreate,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if product is None:
     raise HTTPException(
        status_code=404,
        detail="Product not found"
    )

    product.name = updated_product.name
    product.sku = updated_product.sku
    product.price = updated_product.price
    product.quantity = updated_product.quantity

    db.commit()

    db.refresh(product)

    return product

# customer 

@app.post("/customers")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    existing_customer = db.query(Customer).filter(
    Customer.email == customer.email
).first()

    if existing_customer:
     raise HTTPException(
        status_code=400,
        detail="Email already exists"
    )

    db_customer = Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(db_customer)

    db.commit()

    db.refresh(db_customer)

    return db_customer

@app.get("/customers")
def get_customers(
    db: Session = Depends(get_db)
):
    customers = db.query(Customer).all()
    return customers


@app.get("/customers/{customer_id}")
def get_customer_by_id(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
    )

    return customer

@app.delete("/customers/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if customer is None:
     raise HTTPException(
        status_code=404,
        detail="Customer not found"
    )

    db.delete(customer)

    db.commit()

    return {
        "message": "Customer deleted successfully"
    }


@app.post("/orders")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    
    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
    )

    total_amount = 0

    for item in order.items:
      print(item.product_id)
      print(item.quantity)

      product = db.query(Product).filter(Product.id == item.product_id).first()

      if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
      if product.quantity < item.quantity:
          raise HTTPException(
        status_code=400,
        detail=f"Insufficient inventory for {product.name}"
       )
      
      total_amount += product.price * item.quantity


    db_order = Order(
    customer_id=order.customer_id,
    total_amount=total_amount
)

    db.add(db_order)

    db.commit()

    db.refresh(db_order)

    for item in order.items:
        product = db.query(Product).filter(
        Product.id == item.product_id
        ).first()
        db_order_item = OrderItem(
           order_id=db_order.id,
           product_id=item.product_id,
           quantity=item.quantity
        )
    db.add(db_order_item),
    product.quantity -= item.quantity
    db.commit()

    return {
    "message": "Order created successfully",
    "order_id": db_order.id,
    "total_amount": total_amount
}

@app.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):

    orders = db.query(Order).all()

    return orders

@app.get("/orders/{order_id}")
def get_order_by_id(
    order_id: int,
    db: Session = Depends(get_db)
):

    order =  db.query(Order).filter(
        Order.id == order_id
    ).first()

    if order is None:
         raise HTTPException(
            status_code=404,
            detail="Order not found"
    )
    order_items = db.query(OrderItem).filter(
    OrderItem.order_id == order_id
).all()
    
    items = []
    for item in order_items:
      items.append({
        "product_id": item.product_id,
        "quantity": item.quantity
    })

    return {
     "id": order.id,
     "customer_id": order.customer_id,
     "total_amount": order.total_amount,
     "items": items
}

@app.delete("/orders/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order_items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    for item in order_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:
            product.quantity += item.quantity

        db.delete(item)

    db.delete(order)

    db.commit()

    return {
        "message": "Order deleted successfully"
    }


#dashboard

@app.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db)
):

    total_product = db.query(Product).count()
    total_customer = db.query(Customer).count()
    total_order = db.query(Order).count()

    low_stock = db.query(Product).filter(
        Product.quantity <= 5
    ).all()

    low_stock_products = []

    for product in low_stock:
        low_stock_products.append({
            "id": product.id,
            "name": product.name,
            "sku": product.sku,
            "quantity": product.quantity
        })

    return {
        "total_products": total_product,
        "total_customers": total_customer,
        "total_orders": total_order,
        "low_stock_products": low_stock_products
    }