import { EntitySchema } from "typeorm";

const category = new EntitySchema({
    name: "Category",
    tableName: "Category",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: false}
    }
});

export default category;