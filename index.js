const app = new Vue({
    el: '#app',
    data:{
      users: [],  
      username: undefined,
      password: undefined,
      mensaje: undefined,
      error: false, 
      logueo: false
    },
    methods:{
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },

        ingresar(){
            this.users.map((user, index) => {   
                    if(user.username === this.username && user.password === this.password){
                        localStorage.setItem('user', JSON.stringify(
                            {
                            'id': index,
                            'username':this.username, 
                            'password:': this.password,
                            'img': user.foto,
                            'firstName': user.firtsName,
                            'lastName': user.lastName,
                            'type': user.type
                            }
                        ))
                        
                        this.logueo = true
                        this.error=false
                    
                    }  
                }
            ) 
            localStorage.setItem('users', JSON.stringify(this.users))
            if(this.logueo===false){
                this.error = true
                this.mensaje = "Username o password incorrectos"
            }else{
                Swal.fire(
                    'Ingresado con éxito',
                    'Usuario logueado',
                    'success'
                  )
                window.location = "templates/home/index.html";
            }
        }, 
      
    },
    created(){ 

        fetch('https://randomuser.me/api/?results=10')
        .then((response) => response.json())
        .then((data) => { 
            console.log(data.results)
            data.results.map(user => { 
                const type = this.getRandomInt(2)
                this.users.push(
                    {
                        'foto': user.picture.large,
                        'firtsName': user.name.first,
                        'lastName': user.name.last,
                        'edad': user.registered.age,
                        'Pais': 'https://countryflagsapi.com/png/'+user.location.country,
                        'email': user.email,
                        'telefono': user.phone,
                        'celular': user.cell,
                        'genero': user.gender,
                        'username':user.login.username,
                        'password':user.login.password,
                        'type': type,
                        
                    }
                )
                console.log( "username:", user.login.username + "\nPassword:",user.login.password + "\nType:", type)
                
            })
            localStorage.setItem('users', JSON.stringify(this.users))
        });
 
    },
    
})