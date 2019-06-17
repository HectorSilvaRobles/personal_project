delete from cart
where user_id = $1 AND product_id = $2;

select distinct users.user_id, users.username, products.name, products.price, products.my_size, products.image, products.product_id
from cart
inner join users on cart.user_id = users.user_id
inner join products on cart.product_id = products.product_id

where cart.user_id = $1