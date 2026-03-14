import { EntitySchema } from "typeorm";

const autor = new EntitySchema({
    name: "Autor",
    tableName: "Autor",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable: false},
        birthdate: {type: "datetime", nullable: false},
        nacionality: {type: "varchar", length: 50, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: false}
    }
});

export default autor;