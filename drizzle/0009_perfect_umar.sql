ALTER TABLE `clientes` ADD `fecha_inicio` date NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` ADD `fecha_nacimiento` date NOT NULL;--> statement-breakpoint
ALTER TABLE `clientes` DROP COLUMN `fechaInicio`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `fechaNacimiento`;