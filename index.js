const getFormMenu = document.getElementById('formMenu')
const getMenu = document.getElementById('menu')
const getHarga = document.getElementById('harga')
const getLoading = document.getElementById('loading')
const getApp = document.getElementById('app')
let lis_menu = []
let lis_harga = []

setInterval(() =>{
   const getSpan = document.querySelector('span')
   const newSpan = document.createElement('span')
   newSpan.textContent = '.'
   getSpan.appendChild(newSpan)
},300)
setTimeout(() => {
   getLoading.classList.add('d-none')
   getApp.classList.remove('d-none')
},2000)


getFormMenu.addEventListener('submit', (e)=> {
   e.preventDefault()

   if(! validasi() ) {
      Swal.fire({
         icon: 'warning',
         title: 'Oops...',
         text: 'Data tidak boleh kosong',
         showConfirmButton: true,
         timer: 2000
      })
   } else {
      if(! lis_menu.includes( getMenu.value.trim() ) ) {
         getHarga.focus()
         if( getHarga.value.trim().length == 0 ) {
            return false
         } else {
            lis_menu.push( getMenu.value.trim() )
            lis_harga.push(getHarga.value) 
            loadData()
         }
      } else {
         Swal.fire({
            icon: 'warning',
            title: 'Perhatian',
            text: `menu ${getMenu.value} sudah ada`,
            showConfirmButton: false,
            timer: 2000
         })
         loadData( filter = null)
      }
      getFormMenu.reset()
      getMenu.focus()
   }
})

const validasi = ()=> {
   if( getMenu.value.trim().length == 0 ) {
      return false
   } else {
      return true
   }
}

const getTableBody = document.getElementById('tableBody')
const loadData = (filter)=> {
   let rows = '';

   lis_menu.forEach((e, i)=> {
      if( filter == null ) {
         rows += `
            <tr>
               <td>${i + 1}</td>
               <td>${e}</td>
               <td>${lis_harga[i]}</td>
               <td><button onclick='deleteMenu(${i})' class='btn-danger'>Hapus</button></td>
            </tr>
         `
      } else if( e == filter) {
         rows += `
            <tr>
               <td>${i + 1}</td>
               <td>${e}</td>
               <td>${lis_harga[i]}</td>
               <td><button onclick='deleteMenu(${i})' class='btn-danger'>Hapus</button></td>
            </tr>
         `
      }
   })

   getTableBody.innerHTML = rows

}

const deleteMenu = (i)=> {
   Swal.fire({
      title: 'Yakin ?',
      text: `Hapus menu ${lis_menu[i]}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Batal',

   }).then( res => {
      if( res.isConfirmed ) {
         lis_menu.splice(i, 1)
         loadData(filter = null)
         Swal.fire({
            icon: 'success',
            text: 'Menu berhasil dihapus'
         })
      } else {
         Swal.fire({
            icon: 'success',
            text: 'Menu gagal dihapus'
         })
      }
   })
}

const searchMenu = (e)=> {
   if( e.length != 0 ) {
      loadData(filter = e)
   } else {
      loadData()
   }
}
