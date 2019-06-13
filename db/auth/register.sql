insert into users(username, password, email)
values($1, $2, $3);

select username, email from users
where email = $3