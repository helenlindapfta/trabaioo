
// !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcNu9TIu68IZ_70ENq79cOoZ9-KabtwGg",
    authDomain: "crud-modelagem.firebaseapp.com",
    databaseURL: "https://crud-modelagem.firebaseio.com",
    projectId: "crud-modelagem",
    storageBucket: "crud-modelagem.appspot.com",
    messagingSenderId: "735605286107",
    appId: "1:735605286107:web:8f9bd9ab6e15abe4e958fe",
    measurementId: "G-6KHZNMN4D6"
};



firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usuariosRef = dbRef.child('usuarios');


readUsuarioData(); 
	

//LER DADOS
function readUsuarioData() {

	const viewListaUsuario = document.getElementById("usuario-lista");

	usuariosRef.on("value", snap => {

		viewListaUsuario.innerHTML = "";

		snap.forEach(childSnap => {

			let key = childSnap.key,
				value = childSnap.val();
  			
			let $li = document.createElement("li");

			//ICONE EDITAR
			let viewIconEditar = document.createElement("span");
			viewIconEditar.class = "editar-usuario";
			viewIconEditar.innerHTML = " ✎";
			viewIconEditar.setAttribute("usuarioid", key);
			viewIconEditar.addEventListener("click", editar)

			// ICONE DELETAR
			let viewIconDeletar = document.createElement("span");
			viewIconDeletar.class = "delete-usuario";
			viewIconDeletar.innerHTML = " ☓";
			viewIconDeletar.setAttribute("usuarioid", key);
			viewIconDeletar.addEventListener("click", apagar)
			
			$li.innerHTML = value.Nome;
			$li.append(viewIconEditar);
			$li.append(viewIconDeletar);

			$li.setAttribute("usuario-key", key);
			$li.addEventListener("click", usuarioSelecionado);
			viewListaUsuario.append($li);

 		});


	})

}



function usuarioSelecionado(e) {


		var usuarioID = e.target.getAttribute("usuario-key");

		const usuarioRef = dbRef.child('usuarios/' + usuarioID);
		const viewUsuarioDetalhes = document.getElementById("usuario-detalhes");

		usuarioRef.on("value", snap => {

			viewUsuarioDetalhes.innerHTML = ""

			snap.forEach(childSnap => {
				var $p = document.createElement("p");
				$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
				viewUsuarioDetalhes.append($p);
			})

		});
	

}





//ADICIONAR 

const viewBtnAdicionar = document.getElementById("adicionar-usuario-btn");
viewBtnAdicionar.addEventListener("click", adicionar);



function adicionar() {

	const usuariosRef = dbRef.child('usuarios');

	const viewAdicionarUsuarioInput = document.getElementsByClassName("usuario-input");

 	// this object will hold the new usuario information
    let newUsuario = {};

    // loop through View to get the data for the model 
    for (let i = 0, len = viewAdicionarUsuarioInput.length; i < len; i++) {

        let key = viewAdicionarUsuarioInput[i].getAttribute('data-key');
        let value = viewAdicionarUsuarioInput[i].value;
        newUsuario[key] = value;
    }

	usuariosRef.push(newUsuario);

    
   console.log(myPro);
   


}


// --------------------------
// DELETE
// --------------------------
function apagar(e) {

		e.stopPropagation();

		var usuarioID = e.target.getAttribute("usuarioid");

		const usuarioRef = dbRef.child('usuarios/' + usuarioID);
		
		usuarioRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editar(e) {
	
	document.getElementById('editar-usuario-modulo').style.display = "block";

	//set usuario id to the hidden input field
	document.querySelector(".editar-usuarioid").value = e.target.getAttribute("usuarioid");

	const usuarioRef = dbRef.child('usuarios/' + e.target.getAttribute("usuarioid"));

	// set data to the usuario field
	const viewEditarUsuarioInput = document.querySelectorAll(".editar-usuario-input");


	usuarioRef.on("value", snap => {

		for(var i = 0, len = viewEditarUsuarioInput.length; i < len; i++) {

			var key = viewEditarUsuarioInput[i].getAttribute("data-key");
					viewEditarUsuarioInput[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#editar-usuario-btn");
	saveBtn.addEventListener("click", salvarUsuario)
}


function salvarUsuario(e) {
 
	const usuarioID = document.querySelector(".editar-usuarioid").value;
	const usuarioRef = dbRef.child('usuarios/' + usuarioID);

	var usuarioEditado = {};

	const viewEditarUsuarioInput = document.querySelectorAll(".editar-usuario-input");

	viewEditarUsuarioInput.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
  		usuarioEditado[textField.getAttribute("data-key")] = textField.value
	});



	usuarioRef.update(usuarioEditado);

	document.getElementById('editar-usuario-modulo').style.display = "none";


}



        








