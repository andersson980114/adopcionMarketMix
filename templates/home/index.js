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
      if(this.mascotas!=null && this.mascotas.length >4 ){
        let fin = this.mascotas.length-5
        this.mascotas.splice(0, fin)
      }
    },
    
})