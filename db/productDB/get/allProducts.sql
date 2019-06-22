select * from products
where name like $1
order by random()
limit 6;