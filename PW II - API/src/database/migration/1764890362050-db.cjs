/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1764890362050 {
    name = 'Db1764890362050'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url_photo_profile\` varchar(250) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Profile\` ADD CONSTRAINT \`FK_9e70fe39bace1b4fe0a96e57203\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Profile\` DROP FOREIGN KEY \`FK_9e70fe39bace1b4fe0a96e57203\``);
        await queryRunner.query(`DROP TABLE \`Autor\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
        await queryRunner.query(`DROP TABLE \`Editor\``);
        await queryRunner.query(`DROP TABLE \`Profile\``);
        await queryRunner.query(`DROP TABLE \`User\``);
    }
}
