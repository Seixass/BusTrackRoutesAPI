import conn from "../config/conn.js"

const tableMotoristas = /*sql*/`
    CREATE TABLE IF NOT EXISTS motoristas(
        motorista_id varchar (60) not null,
        nome_motorista varchar (500) not null,
        data_nascimento date not null,
        numero_carteira_habilitacao varchar (10) not null
    );
`

conn.query(tableMotoristas, (err, result, field)=>{
    if(err){
        console.error("erro ao criar a tabela"+err.stack)
        return
    }
    console.log("Tabela [motoristas] criada com sucesso!")
})

// {
//     "nome": "Carlos Oliveira",
//     "data_nascimento": "1975-05-15",
//     "numero_carteira_habilitacao": "XYZ123456"
// }