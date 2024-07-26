import conn from "../config/conn.js"

const tableOnibus = /*sql*/`
CREATE TABLE IF NOT EXISTS Onibus (
    onibus_id varchar(60) PRIMARY KEY NOT NULL,
    linha_id  varchar(60) NOT NULL,
    motorista_id varchar(60) NOT NULL,
    placa VARCHAR(8) NOT NULL,
    modelo VARCHAR(60) NOT NULL,
    ano_fabricacao YEAR NOT NULL,
    capacidade VARCHAR(3) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (linha_id) REFERENCES linhas(linha_id),
    foreign key (motorista_id) references motoristas(motorista_id)
);
`

conn.query(tableOnibus, (err, result, field)=>{
    if(err){
        console.error("erro ao criar a tabela"+err.stack)
        return
    }
    console.log("Tabela [onibus] criada com sucesso!")
})

// {
//     "placa": "ABC-1234",
//     "modelo": "Mercedes-Benz O-500",
//     "ano_fabricacao": 2018,
//     "capacidade": 50,
//     "id_linha": 1,
//     "id_motorista": 1
// }