import conn from "../config/conn.js"

const tableLinhas = /*sql*/`
    CREATE TABLE IF NOT EXISTS linhas(
        linha_id varchar (60) primary key not null,
        nome_linha varchar (500) not null,
        numero_linha int not null,
        itinerario varchar (500) not null
    );
`

conn.query(tableLinhas, (err, result, field)=>{
    if(err){
        console.error("erro ao criar a tabela"+err.stack)
        return
    }
    console.log("Tabela [linhas] criada com sucesso!")
})