const bcrypt = require('bcrypt')

module.exports = {
    login: (req, res, next) => {
        const {username, password} = req.body
        const dbInstance = req.app.get('db')

        dbInstance.auth.check_if_user_exists(username)
        .then(userFound => {
            console.log(userFound[0])
            if(!userFound[0]){
                res.status(200).send('Incorrect username/password')
            } else {
                console.log('this is the password',password)
                console.log('this is the user password', userFound[0].password)
                bcrypt.compare(password, userFound[0].password)
                .then(matchedPassword => {
                    console.log(matchedPassword)
                    if(matchedPassword){
                        const {username, email, user_id} = userFound[0]
                        req.session.user = {username, email, user_id}
                        res.status(200).send(req.session.user)
                        res.statusMessage = 'they match'
                        console.log('they match')
                    } else {
                        res.status(200).send('they dont match')
                    }
                })
            }
        }) 
    },

    register: (req, res, next) => {
        const {username, password, email} = req.body
        const dbInstance = req.app.get('db')

        dbInstance.auth.check_if_user_exists(username)
        .then(foundUser => {
            if(foundUser.length){
                console.log('new world order')
                res.status(200).send('Username already exists')
            } else {
                const saltRound = 12
                bcrypt.genSalt(saltRound).then(salt => {
                    bcrypt.hash(password, salt).then(hashedPassword => {
                        dbInstance.auth.register([username, hashedPassword, email])
                        .then((createdUser) => {
                            req.session.user = {
                                username: createdUser[0].username,
                                email: createdUser[0].email
                            }
                            res.status(200).send(req.session.user)
                        })
                    })
                })
            }
        })
    },

    userInfo: (req, res, next) => {
        console.log('this is the user', req.session.user)
        res.status(200).send(req.session.user);
    },

    logout: (req, res, next) => {
        console.log('hit')
        req.session.destroy()
        res.status(200).send('logged out')
    }
}