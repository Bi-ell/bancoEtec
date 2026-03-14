import { EntitySchema } from "typeorm";

const profile = new EntitySchema({
    name: "Profile",
    tableName: "Profile",
    columns: {
        id: { primary: true, type: "int", generated: true },
        url_photo_profile: { type: "varchar", length: 250, nullable: false },
    },
    relations: {
        user: { type: "many-to-one", target: "User", nullable: false },
    },
});

export default profile;