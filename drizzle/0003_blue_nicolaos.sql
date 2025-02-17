CREATE TABLE `clientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fechaInicio` date NOT NULL,
	`genero` enum('M','F') NOT NULL,
	`tipo` enum('NORMAL','PERSONALIZADO') DEFAULT 'NORMAL',
	`empleado_id` int,
	CONSTRAINT `clientes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_empleado_id_usuarios_id_fk` FOREIGN KEY (`empleado_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `genero`;