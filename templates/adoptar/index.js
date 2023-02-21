const app = new Vue({
    el: '#app',
    data:{ 
      user: JSON.parse(localStorage.getItem('user')),
      mascotas: [],  
      mensaje: undefined,
      error: false, 
      logueo: false,
      //datos de la mascota
      nombre: undefined,
      raza: undefined,
      color: undefined,
      especie: undefined,
      edad: undefined,
      genero: undefined,
      descripcion: undefined,
      foto: undefined,
      fotos: [],
      ///modal
      showModal:false
    },
    methods:{
        cargarFoto(){
          this.fotos = []
          let timerInterval
         

          if(this.especie != null){
            Swal.fire({
              title: 'Accediendo a las fotos',
              html: 'Cargando <b></b> fotos',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                if(this.especie === 'perro'){ 
                  this.error = false
                  this.cargarPerros()
                }else if(this.especie === 'gato'){ 
                  this.error = false
                  this.cargarGatos()
                }
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                  },  2000 )
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                  }
              })

          } else{
            this.error = true
            this.mensaje = 'Por favor elegir la especie'
          }
          
        },

        subir(item){
          console.log(item.foto)
          this.foto = item.foto
          this.cerrar()
        },
        cerrar(){
          this.showModal=false
        },

        async cargarPerros(){
            for(var i=0; i<6; i++){
              const res = await fetch('https://dog.ceo/api/breeds/image/random')
              const data = await res.json();
              this.fotos.push({
                'id': i,
                'foto': data.message
              })
            }
            this.fotos.map(index => console.log(index))
            this.showModal = true
        },
        async cargarGatos(){
            const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=5')
            const data = await res.json();

            for(let i = 0; i < 6; i++){
               
              this.fotos.push(
                {
                  'id': i,
                  'foto': data[i].url
                }
              )
            }

            
            this.fotos.map(index => console.log(index))
            this.showModal = true
        },

        guardar(){
          if(this.nombre === undefined  || this.foto === undefined  ||  this.descripcion === undefined || this.genero === undefined || this.edad === undefined || this.especie === undefined || this.color === undefined ){
            this.error=true
            this.mensaje = "Por Favor llenar todos los campos"
          }else{
            Swal.fire({
              title: '¿Está seguro?',
              text: "Revisa y confirma que los campos estén cons los datos correctos",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
              if (result.isConfirmed) {
                let mascota = {
                  'nombre': this.nombre,
                  'raza': this.raza,
                  'color': this.color,
                  'especie': this.especie,
                  'edad': this.edad,
                  'genero': this.genero,
                  'descripcion': this.descripcion,
                  'foto': this.foto,
                  'estado': false
                }
                
                this.mascotas.push(mascota)
                localStorage.setItem('mascotas', JSON.stringify(this.mascotas)) 
                this.vaciar()
                Swal.fire(
                  'Almacenado',
                  'registro almacenado exitosamente',
                  'success'
                )
              }
            })
          }
        },

        vaciar(){
          this.nombre = undefined
          this.raza = undefined
          this.color = undefined
          this.especie = undefined
          this.edad = undefined,
          this.genero = undefined
          this.descripcion = undefined
          this.foto = undefined
        },
        
       
        logout(){ 
          Swal.fire({
            title: '¿Está seguro?',
            text: "¿Desea cerrar esta sesión?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
          }).then((result) => {
            if (result.isConfirmed) { 
              Swal.fire(
                'Confirmado',
                '¡Sesión cerrada!',
                'success'
                )
                localStorage.setItem('users', JSON.stringify(null))
                window.location = "../../index.html";
              }
          })
        }
         
    },
    created(){ 
      this.vaciar()
      if(this.user === null){
        window.location = "../../index.html";
      }
      let mascotass = JSON.parse(localStorage.getItem('mascotas'))
      if(mascotass != null){
        this.mascotas = mascotass
      }
         
    },
    
})