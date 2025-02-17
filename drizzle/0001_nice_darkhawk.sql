CREATE TABLE `usuarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `users_table`;