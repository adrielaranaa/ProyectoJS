$(document).ready(function() {
        DatosdelCliente();
        $("#Comprar").click(function(){
                $("#Contenedor-LoginSesion").show();
        });     
        $(".CantUnid").mouseover(function(){
               $("#contador").text(Cont_Carrito());
        });
        $("form").submit(function(e){ 
                e.preventDefault();
                var User = { "Usuario":"", "Contraseña":""}; //JSON DEL CLIENTE.
                User["Usuario"]=$("#Nombre").val();
                User["Contraseña"]=$("#Contraseña").val();
                $.ajax('BasedeDatos.json', {
                        type:'post',
                        data: $('form').serialize()
                });
        });
                $("#ButtomCarrito").click(function(){ Carrito() });
                DatosServidor();
});

function Cont_Carrito(){
        var SumaTotal=0;
        for (var j=0;j<6;j++) SumaTotal = SumaTotal + parseInt($(".CantUnid")[j].value);
        return SumaTotal;
};

function Carrito(){
        console.log(2);
        $("#CarritoTotal").show();
        Usuario.PrecioTotal=0;
        for (var i=0;i<6;i++){
                if (($(".CantUnid")[i]).value>0){
                        $("#Articulo" + i).show();
                        $(".Unid_Carrito")[i].value=$(".CantUnid")[i].value;
                        $(".PrecioTotUnid")[i].innerHTML= ($(".Unid_Carrito")[i].value*parseInt($(".Precio")[i].innerHTML));
                        Usuario.PrecioTotal= Usuario.PrecioTotal + ($(".Unid_Carrito")[i].value*parseInt($(".Precio")[i].innerHTML));
                };
        };
        $("#PrecioTotal").html("Precio Total = " + Usuario.PrecioTotal);
};

function Cliente(){ //Funcion constructora del objeto CLIENTE.
        this.Nombre;
        this.Prod_Nombre=[];        
        this.Prod_Precio=[]; 
        this.Prod_Unidades=[];  
        this.PrecioTotal=0;  
        this.CantCuotas=0; 
        this.DeudaMensual = function (){
                return (this.PrecioTotal/this.CantCuotas+Comision(CantCuotas));
        };
};

function DatosdelCliente(){
  Usuario = new Cliente();
  Usuario.Prod_Nombre=$(".NombreProducto");
  Usuario.Prod_Precio=$(".Precio"); 
  Usuario.Prod_Unidades=$(".CantUnid");
}; 


function DatosServidor(){
        sessionStorage.PrecioTotal=Usuario.PrecioTotal;
        sessionStorage.Producto1=Usuario.Prod_Nombre[0].innerHTML;
        sessionStorage.Producto2=Usuario.Prod_Nombre[1].innerHTML;
        sessionStorage.Producto3=Usuario.Prod_Nombre[2].innerHTML;
        sessionStorage.Producto4=Usuario.Prod_Nombre[3].innerHTML;
        sessionStorage.Producto5=Usuario.Prod_Nombre[4].innerHTML;
        sessionStorage.Producto6=Usuario.Prod_Nombre[5].innerHTML;
};