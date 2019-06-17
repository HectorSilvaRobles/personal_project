insert into users(username, password, email)
values($1, $2, $3);

select username, email, user_id from users
where email = $3