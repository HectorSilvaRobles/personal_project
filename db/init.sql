// product table

create table products (
    product_id serial primary key,
    name varchar(75) not null,
    price decimal not null,
    size decimal[],
    image text not null
)

//inserting into products table

 insert into products(name, price, size, image)
values 
('Nike Galaxy Foamposites', 200, '{8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13}','https://www.flightclub.com/media/catalog/product/cache/1/image/1600x1140/9df78eab33525d08d6e5fb8d27136e95/0/4/041660_01.jpg'


// user table
create table users (
    user_id serial primary key,
    username varchar(50) not null,
    password text not null,
    email varchar(100) not null,
    cart_id integer references cart(cart_id)
)

// cart table
create table cart(
    cart_id serial primary key,
    product_id integer references products(product_id),
    user_id integer references users(user_id)
)

// orders table
create table orders(
    order_id serial primary key,
    user_id integer references users(user_id),
    total_cost decimal,
    first_name varchar(40),
    last_name varchar(50),
    country varchar(50),
    state varchar(2),
    city varchar(50),
    address varchar(100),
    zip_code integer
)
