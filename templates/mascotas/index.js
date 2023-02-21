const app = new Vue({
    el: '#app',
    data:{ 
      user: JSON.parse(localStorage.getItem('user')),   
      mascotas: JSON.parse(localStorage.getItem('mascotas')),   
      mensaje: undefined,
      error: false, 
      logueo: false
    },
    methods:{
        adoptar(index){ 
          Swal.fire({
            title: '¿Está seguro?',
            text: "Esta mascota será adoptada",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
          }).then((result) => {
            if (result.isConfirmed) {
              this.mascotas[index].estado = true
              localStorage.setItem('mascotas', JSON.stringify(this.mascotas)) 
              Swal.fire(
                'Confirmado',
                '¡Mascota adoptada!',
                'success'
              )
            }
          })
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
        
      if(this.user === null){
        window.location = "../../index.html";
      }
      

         
    },
    
})